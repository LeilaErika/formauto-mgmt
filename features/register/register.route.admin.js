const express = require("express");
const router = express.Router();
const registerAdmin = require("./register.controller.admin");

router.post("/register-admin", registerAdmin);

module.exports = router;
// This code defines the registration route for admin users.
// It imports the register controller and sets up a POST route for admin registration.