import nodemailer from 'nodemailer';

const sendEmail = async (
  email: string,
  subject: string,
  message: string,
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: process.env.SMTP_EMAIL as string, // Your email
      pass: process.env.SMTP_PASSWORD as string, // App password
    },
  });

  const mailOptions = {
    from: `"ShadowTips" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: subject,
    text: message, // Plain text version
    html: message, // HTML version
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
