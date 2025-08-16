const mongoose = require("mongoose");

const sipFormSchema = new mongoose.Schema(
  {
    uen: { type: String, required: true, index: true }, // Foreign key to companies.uen
    organisation_name: { type: String, required: true },

    // Address is compulsory
    address: {
      block: { type: String, required: true },
      street: { type: String, required: true },
      unit_number: { type: String, required: true },
      unit_number_secondary: { type: String, required: true },
      building: { type: String, required: true },
      state: { type: String, required: true, default: "Singapore" },
      country: { type: String, required: true, default: "Singapore" },
      postal_code: { type: String, required: true }
    },

    contact_info: {
      tel_main: { type: String, required: true },
      fax: { type: String, required: true },
      email_general: { type: String, default: null }, // optional
      email_secondary: { type: String, default: null }, // optional
      website_url: { type: String, default: null } // optional
    },

    type_of_company: { type: String, required: true },
    nature_of_business: {
      main: { type: String, required: true },
      others: { type: String, default: null } // optional
    },

    staff_count_total: { type: Number, required: true },
    staff_count_department: { type: Number, default: null }, // optional

    student_reporting_address: {
      address: { type: String, default: null }, // optional
      postal_code: { type: String, default: null } // optional
    },

    main_contact: {
      salutation: { type: String, required: true },
      name: { type: String, required: true },
      department: { type: String, default: null }, // optional
      designation: { type: String, required: true },
      email: { type: String, required: true },
      tel: { type: String, required: true },
      mobile: { type: String, default: null },
      fax: { type: String, default: null }
    },

    sip_schedule: {
      preferred_diplomas: { type: [String], default: undefined }, // optional
      preferred_duration_months: { type: Number, default: null }, // optional
      preferred_start_month: { type: String, default: null } // optional
    },

    internship_requirements: [
      {
        diploma: { type: String, required: true },
        intern_count: { type: Number, required: true },
        job_scope: { type: String, required: true },
        supervisor_name: { type: String, required: true }
      }
    ],

    internship_details: {
      monthly_allowance_sgd: { type: Number, required: true },
      other_allowance: { type: String, default: null }, // optional
      ot_compensation: { type: String, default: null }, // optional
      transportation: { type: String, default: null }, // optional
      days_per_week: { type: Number, required: true },
      reporting_hours: {
        mon_fri: { from: { type: String, default: null }, to: { type: String, default: null } },
        saturday: { from: { type: String, default: null }, to: { type: String, default: null } },
        sunday_ph: { from: { type: String, default: null }, to: { type: String, default: null } }
      },
      shift_work: { type: String, default: null }, // optional
      interview_requirement: { type: String, required: true },
      special_requirement: { type: String, default: null }, // optional
      overseas_assignment_choice: { type: String, default: null },
      period_frequency: { type: String, default: null }, // optional
      country: { type: String, default: null } // optional
      
    },

    overseas_internship: {
      country: { type: String, default: null }, // optional
      other_country_details: { type: String, default: null }, // optional
      state: { type: String, default: null }, // optional
      city: { type: String, default: null }, // optional
      benefits: {
        airfare: { type: String, default: null },
        airport_pickup: { type: Boolean, default: false },
        accommodation: { type: Boolean, default: false },
        meals: { type: Boolean, default: false },
        travel_insurance: { type: Boolean, default: false },
        other_benefits: { type: String, default: null } // optional
      },
      relationship_with_sg_company: { type: String, default: null } // optional
    },

    other_info: {
      source: { type: String, default: null }, // optional
      source_details: { type: String, default: null }, // optional
      tp_contact: {
        name: { type: String, default: null }, // optional
        diploma: { type: String, default: null } // optional
      },
      future_engagements: { type: String, required: true } // compulsory
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("SipForm", sipFormSchema);
// This code defines the schema for SIP forms.
// It includes a reference to the company's UEN, a title for the form, and the form data itself.
// The form data is stored as an object, allowing for flexibility in the structure of the form