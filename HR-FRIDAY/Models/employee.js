const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeName: String,
  CNIC: String,
  phoneNumber: String,
  email: String,
  password: String,
  address: String,
  employeeType: {
    type: String,
    enum: ["Employee", "Team Lead", "Manager"],
  },
  shift: String,
  joiningDate: Date,
  jobTitle: String,
  department: String,
  seniorityLevel: {
    type: String,
    enum: ["FRESHER", "JUNIOR", "MID", "SENIOR"],
  },
  branch: String,
  baseSalary: Number,
  totalPackage: Number,
  overTime: Number,
  commission: Number,
  benefits: String,
  taxRate: Number,
  numberOfPaidLeave: Number,
  isManager: Boolean,
});

module.exports = mongoose.model("Employee", employeeSchema);
