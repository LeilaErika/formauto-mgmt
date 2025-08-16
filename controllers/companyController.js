// GET /api/company/sip-forms (mock implementation)
exports.getMockSIPForms = async (req, res) => {
  // In a real implementation, you would fetch forms from the database using req.user.id or req.user.uen
  // For now, return mock data
  return res.status(200).json({
    sipForms: [
      {
        formId: "SIP001",
        companyUEN: req.user ? req.user.uen : "202312345Z",
        status: "Draft",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        remarks: "This is a mock SIP form.",
      },
      {
        formId: "SIP002",
        companyUEN: req.user ? req.user.uen : "202312345Z",
        status: "Submitted",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        remarks: "Another mock SIP form.",
      },
    ],
  });
};
const Company = require("../models/Company.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isValidUEN } = require("../utils/validateUEN");

// POST /api/company/register
exports.registerCompany = async (req, res) => {
  try {
    const { uen, email, password } = req.body;

    // 1️⃣ Validate required fields
    if (!uen || !email || !password) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    // 2️⃣ Validate UEN format
    if (!isValidUEN(uen)) {
      return res.status(400).json({ message: "Invalid UEN format." });
    }

    // 3️⃣ Check if company already exists
    const existingCompany = await Company.findOne({ uen });
    if (existingCompany) {
      return res
        .status(409)
        .json({ message: "Company with this UEN already exists." });
    }

    // 4️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Save new company
    const newCompany = new Company({
      uen,
      email,
      password: hashedPassword,
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
        email: newCompany.email,
      },
      token,
    });
  } catch (error) {
    console.error("❌ Error registering company:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// POST /api/company/login
exports.loginCompany = async (req, res) => {
  try {
    const { uen, email, password } = req.body;

    // 1️⃣ Require at least one identifier and password
    if ((!uen && !email) || !password) {
      return res
        .status(400)
        .json({ message: "UEN or email, and password are required." });
    }

    // 2️⃣ Find company by UEN or email
    const company = await Company.findOne(uen ? { uen } : { email });

    if (!company) {
      return res.status(404).json({ message: "Company not found." });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // 4️⃣ Generate JWT token
    const token = jwt.sign(
      { id: company._id, uen: company.uen, role: "company" },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1d" }
    );

    // 5️⃣ Respond with token and basic company info
    res.status(200).json({
      message: "Login successful.",
      company: {
        uen: company.uen,
        email: company.email,
      },
      token,
    });
  } catch (error) {
    console.error("❌ Error logging in company:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// GET /api/company/profile
exports.getCompanyProfile = async (req, res) => {
  try {
    // 1️⃣ Ensure authentication middleware has set req.user
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 2️⃣ Fetch company from DB (exclude password)
    const company = await Company.findById(req.user.id).select("-password");
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // 3️⃣ Return company details
    res.status(200).json({
      message: "Company profile retrieved successfully.",
      company,
    });
  } catch (error) {
    console.error("❌ Error retrieving company profile:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.authenticateCompany = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "supersecretkey"
    );
    req.user = decoded; // { id, uen, role }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// POST /api/company/check-uen
exports.checkUEN = async (req, res) => {
  try {
    const { uen } = req.body;

    // 1️⃣ Validate input
    if (!uen) {
      return res.status(400).json({ message: "UEN is required." });
    }

    // 2️⃣ Validate UEN format
    if (!isValidUEN(uen)) {
      return res.status(400).json({ message: "Invalid UEN format." });
    }

    // 3️⃣ Search for existing company
    const company = await Company.findOne({ uen }).select("-password");

    if (company) {
      // ✅ Found: Return details (excluding password)
      return res.status(200).json({
        exists: true,
        company,
      });
    }

    // ❌ Not found
    res.status(200).json({ exists: false });
  } catch (error) {
    console.error("❌ Error checking UEN:", error);
    res.status(500).json({ message: "Server error." });
  }
};
