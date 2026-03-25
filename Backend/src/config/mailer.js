import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data) {
    try {
      console.log(process.env.RESEND_API_KEY);
    await resend.emails.send({
       from: "onboarding@resend.dev",
        
      to: [process.env.RECEIVER_EMAIL],
      subject: `🚨 ${data.attackType || "Intrusion Detected"}`,
      html: `
        <h2 style="color:red;">🚨 Intrusion Detected</h2>
        <p><b>Status:</b> ${data.anomaly ? "Anomaly" : "Normal"}</p>
        <p><b>Attack:</b> ${data.attackType || "Unknown"}</p>
        <p><b>Time:</b> ${new Date().toLocaleString()}</p>
      `,
    });

    console.log("📧 Email sent (Resend)");
  } catch (err) {
    console.error("Email error:", err.message);
  }
}