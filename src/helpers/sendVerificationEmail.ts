import sendEmail from "@/lib/nodemailerUtility";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { render } from "@react-email/render";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const subject = "Verify your email";
    const emailHtml = await render(VerificationEmail({ username, otp: verifyCode }));

    await sendEmail(email, subject, emailHtml);

    return {
      success: true,
      message: "OTP sent successfully",
    };
  } catch (error) {
    console.error("Error sending OTP:", error);

    return {
      success: false,
      message: "Failed to send OTP",
    };
  }
}

export default sendVerificationEmail;
