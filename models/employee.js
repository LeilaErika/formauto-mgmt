const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    uen: {
      type: String,
      required: true, // Link to the company's UEN
    },
    role: {
      type: String,
      default: "employee",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
// and role, with a default value of "company".
// The UEN is required and must be unique.
// The schema also includes timestamps for created and updated dates.