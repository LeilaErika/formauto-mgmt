const express = require("express");
const router = express.Router();
const {
  createSIPForm,
  getMySubmissions,
  getSIPFormById,
  updateSIPForm,
  deleteSIPForm,
  downloadSIPFormPDF,
} = require("../controllers/sipController");
const { verifyToken, verifyCompany } = require("../middleware/authMiddleware");

router.post("/", verifyToken, verifyCompany, createSIPForm);
router.get("/mine", verifyToken, verifyCompany, getMySubmissions);
router.get("/:id", verifyToken, verifyCompany, getSIPFormById);
router.put("/:id", verifyToken, verifyCompany, updateSIPForm);
router.delete("/:id", verifyToken, verifyCompany, deleteSIPForm);
router.get("/download/:id", verifyToken, verifyCompany, downloadSIPFormPDF);

module.exports = router;
