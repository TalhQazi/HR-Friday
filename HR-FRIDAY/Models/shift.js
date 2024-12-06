const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId, // Refers to the Company ObjectID
    required: true,
    ref: 'Company', // Reference to the Company model
  },
  shiftName: {
    type: String,
    required: true,
  },
  shiftStartingTime: {
    type: String, // Use String to store time in formats like '08:00 AM'
    required: true,
  },
  shiftEndingTime: {
    type: String, // Use String to store time in formats like '04:00 PM'
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Shift', shiftSchema);
