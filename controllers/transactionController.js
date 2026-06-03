const Transaction =
  require("../models/Transaction");

const axios =
  require("axios");

const sendFraudAlert =
  require("../services/emailService");

const {
  io
} = require("../server");

const calculateRiskScore =
  require("../utils/fraudEngine");

const asyncHandler =
  require("../middleware/asyncHandler");


// =========================================
// CITY COORDINATES
// =========================================

const cityCoordinates = {

  Delhi: {
    lat: 28.6139,
    lng: 77.2090
  },

  Mumbai: {
    lat: 19.0760,
    lng: 72.8777
  },

  Bangalore: {
    lat: 12.9716,
    lng: 77.5946
  },

  Bhopal: {
    lat: 23.2599,
    lng: 77.4126
  },

  Chennai: {
    lat: 13.0827,
    lng: 80.2707
  }

};


// =========================================
// HELPER FUNCTION
// =========================================

const getCoordinates =
  (location) => {

    return (
      cityCoordinates[
        location
      ] || {
        lat: 0,
        lng: 0
      }
    );

  };


// =========================================
// ML RISK ENGINE
// =========================================

const getMLRiskScore =
  async ({
    amount,
    location,
    failedAttempts
  }) => {

    try {

      const indianCities = [

        "Delhi",

        "Mumbai",

        "Bangalore",

        "Bhopal",

        "Chennai"

      ];

      const mlResponse =
        await axios.post(

          "http://127.0.0.1:5001/predict",

          {

            amount,

            failedAttempts,

            isForeignTransaction:

              indianCities.includes(
                location
              )
                ? 0
                : 1,

            isHighRiskCountry:

              location === "Unknown"
                ? 1
                : 0,

            isWeekend:

              [0, 6].includes(
                new Date().getDay()
              )
                ? 1
                : 0

          }

        );

      return Math.round(

        mlResponse.data
          .fraudProbability * 100

      );

    }

    catch (err) {

      console.log(
        "ML SERVER FAILED"
      );

      return null;

    }

  };


// =========================================
// CREATE TRANSACTION
// =========================================

const createTransaction =
  asyncHandler(
    async (req, res) => {

      const {

        amount,

        location,

        type,

        device,

        failedAttempts

      } = req.body;


      // VALIDATION
      if (
        !amount ||
        !location ||
        !type
      ) {

        res.status(400);

        throw new Error(
          "Amount, location and type are required"
        );

      }


      // RECENT TRANSACTIONS
      const recentTransactions =
        await Transaction.find({

          userId:
            req.user._id,

          createdAt: {

            $gte:
              new Date(
                Date.now() -
                60 * 1000
              )

          }

        });


      // =========================================
      // ML RISK SCORE
      // =========================================

      let riskScore =
        await getMLRiskScore({

          amount,

          location,

          failedAttempts

        });


      // FALLBACK ENGINE
      if (
        riskScore === null
      ) {

        riskScore =
          await calculateRiskScore(

            {

              amount,

              location,

              type,

              device,

              failedAttempts

            },

            recentTransactions.length

          );

      }


      // =========================================
      // FRAUD REASONS
      // =========================================

      let fraudReasons = [];


      if (amount > 50000) {

        fraudReasons.push(
          "High amount transaction"
        );

      }

      if (
        location === "Unknown"
      ) {

        fraudReasons.push(
          "Suspicious location"
        );

      }

      if (
        recentTransactions.length >= 3
      ) {

        fraudReasons.push(
          "Rapid multiple transactions"
        );

      }

      if (
        failedAttempts > 3
      ) {

        fraudReasons.push(
          "Multiple failed attempts"
        );

      }

      if (
        device === "suspicious"
      ) {

        fraudReasons.push(
          "Suspicious device"
        );

      }


      // =========================================
      // IMPOSSIBLE TRAVEL
      // =========================================

      const lastTransaction =
        await Transaction.findOne({

          userId:
            req.user._id

        }).sort({
          createdAt: -1
        });


      if (

        lastTransaction &&

        lastTransaction.location !==
          location

      ) {

        const timeDifference =

          (
            new Date() -

            new Date(
              lastTransaction.createdAt
            )

          ) / (1000 * 60);


        if (
          timeDifference < 30
        ) {

          fraudReasons.push(
            "Impossible travel detected"
          );

        }

      }


      // =========================================
      // FINAL FRAUD REASON
      // =========================================

      const fraudReason =

        fraudReasons.length > 0

          ? fraudReasons.join(", ")

          : "Normal transaction";


      // =========================================
      // STATUS + SEVERITY
      // =========================================

      let status =
        "normal";

      let severity =
        "LOW";


      if (
        riskScore >= 70
      ) {

        status =
          "fraud";

        severity =
          "HIGH";

      }

      else if (
        riskScore >= 40
      ) {

        severity =
          "MEDIUM";

      }


      // =========================================
      // COORDINATES
      // =========================================

      const coordinates =
        getCoordinates(
          location
        );


      // =========================================
      // CREATE TRANSACTION
      // =========================================

      const transaction =
        await Transaction.create({

          userId:
            req.user._id,

          amount,

          location,

          coordinates,

          type,

          device,

          failedAttempts,

          status,

          riskScore,

          severity,

          fraudReason

        });


      // =========================================
      // SOCKET EVENT
      // =========================================

      io.emit(
        "newTransaction",
        transaction
      );


      // =========================================
      // EMAIL ALERT
      // =========================================

      if (
        status === "fraud"
      ) {

        await sendFraudAlert(

          req.user.email,

          transaction

        );

      }


      // =========================================
      // RESPONSE
      // =========================================

      res.status(201).json({

        success: true,

        message:
          "Transaction created successfully",

        transaction

      });

    }
  );


// =========================================
// GET FRAUD LOCATIONS
// =========================================

const getFraudLocations =
  asyncHandler(
    async (req, res) => {

      const frauds =
        await Transaction.find({

          userId:
            req.user._id,

          status:
            "fraud"

        })

        .select(
          "location coordinates amount riskScore severity createdAt"
        )

        .sort({
          createdAt: -1
        });


      res.status(200).json({

        success: true,

        count:
          frauds.length,

        frauds

      });

    }
  );


// =========================================
// GET ALL TRANSACTIONS
// =========================================

const getTransactions =
  asyncHandler(
    async (req, res) => {

      const page =
        parseInt(req.query.page) || 1;

      const limit =
        parseInt(req.query.limit) || 10;

      const skip =
        (page - 1) * limit;

      let query = {

        userId:
          req.user._id

      };


      if (
        req.query.status
      ) {

        query.status =
          req.query.status;

      }

      if (
        req.query.severity
      ) {

        query.severity =
          req.query.severity;

      }

      if (
        req.query.location
      ) {

        query.location = {

          $regex:
            req.query.location,

          $options:
            "i"

        };

      }


      let sortOption = {

        createdAt: -1

      };


      switch (
        req.query.sort
      ) {

        case "oldest":

          sortOption = {
            createdAt: 1
          };

          break;

        case "highRisk":

          sortOption = {
            riskScore: -1
          };

          break;

        case "lowRisk":

          sortOption = {
            riskScore: 1
          };

          break;

        case "highAmount":

          sortOption = {
            amount: -1
          };

          break;

      }


      const total =
        await Transaction.countDocuments(
          query
        );

      const transactions =
        await Transaction.find(
          query
        )

        .sort(sortOption)

        .skip(skip)

        .limit(limit);


      res.status(200).json({

        success: true,

        currentPage:
          page,

        totalPages:
          Math.ceil(
            total / limit
          ),

        totalTransactions:
          total,

        count:
          transactions.length,

        transactions

      });

    }
  );


// =========================================
// GET FRAUD STATS
// =========================================

const getFraudStats =
  asyncHandler(
    async (req, res) => {

      const totalTransactions =
        await Transaction.countDocuments({

          userId:
            req.user._id

        });

      const fraudTransactions =
        await Transaction.countDocuments({

          userId:
            req.user._id,

          status:
            "fraud"

        });

      const normalTransactions =
        await Transaction.countDocuments({

          userId:
            req.user._id,

          status:
            "normal"

        });

      const highSeverity =
        await Transaction.countDocuments({

          userId:
            req.user._id,

          severity:
            "HIGH"

        });

      const mediumSeverity =
        await Transaction.countDocuments({

          userId:
            req.user._id,

          severity:
            "MEDIUM"

        });

      const lowSeverity =
        await Transaction.countDocuments({

          userId:
            req.user._id,

          severity:
            "LOW"

        });


      res.status(200).json({

        success: true,

        totalTransactions,

        fraudTransactions,

        normalTransactions,

        highSeverity,

        mediumSeverity,

        lowSeverity

      });

    }
  );


// =========================================
// RECENT FRAUDS
// =========================================

const getRecentFrauds =
  asyncHandler(
    async (req, res) => {

      const frauds =
        await Transaction.find({

          userId:
            req.user._id,

          status:
            "fraud"

        })

        .sort({
          createdAt: -1
        })

        .limit(5);


      res.status(200).json({

        success: true,

        count:
          frauds.length,

        frauds

      });

    }
  );


// =========================================
// GET SINGLE TRANSACTION
// =========================================

const getTransactionById =
  asyncHandler(
    async (req, res) => {

      const transaction =
        await Transaction.findOne({

          _id:
            req.params.id,

          userId:
            req.user._id

        });

      if (!transaction) {

        res.status(404);

        throw new Error(
          "Transaction not found"
        );

      }

      res.status(200).json({

        success: true,

        transaction

      });

    }
  );


// =========================================
// DELETE
// =========================================

const deleteTransaction =
  asyncHandler(
    async (req, res) => {

      const transaction =
        await Transaction.findOne({

          _id:
            req.params.id,

          userId:
            req.user._id

        });

      if (!transaction) {

        res.status(404);

        throw new Error(
          "Transaction not found"
        );

      }

      await transaction.deleteOne();

      res.status(200).json({

        success: true,

        message:
          "Transaction deleted successfully"

      });

    }
  );


// =========================================
// ADMIN
// =========================================

const getAllTransactionsAdmin =
  asyncHandler(
    async (req, res) => {

      const transactions =
        await Transaction.find()

        .populate(
          "userId",
          "name email"
        )

        .sort({
          createdAt: -1
        });

      res.status(200).json({

        success: true,

        count:
          transactions.length,

        transactions

      });

    }
  );


// =========================================
// EXPORTS
// =========================================

module.exports = {

  createTransaction,

  getTransactions,

  getFraudStats,

  getRecentFrauds,

  getTransactionById,

  deleteTransaction,

  getAllTransactionsAdmin,

  getFraudLocations

}; 