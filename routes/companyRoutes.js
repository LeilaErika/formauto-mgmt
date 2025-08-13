const express = require("express");
const router = express.Router();
const {
  checkUEN,
  registerCompany,
  loginCompany,
  getCompanyProfile,
} = require("../controllers/companyController");
const { verifyToken, verifyCompany } = require("../middlewares/authMiddleware");

router.get("/check-uen/:uen", checkUEN);
router.post("/register", registerCompany);
router.post("/login", loginCompany);
router.get("/profile", verifyToken, verifyCompany, getCompanyProfile);

module.exports = router;
