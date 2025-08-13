// index.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Load .env variables

const app = express();

// Middleware
app.use(express.json()); // Instead of bodyParser.json()

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/sip", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Route Imports
const companyRoutes = require("./routes/companyRoutes");
const sipRoutes = require("./routes/sipRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Route Mounting
app.use("/api/company", companyRoutes); // UEN check, register, login, profile
app.use("/api/sip", sipRoutes); // SIP form CRUD for companies
app.use("/api/admin", adminRoutes); // Admin portal routes

// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "SIP API is running" });
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
