const express = require("express");
const router = express.Router();

const { analyzeData } = require("../services/ml.service");

router.post("/", analyzeData);

module.exports = router;