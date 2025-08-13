exports.isValidUEN = (uen) => { ... };

exports.isValidUEN = (uen) => {
  // Singapore UEN format: 9 or 10 characters alphanumeric
  const regex = /^[0-9A-Z]{9,10}$/;
  return regex.test(uen);
};
