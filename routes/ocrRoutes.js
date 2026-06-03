const express =
  require("express");

const multer =
  require("multer");

const Tesseract =
  require("tesseract.js");


const router =
  express.Router();


const upload =
  multer({
    dest: "uploads/"
  });


router.post(
  "/scan",
  upload.single("receipt"),

  async (req, res) => {

    try {

      const result =
        await Tesseract.recognize(

          req.file.path,

          "eng"

        );

      const text =
        result.data.text;

      const amountMatch =
        text.match(/\d+(\.\d{1,2})?/);

      res.json({

        success: true,

        extractedText: text,

        detectedAmount:
          amountMatch
            ? amountMatch[0]
            : null

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          "OCR failed"

      });

    }

  }
);


module.exports =
  router;