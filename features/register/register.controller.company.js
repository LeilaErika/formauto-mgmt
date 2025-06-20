const Company = require("../../models/Company");
const bcrypt = require("bcrypt");
const generateUEN = require("../../utils/generateUEN");

const registerCompany = async (req, res) => {
  const { companyName, email, password } = req.body;

  if (!companyName || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }

  try {
    const existing = await Company.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const uen = await generateUEN();

    const newCompany = new Company({
      companyName,
      email,
      password: hashedPassword,
      uen
    });

    await newCompany.save();

    res.status(201).json({
      message: "Company registered successfully",
      uen: newCompany.uen
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = registerCompany;
// This code defines the register controller for business users.
// It checks if the email is already registered, hashes the password, generates a unique UEN,
// and saves the new business user to the database. If successful, it responds with a success message and the generated UEN.