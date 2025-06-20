const bcrypt = require("bcrypt");
const Employee = require("../../models/employee");
const Company = require("../../models/Company");

const registerEmployee = async (req, res) => {
  const { name, email, password, uen } = req.body;

  if (!name || !email || !password || !uen) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Verify UEN exists
    const company = await Company.findOne({ uen });
    if (!company) {
      return res
        .status(404)
        .json({ message: "Invalid UEN. Company not found." });
    }

    // Check if email already used
    const existing = await Employee.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      name,
      email,
      password: hashedPassword,
      uen,
    });

    await newEmployee.save();

    res
      .status(201)
      .json({
        message: "Employee registered successfully",
        employeeId: newEmployee._id,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = registerEmployee;
// This code defines the register controller for employee users.
// It checks if the UEN exists in the Company collection, verifies that the email is not already registered,
// hashes the password, and saves the new employee to the database. If successful, it responds with a success message and the new employee's ID.
// Make sure to export this controller in your routes file