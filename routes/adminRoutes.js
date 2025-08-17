const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");

const {
  loginAdmin,
  getAllSubmissions,
  getSubmissionByUEN,
  deleteCompanyByUEN,
  deleteSIPFormById,
  exportSIPFormsExcel,
} = require("../controllers/adminController");

router.post("/login", loginAdmin);
router.get("/submissions", adminAuth, getAllSubmissions);
router.get("/submissions/:uen", adminAuth, getSubmissionByUEN);
router.delete("/submissions/:uen", adminAuth, deleteCompanyByUEN);

// New admin SIP form management endpoints
router.delete("/sip-forms/:id", adminAuth, deleteSIPFormById);
router.get("/sip-forms/export/excel", adminAuth, exportSIPFormsExcel);

module.exports = router;
