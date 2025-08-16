<<<<<<< HEAD
const mongoose = require("mongoose");
const SIPForm = require("../models/SipForm");

// Create a form
exports.createSIPForm = async (req, res) => {
  try {
    const data = {
      uen: req.body.uen,
      organisation_name: req.body.organisation_name,

      address: {
        block: req.body.block,
        street: req.body.street,
        unit_number: req.body.unit_number,
        unit_number_secondary: req.body.unit_number_secondary,
        building: req.body.building,
        state: req.body.state || "Singapore",
        country: req.body.country || "Singapore",
        postal_code: req.body.postal_code
      },

      contact_info: {
        tel_main: req.body.tel_main,
        fax: req.body.fax,
        email_general: req.body.email_general || null,
        email_secondary: req.body.email_secondary || null,
        website_url: req.body.website_url || null
      },

      type_of_company: req.body.type_of_company,
      nature_of_business: {
        main: req.body.nature_of_business_main,
        others: req.body.nature_of_business_others || null
      },

      staff_count_total: req.body.staff_count_total,
      staff_count_department: req.body.staff_count_department || null,

      student_reporting_address: {
        address: req.body.student_reporting_address || null,
        postal_code: req.body.student_reporting_postal_code || null
      },

      main_contact: {
        salutation: req.body.main_contact_salutation,
        name: req.body.main_contact_name,
        department: req.body.main_contact_department || null,
        designation: req.body.main_contact_designation,
        email: req.body.main_contact_email,
        tel: req.body.main_contact_tel,
        mobile: req.body.main_contact_mobile || null,
        fax: req.body.main_contact_fax || null
      },

      sip_schedule: req.body.preferred_diplomas
        ? {
            preferred_diplomas: Array.isArray(req.body.preferred_diplomas)
              ? req.body.preferred_diplomas
              : [req.body.preferred_diplomas].filter(Boolean),
            preferred_duration_months: req.body.preferred_duration_months || null,
            preferred_start_month: req.body.preferred_start_month || null
          }
        : null,

      internship_requirements: req.body.internship_requirements || [],

      internship_details: {
        monthly_allowance_sgd: req.body.monthly_allowance_sgd,
        other_allowance: req.body.other_allowance || null,
        ot_compensation: req.body.ot_compensation || null,
        transportation: req.body.transportation || null,
        days_per_week: req.body.days_per_week,
        reporting_hours: {
          mon_fri: { from: req.body.mon_fri_from || null, to: req.body.mon_fri_to || null },
          saturday: { from: req.body.sat_from || null, to: req.body.sat_to || null },
          sunday_ph: { from: req.body.sun_from || null, to: req.body.sun_to || null }
        },
        shift_work: req.body.shift_work || null,
        interview_requirement: req.body.interview_requirement,
        special_requirement: req.body.special_requirement || null,

        overseas_assignment_choice: req.body.overseas_assignment_choice || null,
        period_frequency: req.body.period_frequency || null,
        country: req.body.country || null
      },

      overseas_internship: req.body.overseas_internship_country
        ? {
            country: req.body.overseas_internship_country,
            other_country_details: req.body.overseas_internship_other_country_details || null,
            state: req.body.overseas_internship_state || null,
            city: req.body.overseas_internship_city || null,
            benefits: {
              airfare: req.body.airfare || null,
              airport_pickup: req.body.airport_pickup === "true",
              accommodation: req.body.accommodation === "true",
              meals: req.body.meals === "true",
              travel_insurance: req.body.travel_insurance === "true",
              other_benefits: req.body.other_benefits || null
            },
            relationship_with_sg_company: req.body.relationship_with_sg_company || null
          }
        : null,

      other_info: {
        source: req.body.source || null,
        source_details: req.body.source_details || null,
        tp_contact: {
          name: req.body.tp_contact_name || null,
          diploma: req.body.tp_contact_diploma || null
        },
        future_engagements: req.body.future_engagements
      }
    };

    if (!data.uen || !data.organisation_name) {
      return res.status(400).json({
        success: false,
        message: "uen and organisation_name are required."
      });
    }

    if (!data.other_info.future_engagements) {
      return res.status(400).json({
        success: false,
        message: "future_engagements is a required field."
      });
    }

    if (data.internship_details.overseas_assignment_choice) {
      if (!data.internship_details.period_frequency || !data.internship_details.country) {
        return res.status(400).json({
          success: false,
          message:
            "If overseas_assignment_choice is provided, both period_frequency and country are required."
        });
      }
    }

    const newForm = await SipForm.create(data);

    return res.status(201).json({
      success: true,
      message: "SIP form submitted successfully",
      form: newForm
    });
  } catch (error) {
    console.error("Error creating SIP form:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

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

exports.downloadSIPFormPDF = async (req, res) => {  };   
=======
// exports.createSIPForm = async (req, res) => { ... };
// exports.getMySubmissions = async (req, res) => { ... };
// exports.getSIPFormById = async (req, res) => { ... };
// exports.updateSIPForm = async (req, res) => { ... };
// exports.deleteSIPForm = async (req, res) => { ... };
// exports.downloadSIPFormPDF = async (req, res) => { ... };
>>>>>>> 7bb6f56a7f7fdf2988bff9f54eecd16ceec92fa6
