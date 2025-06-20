const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, uen: user.uen },
    process.env.JWT_SECRET || "yourSecretKey", // Use env var in production
    { expiresIn: "7d" }
  );
};

module.exports = generateToken;
// This function generates a JWT token for the user with their ID, role, and UEN.
// The token is signed with a secret key and expires in 7 days.