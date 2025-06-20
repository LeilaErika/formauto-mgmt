const Company = require("../../models/Company");
const bcrypt = require("bcrypt");
const generateToken = require("../../utils/generateToken");

const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email, and password are required." });
  }

  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found with provided email." });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = generateToken(company);

    res.status(200).json({
      message: "Login successful",
      token,
      company: {
        companyName: company.companyName,
        email: company.email,
        uen: company.uen,
        role: company.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = loginCompany;
// This code defines the login controller for company users.
// It checks if the company exists by email, compares the input password with the stored hashed password,
