const express = require("express");
const router = express.Router();
const loginCompany = require("./login.controller.company");

router.post("/login-company", loginCompany);

module.exports = router;
// This code defines the login route for company users.
// It imports the login controller and sets up a POST route for company login.