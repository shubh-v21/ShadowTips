import mongoose, { Schema, Document } from "mongoose";

// Define Message interface, which extends Mongoose's Document
export interface Message extends Document {
  content: string; // Message text
  createdAt: Date; // Timestamp of when the message was created
}

// Define Message schema with content and createdAt fields
const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true, // Message content is required
  },
  createdAt: {
    type: Date,
    required: true, // Timestamp is required
    default: Date.now, // Automatically set to current date-time
  },
});

// Define User interface, which extends Mongoose's Document
export interface User extends Document {
  username: string; // User's name
  email: string; // User's email
  password: string; // User's password (hashed)
  verifyCode: string; // Code sent for email verification
  verifyCodeExpiry: Date; // Expiration time of verification code
  isVerified: boolean; // Whether the user is verified or not
  isAcceptingMessages: boolean; // Whether the user accepts messages or not
  messages: Message[]; // Array of messages associated with the user
}

// Define User schema with validation rules
const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"], // Validation error message
    trim: true, // Remove leading and trailing spaces
    unique: true, // Ensure unique usernames
  },
  email: {
    type: String,
    required: [true, "Email is required"], // Email is mandatory
    unique: true, // No duplicate emails allowed
    match: [/.+\@.+\..+/, "Please use a valid email address"], // Regex validation for email format
  },
  password: {
    type: String,
    required: [true, "Password is required"], // Password is mandatory
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code is required"], // Email verification code is required
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify code expiry is required"], // Expiration time is required
  },
  isVerified: {
    type: Boolean,
    default: false, // By default, a new user is not verified
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true, // User accepts messages by default
  },
  messages: [MessageSchema], // Embedding MessageSchema as an array
});

// Create the User model OR use the existing one if already defined
const UserModel =
  (mongoose.models.User as mongoose.Model<User>) || // If already defined, use it
  mongoose.model<User>("User", UserSchema); // Otherwise, create a new model

export default UserModel; // Export the model for use in other files
