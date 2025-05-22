const Candidate = require('../models/Candidate'); // ✅ fixed
const Job = require('../models/Job');
const { matchCandidateToJob } = require('../ai/matcher');

exports.extractSkills = async (req, res) => {
  const { resumeText } = req.body;

  // Simulated AI skill extraction
  const keywords = ['JavaScript', 'React', 'Node.js', 'MongoDB'];
  const extracted = keywords.filter(skill => resumeText.includes(skill));

  res.json({ skills: extracted });
};

exports.match = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.body.candidateId);
    const job = await Job.findById(req.body.jobId);

    if (!candidate || !job) {
      return res.status(404).json({ message: 'Candidate or Job not found' });
    }

    const result = matchCandidateToJob(
      candidate.skills.map(s => s.toLowerCase()),
      job.requirements.map(s => s.toLowerCase()) // ✅ corrected key
    );

    res.json({ candidate: candidate.name, job: job.title, ...result });
  } catch (error) {
    res.status(500).json({ error: 'AI Match failed', details: error.message });
  }
};
