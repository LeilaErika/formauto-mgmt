const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    uen: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
// and generates a JWT token for the company user upon successful login.
// It responds with a success message, the generated token, and company details.  