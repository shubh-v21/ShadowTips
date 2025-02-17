// Importing the Message type from the User model
import { Message } from "@/model/User";

/**
 * ApiResponse interface defines the structure of responses returned from API functions.
 */
export interface ApiResponse {
  success: boolean; // Indicates whether the API request was successful (true) or failed (false)
  message: string; // Contains a success or error message describing the API response
  isAcceptingMessages?: boolean; // (Optional) Tells whether the user is accepting messages
  messages?: Array<Message>; // (Optional) Contains an array of messages if applicable
}
