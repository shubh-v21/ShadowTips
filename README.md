# TrueFeedback – Anonymous Feedback & AI-Powered Message Suggestions

## 🚀 Overview
TrueFeedback is a **Next.js-based** platform that enables users to receive anonymous messages via a unique link. AI-generated suggested messages enhance user engagement, and authentication is secured using **NextAuth.js**. OTP-based email verification ensures account security via **RESEND API**.

## 🔥 Features
- **Anonymous Messaging** – Users receive anonymous feedback via a personal link.
- **AI-Powered Suggestions** – Gemini AI generates smart message recommendations.
- **OTP Email Verification** – RESEND API handles email verification securely.
- **Authentication** – NextAuth.js provides OAuth-based authentication.
- **Form Validation** – Zod ensures secure and structured data input.
- **Real-Time Updates** – WebSockets enable instant feedback updates.
- **Tech Stack** – Built using **Next.js, Tailwind CSS, MongoDB, Express.js, and Node.js**.

## 🛠️ Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/TrueFeedback.git
   cd TrueFeedback
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env.local`):
   ```env
   NEXTAUTH_SECRET=your_secret_key
   NEXTAUTH_URL=http://localhost:3000
   RESEND_API_KEY=your_resend_api_key
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```

## 🎯 Usage
1. **Sign up & verify email** – Receive an OTP via RESEND API.
2. **Share unique link** – Let others send anonymous messages.
3. **View AI suggestions** – Get Gemini AI-generated responses.
4. **Reply & engage** – Manage messages securely in the dashboard.

## 📌 Contributing
Feel free to fork the repository and submit a pull request. Contributions are welcome! 🚀

## 📜 License
This project is licensed under the **MIT License**.

---

🔗 **Live Demo:** [https://true-feedback-msg.vercel.app/]  
📧 **Contact:** [shubhverma2003@gmail.com]
