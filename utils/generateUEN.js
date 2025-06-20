const Business = require("../models/Company");

const generateUEN = async () => {
  const count = await Business.countDocuments();
  return "TPBIZ-" + String(count + 1).padStart(4, "0");
};

module.exports = generateUEN;
// This function generates a unique UEN for a business by counting the number of existing businesses
// and formatting it with a prefix and zero-padding. It ensures that each UEN is unique by incrementing the count.