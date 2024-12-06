const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  companyID: String,
  employeeID: String,
  employeeName: String,
  jobTitle: String,
  comeTime: Date,
  comeLocation: String,
  comeLat: Number,
  comeLong: Number,
  offTime: Date,
  offLocation: String,
  offLat: Number,
  offLong: Number,
  status: {
    type: String,
    enum: ["PRESENT", "WFH", "ABSENT", "LATE", "LEAVE"],
  },
  dailyReport: String,
});

module.exports = mongoose.model("Attendance", attendanceSchema);
