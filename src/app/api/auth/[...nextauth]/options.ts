import { NextAuthOptions } from "next-auth"; // NextAuth ka main configuration type import kar rahe hain
import CredentialsProvider from "next-auth/providers/credentials"; // Email-password based authentication provider
import bcrypt from "bcryptjs"; // Password hashing aur comparison ke liye
import dbConnect from "@/lib/dbConnect"; // Database connection establish karne ke liye function
import UserModel from "@/model/User"; // User schema ka model jo database me stored users ko represent karta hai

// NextAuth ka configuration object export kar rahe hain
export const authOptions: NextAuthOptions = {
  // 🔹 1. Authentication Providers Define Karna
  providers: [
    CredentialsProvider({
      id: "credentials", // Unique ID for the credentials provider
      name: "Credentials", // Provider ka naam (UI me dikhne ke liye, agar NextAuth ka UI use karein)

      // 👇 Credentials object define kar raha hai ki kaunse fields required hain login ke liye
      credentials: {
        email: { label: "Email", type: "text" }, // Email field (Text input hoga)
        password: { label: "Password", type: "password" }, // Password field (Password input hoga)
      },

      // 🔹 2. authorize() Function (Login Process Handle Karna)
      async authorize(credentials: any): Promise<any> {
        await dbConnect(); // MongoDB se connection establish karna

        try {
          // 🟢 Database me user dhoondhna (email ya username se)
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier }, // Agar user email se login kar raha ho
              { username: credentials.identifier }, // Ya phir username se login kar raha ho
            ],
          });

          // ❌ Agar user database me nahi mila, toh error throw karo
          if (!user) {
            throw new Error("User not found with this email");
          }

          // ❌ Agar user ka email verified nahi hai, toh login allow mat karo
          if (!user.isVerified) {
            throw new Error("Please verify your account before login");
          }

          // 🔐 Database me stored password ko compare karo entered password se
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password, // Jo user ne enter kiya hai
            user.password // Jo database me stored hai (hashed)
          );

          // ❌ Agar password match nahi karta, toh error return karo
          if (!isPasswordCorrect) {
            throw new Error("Incorrect password");
          }

          // ✅ Agar sab kuch sahi hai, toh user object return karo
          return user;
        } catch (err: any) {
          throw new Error(err); // ❌ Error ko handle karo aur return karo
        }
      },
    }),
  ],

  // 🔹 3. JWT Callbacks (User Data Token me Store Karna)
  callbacks: {
    // 🏷️ JWT Token modify karna authentication ke time par
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); // MongoDB _id ko token me add karna
        token.isVerified = user.isVerified; // User verification status store karna
        token.isAcceptingMessages = user.isAcceptingMessages; // Messaging preference store karna
        token.username = user.username; // Username store karna
      }

      return token; // Modified token return karo
    },

    // 🔹 4. Session Callback (Session Object Modify Karna)
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id; // User _id ko session object me add karna
        session.user.isVerified = token.isVerified; // Verification status store karna
        session.user.isAcceptingMessages = token.isAcceptingMessages; // Messaging preference store karna
        session.user.username = token.username; // Username store karna
      }

      return session; // Modified session return karo
    },
  },

  // 🔹 5. Custom Sign-in Page Define Karna
  pages: {
    signIn: "/sign-in", // Agar user login karega toh ise `/sign-in` page par redirect kiya jayega
  },

  // 🔹 6. Session Strategy (JWT Based Session)
  session: {
    strategy: "jwt", // JWT-based authentication use ho rahi hai (database session store nahi karega)
  },

  // 🔹 7. Secret Key for NextAuth (JWT Encryption)
  secret: process.env.NEXTAUTH_SECRET, // Environment variable se secret key le raha hai (JWT signing ke liye)
};
