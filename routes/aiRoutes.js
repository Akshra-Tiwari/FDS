const express =
  require("express");

const router =
  express.Router();

const {
  askAI,
  getAIInsights
} = require(
  "../controllers/aiController"
);


// AI CHAT
router.post(
  "/ask",
  askAI
);


// AI INSIGHTS
router.get(
  "/insights",
  getAIInsights
);


module.exports =
  router;