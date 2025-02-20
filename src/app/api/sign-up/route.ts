import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

// Next.js ke default "Request" object ko import kiya jata hai (Web API ka part hai)
export async function POST(request: Request) {
  // MongoDB ke saath connection establish karne ke liye function call kar rahe hain
  await dbConnect();

  try {
    // Request body se JSON data extract kar rahe hain
    const { username, email, password } = await request.json();

    // Pehle check kar rahe hain ki koi **verified** user same username se toh nahi hai
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true, // Sirf wo users jo pehle se verified hain
    });

    // Agar username already kisi verified user ke paas hai toh error return kar do
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username already exists.",
        },
        {
          status: 400, // Bad Request
        }
      );
    }

    // Ab check kar rahe hain ki email pehle se database me hai ya nahi
    const existingUserByEmail = await UserModel.findOne({ email });

    // Random 6-digit verification code generate kar rahe hain
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      // Agar user email verified hai toh direct error return karo
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "Email already exists",
          },
          {
            status: 400, // Bad Request
          }
        );
      } else {
        // Agar user verified nahi hai toh naye password aur verifyCode ke saath update karo
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour expiry
        await existingUserByEmail.save();
      }
    } else {
      // Agar user email pehli baar register kar raha hai toh naya user create karna hoga
      const hashedPassword = await bcrypt.hash(password, 10);

      // Verify code expiry time set karna (1 hour ke baad expire hoga)
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      // MongoDB schema ke according ek naya user object bana rahe hain
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false, // Default false rakha kyunki email verify nahi hui hai
        isAcceptingMessages: true, // Messages allow kar raha hai
        messages: [], // Empty array for messages
      });

      // User ko MongoDB me save kar rahe hain
      await newUser.save();
    }

    // ✅ Verification email bhejna
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    // Agar email bhejne me koi problem aayi toh error return karo
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        {
          status: 500, // Internal Server Error
        }
      );
    }

    // ✅ Success response bhejna agar sab kuch sahi chala
    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your email.",
      },
      {
        status: 201, // 201 Created
      }
    );
  } catch (error) {
    // 🛑 Agar koi unexpected error aata hai toh usko catch kar rahe hain
    console.error("Error registering user:", error);

    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500, // Internal Server Error
      }
    );
  }
}
