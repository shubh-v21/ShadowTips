// NextAuth ka default module import kar rahe hain taaki usko modify kar sakein
import "next-auth";
import { DefaultSession } from "next-auth";

// 🔽 NextAuth ke User, Session, aur JWT interfaces ko customize kar rahe hain
declare module "next-auth" {
  // 🎯 Custom `User` interface jo sirf ye fields rakhega (default fields `name`, `email`, `image` ko hata diya)
  interface User {
    _id?: string; // MongoDB Object ID (optional)
    isVerified?: boolean; // Kya user verified hai ya nahi
    isAcceptingMessages?: boolean; // Kya user messages accept kar raha hai
    username?: string; // User ka unique username
  }

  // 🎯 Custom `Session` interface jo `user` object ko modify karega
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      username?: string;
    } & DefaultSession["user"]; // ❗ Yeh line NextAuth ke default fields (`name`, `email`, `image`) ko rakhti hai
  }
}

// 🔽 JWT tokens ke liye bhi custom fields define kar rahe hain
declare module "next-auth/jwt" {
  interface JWT {
    _id?: string; // JWT me MongoDB Object ID store karne ke liye
    isVerified?: boolean; // JWT token me verification status store karne ke liye
    isAcceptingMessages?: boolean; // JWT token me messaging preference store karne ke liye
    username?: string; // JWT me username store karne ke liye
  }
}
