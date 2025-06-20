const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  uen: { type: String, unique: true }, // Automatically generated
  role: { type: String, default: "company" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Company", companySchema);
// This code defines a Mongoose schema for a Company model.
// It includes fields for company name, email, password, UEN (unique entity number),
