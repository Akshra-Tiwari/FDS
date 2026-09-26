const express = require("express");

const router = express.Router();

const Tesseract = require("tesseract.js");

const upload =
  require("../middleware/uploadMiddleware");

// This route previously returned a hardcoded fake success message
// without actually reading the uploaded image. It now runs real
// OCR (same engine as /api/ocr/scan) and returns the fields the
// frontend (ReceiptScanner.js) actually expects: message + detectedAmount.
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

      const result =
        await Tesseract.recognize(
          req.file.buffer,
          "eng"
        );

      const text = result.data.text;

      const amountMatch =
        text.match(/\d+(\.\d{1,2})?/);

      res.status(200).json({
        success: true,
        message: "Receipt scanned successfully",
        extractedText: text,
        detectedAmount:
          amountMatch ? amountMatch[0] : null
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
