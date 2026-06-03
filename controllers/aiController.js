const Transaction =
  require(
    "../models/Transaction"
  );


// =========================================
// AI INSIGHTS
// =========================================

const getAIInsights =
  async (req, res) => {

    try {

      const fraudCount =
        await Transaction.countDocuments({

          userId: req.user._id,

          status: "fraud"

        });


      const totalCount =
        await Transaction.countDocuments({

          userId: req.user._id

        });


      let insight =
        "System looks stable.";


      if (fraudCount >= 5) {

        insight =
          "High fraud activity detected.";

      }

      if (fraudCount >= 10) {

        insight =
          "Critical suspicious activity detected.";

      }


      if (
        totalCount >= 20 &&
        fraudCount >= 8
      ) {

        insight =
          "Rapid suspicious transactions observed.";

      }


      res.status(200).json({

        insight,

        fraudCount,

        totalCount

      });

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};


// =========================================
// AI CHAT ASSISTANT
// =========================================

const askAI =
  async (req, res) => {

    try {
      console.log(req.body);
      const {
        question
      } = req.body;


      if (!question) {

        return res.status(400).json({

          message:
            "Question is required"

        });

      }


      let answer =
        "I could not understand your question.";


      const lowerQuestion =
        question.toLowerCase();


      if (
        lowerQuestion.includes("fraud")
      ) {

        answer =
          "Fraud transactions are detected using risk score, suspicious location, failed attempts and rapid activity patterns.";

      }

      else if (
        lowerQuestion.includes("risk")
      ) {

        answer =
          "Risk score is calculated using ML prediction and custom fraud engine analysis.";

      }

      else if (
        lowerQuestion.includes("safe")
      ) {

        answer =
          "Always verify transaction location, amount and device before approving payments.";

      }

      else if (
        lowerQuestion.includes("transaction")
      ) {

        answer =
          "Transactions are monitored in real-time using socket events and fraud analytics.";

      }


      res.status(200).json({

        success: true,

        answer

      });

    }

    catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message

      });

    }

};


// =========================================
// EXPORTS
// =========================================

module.exports = {

  getAIInsights,

  askAI

};