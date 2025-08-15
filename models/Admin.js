const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed password
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
// This code defines the schema for the Admin model.
// It includes fields for email and password, both of which are required. 