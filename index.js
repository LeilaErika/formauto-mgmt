const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// DB connection
mongoose
  .connect("mongodb://localhost:27017/sip")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Register routes
const registerCompanyRoute = require("./features/register/register.route.company");
app.use("/api", registerCompanyRoute);

const registerEmployeeRoute = require("./features/register/register.route.employee");
app.use("/api", registerEmployeeRoute);

const registerAdminRoute = require("./features/register/register.route.admin");
app.use("/api", registerAdminRoute);

// Login routes
const loginCompanyRoute = require("./features/login/login.route.company");
app.use("/api", loginCompanyRoute);

const loginEmployeeRoute = require("./features/login/login.route.employee");
app.use("/api", loginEmployeeRoute);

const loginAdminRoute = require("./features/login/login.route.admin");
app.use("/api", loginAdminRoute);

// Dashboard (protected) route
const dashboardCompanyRoute = require("./features/login/dashboard.route");
app.use("/api/company", dashboardCompanyRoute);

const employeeDashboardRoute = require("./features/login/dashboard.route");
app.use("/api/employee", employeeDashboardRoute);

const adminDashboardRoute = require("./features/login/dashboard.route");
app.use("/api/admin", adminDashboardRoute);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
