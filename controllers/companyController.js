exports.checkUEN = async (req, res) => { ... };
exports.registerCompany = async (req, res) => { ... };
exports.loginCompany = async (req, res) => { ... };
exports.getCompanyProfile = async (req, res) => { ... };

const Company = require("../models/Company.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isValidUEN } = require("../utils/validateUEN");

// POST /api/company/register
exports.registerCompany = async (req, res) => {
  try {
    const { uen, companyName, address, contactPerson, contactEmail, password } = req.body;

    // 1️⃣ Validate required fields
    if (!uen || !companyName || !contactPerson || !contactEmail || !password) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // 2️⃣ Validate UEN format
    if (!isValidUEN(uen)) {
      return res.status(400).json({ message: "Invalid UEN format." });
    }

    // 3️⃣ Check if company already exists
    const existingCompany = await Company.findOne({ uen });
    if (existingCompany) {
      return res.status(409).json({ message: "Company with this UEN already exists." });
    }

    // 4️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Save new company
    const newCompany = new Company({
      uen,
      companyName,
      address,
      contactPerson,
      contactEmail,
      password: hashedPassword
    });
    await newCompany.save();

    // 6️⃣ Generate JWT token
    const token = jwt.sign(
      { id: newCompany._id, uen: newCompany.uen, role: "company" },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1d" }
    );

    // 7️⃣ Respond to client
    res.status(201).json({
      message: "Company registered successfully.",
      company: {
        uen: newCompany.uen,
        companyName: newCompany.companyName,
        contactPerson: newCompany.contactPerson,
        contactEmail: newCompany.contactEmail
      },
      token
    });

  } catch (error) {
    console.error("❌ Error registering company:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// POST /api/company/login


// GET /api/company/profile

// GET /api/company/check-uen/:uen
