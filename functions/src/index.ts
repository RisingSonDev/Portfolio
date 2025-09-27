import { onCall } from "firebase-functions/v2/https";
import { defineString } from "firebase-functions/params";
import * as nodemailer from "nodemailer";

// ✅ Define SendGrid API key (store in Firebase secrets)
const sendgridKey = defineString("SENDGRID_KEY");

export const sendContactEmail = onCall(async (request) => {
  const { name, email, message } = request.data;

  if (!name || !email || !message) {
    throw new Error("Missing required fields");
  }

  // ✅ SendGrid SMTP transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: "apikey",                // this literal string never changes
      pass: sendgridKey.value()      // your real SendGrid API key
    }
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: "risingsondev@gmail.com", // ✅ your inbox
    subject: `New Portfolio Contact from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Message:
      ${message}
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent via SendGrid:", info);
    return { success: true };
  } catch (error) {
    console.error("🔥 SendGrid Nodemailer error:", error);
    throw new Error("Unable to send email");
  }
});
