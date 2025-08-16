const Admin = require("../models/Admin");
const Company = require("../models/Company");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST /api/admin/login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "Admin logged in successfully.",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name || null,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// GET /api/admin/submissions
// Returns all registered businesses (companies)
exports.getAllSubmissions = async (req, res) => {
  try {
    const companies = await Company.find().select("-password"); // exclude password
    res.status(200).json({
      message: "All registered companies retrieved successfully.",
      count: companies.length,
      companies,
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// GET /api/admin/submissions/:uen
// Returns a specific business by UEN
exports.getSubmissionByUEN = async (req, res) => {
  try {
    const { uen } = req.params;
    const company = await Company.findOne({ uen: uen.toUpperCase() }).select(
      "-password"
    );

    if (!company) {
      return res
        .status(404)
        .json({ message: `No company found for UEN ${uen}` });
    }

    res.status(200).json({
      message: "Company retrieved successfully.",
      company,
    });
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// DELETE /api/admin/submissions/:uen
exports.deleteCompanyByUEN = async (req, res) => {
  try {
    const { uen } = req.params;
    const deleted = await Company.findOneAndDelete({ uen: uen.toUpperCase() });
    if (!deleted) {
      return res
        .status(404)
        .json({ message: `No company found for UEN ${uen}` });
    }
    res
      .status(200)
      .json({ message: `Company with UEN ${uen} deleted successfully.` });
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
