import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";

// Configure the transporter using Firebase environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().gmail.user, // set with firebase functions:config:set
    pass: functions.config().gmail.pass
  }
});

/**
 * Callable function to send an email from the portfolio contact form
 * Triggered by Angular frontend using httpsCallable
 */
export const sendContactEmail = functions.https.onCall(async (request, context) => {
  const { name, email, message } = request.data;

  if (!name || !email || !message) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing required fields"
    );
  }

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: functions.config().gmail.user, // your own inbox
    subject: `New Portfolio Contact: ${name}`,
    text: `
      You received a new message from your portfolio contact form.

      Name: ${name}
      Email: ${email}
      Message:
      ${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Unable to send email",
      error
    );
  }
});
