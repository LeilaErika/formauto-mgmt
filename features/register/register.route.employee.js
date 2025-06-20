const express = require("express");
const router = express.Router();
const registerEmployee = require("./register.controller.employee");

router.post("/register-employee", registerEmployee);

module.exports = router;
// This code defines the registration route for employee users.
// It imports the register controller and sets up a POST route for employee registration.