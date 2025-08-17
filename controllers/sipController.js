
const mongoose = require("mongoose");
const SIPForm = require("../models/SipForm");

// Create a form


// Get all forms
exports.getMySubmissions = async (req, res) => {
  try {
    const companyId = req.user.companyId; 

    if (!companyId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: company not found in token"
      });
    }

    const forms = await SIPForm.find({ company: companyId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: forms.length,
      submissions: forms
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching SIP submissions"
    });
  }
};

// Get specific form by its ID
exports.getSIPFormById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid form ID."
      });
    }

    const form = await SIPForm.findById(id);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "SIP form not found."
      });
    }

    return res.status(200).json({
      success: true,
      form
    });
  } catch (error) {
    console.error("Error fetching SIP form by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching SIP form."
    });
  }
};

// Update Form Details
exports.updateSIPForm = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid form ID."
      });
    }

    const existingForm = await SIPForm.findById(id);
    if (!existingForm) {
      return res.status(404).json({
        success: false,
        message: "SIP form not found."
      });
    }

    const updates = req.body;

    if (updates.uen === "") {
      return res.status(400).json({ success: false, message: "uen is required." });
    }
    if (updates.organisation_name === "") {
      return res.status(400).json({ success: false, message: "organisation_name is required." });
    }
    if (updates.other_info?.future_engagements === "") {
      return res.status(400).json({ success: false, message: "future_engagements is required." });
    }

    const updatedForm = await SIPForm.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    return res.status(200).json({
      success: true,
      message: "SIP form updated successfully",
      form: updatedForm
    });
  } catch (error) {
    console.error("Error updating SIP form:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating SIP form"
    });
  }
};

exports.deleteSIPForm = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid form ID."
      });
    }

    const form = await SIPForm.findById(id);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "SIP form not found."
      });
    }

    await form.remove();

    return res.status(200).json({
      success: true,
      message: "SIP form deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting SIP form:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting SIP form"
    });
  }
};

exports.downloadSIPFormExcel = async (req, res) => {  };   
// exports.createSIPForm = async (req, res) => { ... };
// exports.getMySubmissions = async (req, res) => { ... };
// exports.getSIPFormById = async (req, res) => { ... };
// exports.updateSIPForm = async (req, res) => { ... };
// exports.deleteSIPForm = async (req, res) => { ... };
// exports.downloadSIPFormPDF = async (req, res) => { ... };

