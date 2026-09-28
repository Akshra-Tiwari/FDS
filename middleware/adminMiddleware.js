// authMiddleware has already loaded the full user (without password)
// into req.user, so no second database lookup is needed here.
const adminMiddleware =
  (req, res, next) => {

    if (
      !req.user ||
      req.user.role !== "admin"
    ) {

      return res.status(403).json({
        message:
          "Access denied. Admin only."
      });

    }

    next();

  };

module.exports =
  adminMiddleware;
