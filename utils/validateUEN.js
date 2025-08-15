exports.isValidUEN = (uen) => {
  // Example: UEN must be 9 or 10 alphanumeric characters
  return typeof uen === "string" && /^[A-Za-z0-9]{9,10}$/.test(uen);
};
