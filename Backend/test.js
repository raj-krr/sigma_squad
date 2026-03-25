const axios = require("axios");

setInterval(async () => {
  try {
    const res = await axios.post("https://sigma-squad.onrender.com/api/data", {
      feature1: Math.random(),
      feature2: Math.random(),
    });

    console.log("Response:", res.data);
  } catch (err) {
    console.log(err.message);
  }
}, 1500);