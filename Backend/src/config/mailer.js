const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

async function sendEmail(data) {
  try {
    await transporter.sendMail({
      from: `"IDS Alert" <${process.env.EMAIL}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: "🚨 Intrusion Detected!",
      text: JSON.stringify(data, null, 2),
    });

    console.log("📧 Email sent");
  } catch (err) {
    console.error("Email error:", err.message);
  }
}

module.exports = { sendEmail };