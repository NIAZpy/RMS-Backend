const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  interviewer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  mode: {
    type: String,
    enum: ['Online', 'Offline'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled'],
    default: 'Scheduled',
  },
  feedback: {
    type: String,
    maxlength: 1000,
  }
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);
