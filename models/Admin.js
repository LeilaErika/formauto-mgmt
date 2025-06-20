const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);

// The role field is set to "company" by default, indicating the type of user.
// This schema is used to create and manage admin user accounts in the application.
// It is exported as a Mongoose model named "Admin" for use in other parts of the application.
// The email field is unique to prevent duplicate registrations.
// The schema also includes timestamps for createdAt and updatedAt fields.
