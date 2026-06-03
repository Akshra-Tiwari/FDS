const express =
  require("express");

const router =
  express.Router();

const User =
  require("../models/User");

const authMiddleware =
  require("../middleware/authMiddleware");

const adminMiddleware =
  require("../middleware/adminMiddleware");


// GET ALL USERS
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,

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

  }
);


// FREEZE USER
router.put(
  "/freeze/:id",
  authMiddleware,
  adminMiddleware,

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
          "Account frozen",

        user

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  }
);

module.exports =
  router;