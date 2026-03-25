const axios = require("axios");
const { getIO } = require("../socket/socket");
const { sendEmail } = require("../config/mailer");

// 🔥 email throttle (avoid spam)
let lastEmailTime = 0;

async function analyzeData(req, res) {
  try {
    let result;

    // ===============================
    // 🤖 OPTION 1: REAL ML (UNCOMMENT LATER)
    // ===============================
    /*
    const response = await axios.post(
      "https://your-ml-api.onrender.com/predict",
      req.body
    );
    result = response.data;
    result.timestamp = new Date();
    */

    // ===============================
    // 🔥 OPTION 2: REALISTIC DEMO MODE
    // ===============================

    const rand = Math.random();

    if (rand < 0.8) {
      // 🟢 80% NORMAL TRAFFIC
      result = {
        anomaly: false,
        attackType: "BENIGN",
        timestamp: new Date(),
      };
    } else {
      // 🔴 20% ATTACK TRAFFIC

      // 💀 occasional burst attack
      const burst = Math.random() < 0.4;

      const attacks = burst
        ? ["DDoS"] // heavy spike
        : ["PortScan", "BruteForce"];

      result = {
        anomaly: true,
        attackType: attacks[Math.floor(Math.random() * attacks.length)],
        timestamp: new Date(),
      };
    }

    console.log("Result:", result);

    // ===============================
    // 🚨 HANDLE ALERTS
    // ===============================
    if (result.anomaly) {
      const io = getIO();

      // 🔥 real-time alert
      io.emit("alert", result);

      // 📧 throttle email (1 every 10 sec)
      const now = Date.now();

      if (now - lastEmailTime > 10000) {
        await sendEmail(result);
        lastEmailTime = now;
      }
    }

    res.json(result);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "ML Service Failed" });
  }
}

module.exports = { analyzeData };