const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  companyID: String,
  employeeID: String,
  name: String,
  department: String,
  leaveDate: Date,
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
  },
});

module.exports = mongoose.model("Leave", leaveSchema);
