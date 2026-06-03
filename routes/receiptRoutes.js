const express = require("express");

const router = express.Router();

const upload =
  require("../middleware/uploadMiddleware");

router.post(
  "/scan",
  upload.single("receipt"),
  async (req, res) => {

    try {

      if (!req.file) {

        return res.status(400).json({
          success: false,
          message: "No file uploaded"
        });

      }

      res.status(200).json({
        success: true,
        text: "Receipt scanned successfully"
      });

    }

    catch (err) {

      console.log(err);

      res.status(500).json({
        success: false,
        message: "Server error"
      });

    }

  }
);

module.exports = router;