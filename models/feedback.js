const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
    required: true,
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true,
  },
  reviewer: {
    type: String,
    required: true, // e.g., name or role of the reviewer
  },
  comments: {
    type: String,
    maxlength: 2000,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  date: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
