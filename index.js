// index.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Load .env variables

const app = express();

// Middleware
app.use(express.json()); // Instead of bodyParser.json()

// Enable CORS for development
app.use(cors()); // Allow all origins
// Or, restrict to specific origin:
// app.use(cors({
//   origin: "http://127.0.0.1:5500",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/sip")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Route Imports
const companyRoutes = require("./routes/companyRoutes");
const adminRoutes = require("./routes/adminRoutes");
const sipRoutes = require("./routes/sipRoutes");

// Route Mounting
app.use("/api/company", companyRoutes); // UEN check, register, login, profile
app.use("/api/admin", adminRoutes); // Admin portal routes

// for now
app.use("/api/sip", sipRoutes); // SIP form CRUD for companies

// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "SIP API is running" });
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
