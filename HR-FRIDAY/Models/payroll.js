const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming this refers to a MongoDB ObjectID
    required: true,
    ref: 'Company', // If you have a Company model, you can reference it here
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'Company'
  },
  employeeName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  baseSalary: {
    type: Number,
    required: true,
  },
  totalPackage: {
    type: Number,
    required: true,
  },
  overTime: {
    type: Number,
    default: 0, // Defaults to 0 if not provided
  },
  commission: {
    type: Number,
    default: 0,
  },
  benefits: {
    type: Number,
    default: 0,
  },
  taxRate: {
    type: Number,
    required: true,
  },
  previousPayoutDate: {
    type: Date,
    required: true,
  },
  nextPayoutDate: {
    type: Date,
    required: true,
  },
  benefitsClaim: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['PAID', 'UNPAID'],
    default: 'UNPAID',
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Payroll', payrollSchema);
