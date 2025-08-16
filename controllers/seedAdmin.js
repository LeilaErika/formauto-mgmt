// seed/adminSeeder.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

const seedAdmin = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/formauto-db"); // change DB name

    const email = "admin@example.com";
    const password = "SuperSecure123";
    const name = "Main Admin";

    // Check if admin already exists
    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("Admin already exists:", email);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin seeded successfully:", email);
    process.exit(0);
  } catch (err) {
    console.error("Error seeding admin:", err);
    process.exit(1);
  }
};

seedAdmin();
