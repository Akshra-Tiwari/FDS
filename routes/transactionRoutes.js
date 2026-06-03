const express =
  require("express");

const router =
  express.Router();

const {
  createTransaction,
  getTransactions,
  getFraudStats,
  getRecentFrauds,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getFraudLocations
} = require(
  "../controllers/transactionController"
);

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

  const validateTransaction =
  require(
    "../middleware/transactionValidation"
  );

// CREATE TRANSACTION
router.post(
  "/",
  authMiddleware,
  validateTransaction,
  createTransaction
);


// GET ALL TRANSACTIONS
router.get(
  "/",
  authMiddleware,
  getTransactions
);


// GET FRAUD STATS
router.get(
  "/stats",
  authMiddleware,
  getFraudStats
);


// GET RECENT FRAUDS
router.get(
  "/recent-frauds",
  authMiddleware,
  getRecentFrauds
);


// GET SINGLE TRANSACTION
router.get(
  "/:id",
  authMiddleware,
  getTransactionById
);

// DELETE
router.delete(
  "/:id",
  authMiddleware,
  deleteTransaction
);
router.get(
  "/fraud-locations",
  authMiddleware,
  getFraudLocations
);

module.exports =
  router;