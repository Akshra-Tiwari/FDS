const mongoose = require("mongoose");

const transactionSchema =
  new mongoose.Schema({

    userId: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    amount: {
      type: Number,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    coordinates: {

      lat: Number,

      lng: Number

    },

    type: {
      type: String,
      required: true
    },

    device: {
      type: String,
      default: "normal"
    },

    failedAttempts: {
      type: Number,
      default: 0
    },

    riskScore: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: [
        "normal",
        "fraud"
      ],
      default: "normal"
    },

    severity: {
      type: String,
      enum: [
        "LOW",
        "MEDIUM",
        "HIGH"
      ],
      default: "LOW"
    },

    fraudReason: {
      type: String,
      default:
        "Normal transaction"
    },

    createdAt: {
      type: Date,
      default: Date.now
    }

  });

module.exports =
  mongoose.model(
    "Transaction",
    transactionSchema
  );