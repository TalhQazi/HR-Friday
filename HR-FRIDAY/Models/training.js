const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming this refers to the Company's ObjectID
    required: true,
    ref: 'Company', // Reference to the Company model
  },
  employeeName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startingDate: {
    type: Date,
    required: true,
  },
  deadlineDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['COMPLETED', 'PENDING', 'UPCOMING'], // Restricts to these values
    default: 'PENDING', // Default status
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Training', trainingSchema);
