const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', // This references the Company model
    required: true,
  },
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
