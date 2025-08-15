const mongoose = require("mongoose");

const sipFormSchema = new mongoose.Schema(
  {
    uen: { type: String, required: true }, // FK to companies.uen
    formTitle: { type: String, required: true },
    formData: { type: Object, required: true }, // could be detailed fields instead of generic
  },
  { timestamps: true }
);

module.exports = mongoose.model("SipForm", sipFormSchema);
// This code defines the schema for SIP forms.
// It includes a reference to the company's UEN, a title for the form, and the form data itself.
// The form data is stored as an object, allowing for flexibility in the structure of the form