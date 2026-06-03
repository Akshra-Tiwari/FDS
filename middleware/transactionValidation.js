const {
  body,
  validationResult
} = require(
  "express-validator"
);

const validateTransaction = [

  body("amount")
    .isNumeric()
    .withMessage(
      "Amount must be number"
    ),

  body("location")
    .notEmpty()
    .withMessage(
      "Location required"
    ),

  body("type")
    .notEmpty()
    .withMessage(
      "Type required"
    ),

  (req, res, next) => {

    const errors =
      validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({

        errors:
          errors.array()

      });

    }

    next();

  }

];

module.exports =
  validateTransaction;