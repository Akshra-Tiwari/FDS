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


// FREEZE / UNFREEZE ACCOUNT
const setFrozenState =
  (frozen) =>
  async (req, res) => {

    try {

      const target =
        await User.findById(
          req.params.id
        );

      if (!target) {

        return res.status(404).json({
          message: "User not found"
        });

      }

      // Admins cannot freeze themselves or other admins
      if (
        frozen &&
        target.role === "admin"
      ) {

        return res.status(400).json({
          message:
            "Admin accounts cannot be frozen"
        });

      }

      target.isFrozen = frozen;

      await target.save();

      // never send the password hash back to the client
      const user =
        await User.findById(target._id)
          .select("-password");

      res.status(200).json({

        message:
          frozen
            ? "User frozen"
            : "User unfrozen",

        user

      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

};

const freezeUser =
  setFrozenState(true);

const unfreezeUser =
  setFrozenState(false);


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

  unfreezeUser,

  getAdminAnalytics

};