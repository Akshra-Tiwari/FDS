const User =
  require("../models/User");

const bcrypt =
  require("bcryptjs");


// GET PROFILE
const getProfile =
  async (req, res) => {

    const user =
      await User.findById(
        req.user
      ).select("-password");

    res.json({

      success: true,

      user

    });

};


// UPDATE PROFILE
const updateProfile =
  async (req, res) => {

    const user =
      await User.findById(
        req.user
      );

    if (!user) {

      return res.status(404).json({

        message:
          "User not found"

      });

    }

    user.name =
      req.body.name ||
      user.name;

    user.email =
      req.body.email ||
      user.email;

    await user.save();

    res.json({

      success: true,

      user

    });

};


// CHANGE PASSWORD
const changePassword =
  async (req, res) => {

    const {
      oldPassword,
      newPassword
    } = req.body;

    const user =
      await User.findById(
        req.user
      );

    const isMatch =
      await bcrypt.compare(

        oldPassword,

        user.password

      );

    if (!isMatch) {

      return res.status(400).json({

        message:
          "Old password incorrect"

      });

    }

    const salt =
      await bcrypt.genSalt(10);

    user.password =
      await bcrypt.hash(

        newPassword,

        salt

      );

    await user.save();

    res.json({

      success: true,

      message:
        "Password updated"

    });

};


module.exports = {

  getProfile,

  updateProfile,

  changePassword

};