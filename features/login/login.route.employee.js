const express = require("express");
const router = express.Router();
const loginEmployee = require("./login.controller.employee");

router.post("/login-employee", loginEmployee);

module.exports = router;
// This code defines the login route for employee users.
// It imports the login controller and sets up a POST route for employee login.