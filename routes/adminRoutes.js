const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const adminMiddleware =
  require("../middleware/adminMiddleware");

const {
  getAllUsers,
  freezeUser,
  unfreezeUser,
  getAdminAnalytics
} = require("../controllers/adminController");


// GET ALL USERS
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);


// FREEZE USER
router.put(
  "/freeze/:id",
  authMiddleware,
  adminMiddleware,
  freezeUser
);


// UNFREEZE USER
router.put(
  "/unfreeze/:id",
  authMiddleware,
  adminMiddleware,
  unfreezeUser
);


// ADMIN ANALYTICS (was written in adminController but never
// wired up to a route)
router.get(
  "/analytics",
  authMiddleware,
  adminMiddleware,
  getAdminAnalytics
);

module.exports =
  router;