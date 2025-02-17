// Import the Resend class from the "resend" package
import { Resend } from "resend";

// Create an instance of Resend with the API key from environment variables
// This API key is stored in the .env file for security reasons
export const resend = new Resend(process.env.RESEND_API_KEY);
