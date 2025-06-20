const bcrypt = require("bcrypt");
const Admin = require("../../models/Admin");
const generateToken = require("../../utils/generateToken");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = generateToken(admin);

    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = loginAdmin;
// This code defines the login controller for admin users.
// It checks if the admin exists by email, compares the input password with the stored hashed password,