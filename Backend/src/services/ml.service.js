const axios = require("axios");
const { getIO } = require("../socket/socket");
const { sendEmail } = require("../config/mailer");

async function analyzeData(req, res) {
  try {
    let result;

    // 🔥 OPTION 1: REAL ML (uncomment when ready)
    /*
    const response = await axios.post(
      "http://localhost:8000/predict",
      req.body
    );
    result = response.data;
    */

    // 🔥 OPTION 2: FAKE ML (for demo)
    result = {
      anomaly: Math.random() > 0.7,
      attackType: ["DDoS", "PortScan", "BruteForce"][
        Math.floor(Math.random() * 3)
      ],
      timestamp: new Date(),
    };

    console.log("Result:", result);

    if (result.anomaly) {
      const io = getIO();

      // 🔥 Send real-time alert
      io.emit("alert", result);

      // 📧 Send email
      await sendEmail(result);
    }

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "ML Service Failed" });
  }
}

module.exports = { analyzeData };