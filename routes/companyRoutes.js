const express = require("express");
const router = express.Router();
const {
  checkUEN,
  registerCompany,
  loginCompany,
  getCompanyProfile,
  getMockSIPForms,
} = require("../controllers/companyController");
const {
  verifyToken,
  verifyCompany,
  authenticateCompany,
} = require("../middleware/authMiddleware");

router.post("/check-uen", checkUEN); // expects { uen } in body
router.post("/register", registerCompany);
router.post("/login", loginCompany);

// Mock SIP forms route (phase 2: replace with real implementation)
router.get("/sip-forms", verifyToken, getMockSIPForms);
router.get("/profile", verifyToken, verifyCompany, getCompanyProfile);

module.exports = router;
