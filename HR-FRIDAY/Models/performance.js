const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', // Reference to the Company model
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
    trim: true,
  },
  employeeName: {
    type: String,
    required: true,
    trim: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  departmentName: {
    type: String,
    required: true,
  },
  performanceScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  reviewer: {
    type: String,
    required: true,
  },
  lastReviewDate: {
    type: Date,
    default: Date.now,
  },
  strengthsNote: {
    type: String,
    trim: true,
  },
  improvementNote: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['PENDING REVIEW', 'REVIEWED'],
    default: 'PENDING REVIEW',
  },
});

const Performance = mongoose.model('Performance', performanceSchema);

module.exports = Performance;
