import {onCall} from "firebase-functions/v2/https";
import {defineString} from "firebase-functions/params";
import * as nodemailer from "nodemailer";

// ✅ Define secure parameters (you'll set these in Firebase CLI)
const gmailUser = defineString("GMAIL_USER");
const gmailPass = defineString("GMAIL_PASS");

// ✅ Configure Nodemailer transporter with Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailUser.value(),
    pass: gmailPass.value(),
  },
});

// ✅ Cloud Function (called from Angular contact form)
export const sendContactEmail = onCall(async (request) => {
  const {name, email, message} = request.data;

  if (!name || !email || !message) {
    throw new Error("Missing required fields");
  }

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: gmailUser.value(), // your inbox
    subject: `New Portfolio Contact from ${name}`,
    text: `
      You received a new message from your portfolio contact form.

      Name: ${name}
      Email: ${email}
      Message:
      ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {success: true};
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Unable to send email");
  }
});
