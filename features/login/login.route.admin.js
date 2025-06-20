const express = require("express");
const router = express.Router();
const loginAdmin = require("./login.controller.admin");

router.post("/login-admin", loginAdmin);

module.exports = router;
// This code defines the login route for admin users.
// It imports the login controller and sets up a POST route for admin login.