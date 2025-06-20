const express = require("express");
const router = express.Router();
const registerCompany = require("./register.controller.company");

router.post("/register-company", registerCompany);

module.exports = router;
// and role, with a default value of "company".
// The UEN is automatically generated and must be unique.
