const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  salary: String,
  description: String,
  requirements: [String],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Remote'] },
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.models.Job || mongoose.model('Job', jobSchema);
