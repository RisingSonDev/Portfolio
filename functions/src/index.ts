import { onCall } from "firebase-functions/v2/https";
import { defineString } from "firebase-functions/params";
import * as nodemailer from "nodemailer";

// ✅ Define secure parameters (do not call .value() here)
const gmailUser = defineString("GMAIL_USER");
const gmailPass = defineString("GMAIL_PASS");

// ✅ Callable Cloud Function
export const sendContactEmail = onCall(async (request) => {
  const { name, email, message } = request.data;

  if (!name || !email || !message) {
    throw new Error("Missing required fields");
  }

  // ✅ Create transporter at runtime (no warning now)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser.value(),
      pass: gmailPass.value()
    }
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: gmailUser.value(), // send to your inbox
    subject: `New Portfolio Contact from ${name}`,
    text: `
      You received a new message from your portfolio contact form.

      Name: ${name}
      Email: ${email}
      Message:
      ${message}
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info);
    return { success: true };
  } catch (error) {
    console.error("🔥 Nodemailer error:", error);
    throw new Error("Unable to send email");
  }
});
