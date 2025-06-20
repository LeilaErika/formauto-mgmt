const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/authMiddleware");

router.get("/dashboard", verifyToken, (req, res) => {
  const role = req.user.role;

  let message;
  if (role === "company") {
    message = "Welcome to the Company Dashboard";
  } else if (role === "employee") {
    message = "Welcome to the Employee Dashboard";
  } else if (role === "admin") {
    message = "Welcome to the Admin Dashboard";
  } else {
    return res.status(403).json({ message: "Unauthorized role" });
  }

  res.json({
    message,
    user: req.user,
  });
});

module.exports = router;
// This route serves as a dashboard endpoint for different user roles.
// It checks the user's role and returns a welcome message accordingly.