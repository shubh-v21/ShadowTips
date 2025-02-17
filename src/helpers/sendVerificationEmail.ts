// Import the "resend" instance from the custom resend configuration file
import { resend } from "@/lib/resend";

// Import the VerificationEmail component, which is used to send a styled email
import VerificationEmail from "../../emails/VerificationEmail";

// Import the ApiResponse type to define the return type of the function
import { ApiResponse } from "@/types/ApiResponse";

/**
 * Sends a verification email to the user using Resend API.
 *
 *  email - The recipient's email address.
 *  username - The username of the recipient.
 *  verifyCode - The verification code to be included in the email.
 * returns A promise that resolves to an ApiResponse object indicating success or failure.
 */
export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // Send an email using the Resend API
    await resend.emails.send({
      from: "onboarding@resend.dev", // Sender email address
      to: email, // Recipient's email address
      subject: "True Feedback | Verification Code", // Email subject
      react: VerificationEmail({ username, otp: verifyCode }), // Renders a React-based email template
    });

    // Return a success response if the email is sent successfully
    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (emailError) {
    // Log the error if email sending fails
    console.error("Error sending verification email", emailError);

    // Return a failure response if email sending fails
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
