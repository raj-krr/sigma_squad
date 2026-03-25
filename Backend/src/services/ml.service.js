const axios = require("axios");
const { getIO } = require("../socket/socket");
const { sendEmail } = require("../config/mailer");

let lastEmailTime = 0;

async function analyzeData(req, res) {
  try {
    let result;

    const rand = Math.random();

    if (rand < 0.8) {
      result = {
        anomaly: false,
        attackType: "BENIGN",
        timestamp: new Date(),
      };
    } else {
      console.log("🔥 NEW LOGIC RUNNING");

      const attacks = ["DDoS", "PortScan", "BruteForce"];

      result = {
        anomaly: true,
        attackType: attacks[Math.floor(Math.random() * attacks.length)],
        timestamp: new Date(),
      };
    }

    console.log("Result:", result);

    const io = getIO();

    // 🔥 SEND ALL TRAFFIC
    io.emit("traffic", result);

    // 🚨 HANDLE ATTACKS ONLY
    if (result.anomaly) {
      io.emit("alert", result);

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