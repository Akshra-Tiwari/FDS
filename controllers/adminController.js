const User =
  require("../models/User");

const Transaction =
  require("../models/Transaction");


// GET ALL USERS
const getAllUsers =
  async (req, res) => {

    try {

      const users =
        await User.find()
        .select("-password");

      res.status(200).json(
        users
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};


// FREEZE ACCOUNT
const freezeUser =
  async (req, res) => {

    try {

      const user =
        await User.findByIdAndUpdate(

          req.params.id,

          {
            isFrozen: true
          },

          {
            new: true
          }

        );

      res.status(200).json({

        message:
          "User frozen",

        user

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};


// ADMIN ANALYTICS
const getAdminAnalytics =
  async (req, res) => {

    try {

      const totalUsers =
        await User.countDocuments();

      const totalTransactions =
        await Transaction.countDocuments();

      const fraudTransactions =
        await Transaction.countDocuments({

          status: "fraud"

        });

      res.status(200).json({

        totalUsers,

        totalTransactions,

        fraudTransactions

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};

module.exports = {

  getAllUsers,

  freezeUser,

  getAdminAnalytics

};