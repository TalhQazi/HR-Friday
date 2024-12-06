const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  milestoneHeading: {
    type: String,
    required: true,
  },
  milestoneStartDate: {
    type: Date,
    required: true,
  },
  milestoneDeadlineDate: {
    type: Date,
    required: true,
  },
  milestoneStatus: {
    type: String,
    enum: ['IN PROGRESS', 'ON TRACK', 'BEHIND SCHEDULE', 'COMPLETED', 'PENDING REVIEW'],
    required: true,
  },
});

const projectSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  projectName: {
    type: String,
    required: true,
    trim: true,
  },
  numberOfMilestones: {
    type: Number,
    required: true,
  },
  milestones: [milestoneSchema],
  managerName: {
    type: String,
    required: true,
  },
  projectCompletionPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  employeeName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  departmentName: {
    type: String,
    required: true,
  },
  projectStartDate: {
    type: Date,
    required: true,
  },
  projectDeadlineDate: {
    type: Date,
    required: true,
  },
  performanceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Performance', // Reference to the Performance model
    required: true,
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
