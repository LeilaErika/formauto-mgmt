const ExcelJS = require("exceljs");

// submissions: array of SIP form documents
exports.exportSubmissionsExcel = async (submissions) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("SIP Forms");

  // Define columns (add more as needed)
  worksheet.columns = [
    { header: "ID", key: "_id", width: 24 },
    { header: "UEN", key: "uen", width: 16 },
    { header: "Organisation Name", key: "organisation_name", width: 32 },
    { header: "Created At", key: "createdAt", width: 20 },
    { header: "Updated At", key: "updatedAt", width: 20 },
    // Add more fields as needed
  ];

  submissions.forEach((form) => {
    worksheet.addRow({
      _id: form._id.toString(),
      uen: form.uen,
      organisation_name: form.organisation_name,
      createdAt: form.createdAt
        ? new Date(form.createdAt).toLocaleString()
        : "",
      updatedAt: form.updatedAt
        ? new Date(form.updatedAt).toLocaleString()
        : "",
      // Add more fields as needed
    });
  });

  // Return as buffer
  return workbook.xlsx.writeBuffer();
};
