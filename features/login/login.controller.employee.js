const bcrypt = require("bcrypt");
const Employee = require("../../models/employee");
const generateToken = require("../../utils/generateToken");

const loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = generateToken(employee); // returns JWT with id, role, uen

    res.status(200).json({
      message: "Login successful",
      token,
      employee: {
        name: employee.name,
        email: employee.email,
        uen: employee.uen,
        role: employee.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = loginEmployee;
// This code defines the login controller for employee users.
// It checks if the employee exists by email, compares the input password with the stored hashed password,