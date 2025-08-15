const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  getAllSubmissions,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
  downloadSubmissionPDF,
  exportSubmissionsToExcel,
} = require("../controllers/adminController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

router.post("/login", loginAdmin);
router.get("/submissions", verifyToken, verifyAdmin, getAllSubmissions);
router.get("/submissions/:id", verifyToken, verifyAdmin, getSubmissionById);
router.put("/submissions/:id", verifyToken, verifyAdmin, updateSubmission);
router.delete("/submissions/:id", verifyToken, verifyAdmin, deleteSubmission);
router.get("/download/:id", verifyToken, verifyAdmin, downloadSubmissionPDF);
router.get("/export/excel", verifyToken, verifyAdmin, exportSubmissionsToExcel);

module.exports = router;
