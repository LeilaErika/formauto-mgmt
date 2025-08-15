const jwt = require("jsonwebtoken");
const Company = require("../models/Company");
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
}

// Middleware to verify company exists
async function verifyCompany(req, res, next) {
  try {
    const { uen } = req.user;
    if (!uen) return res.status(400).json({ message: "UEN missing in token" });
    const company = await Company.findOne({ uen });
    if (!company) return res.status(404).json({ message: "Company not found" });
    req.company = company;
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

// Alias for company authentication (can be extended)
const authenticateCompany = verifyToken;

module.exports = { verifyToken, verifyCompany, authenticateCompany };
