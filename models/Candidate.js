const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },
  phone: {
    type: String,
    match: [/^\+?[0-9]{7,15}$/, 'Phone number is invalid'],
  },
  skills: {
    type: [String],
    required: true,
    validate: {
      validator: function (arr) {
        return arr.length > 0;
      },
      message: "At least one skill is required",
    },
  },
  experience: {
    type: String,
    maxlength: 1000,
  },
  resumeLink: {
    type: String,
    match: [/^https?:\/\/.+/, 'Resume must be a valid URL'],
  },
  appliedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.models.Candidate || mongoose.model('Candidate', candidateSchema);

