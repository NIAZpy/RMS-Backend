const express = require('express');
const router = express.Router();
const Interview = require('../models/interview');

// Create an interview
router.post('/', async (req, res) => {
  try {
    const interview = new Interview(req.body);
    const savedInterview = await interview.save();
    res.status(201).json(savedInterview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all interviews
router.get('/', async (req, res) => {
  try {
    const interviews = await Interview.find()
      .populate('candidate', 'name email')
      .populate('job', 'title');
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get interview by ID
router.get('/:id', async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id)
      .populate('candidate', 'name email')
      .populate('job', 'title');
    if (!interview) return res.status(404).json({ message: 'Not found' });
    res.json(interview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update interview
router.put('/:id', async (req, res) => {
  try {
    const updated = await Interview.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete interview
router.delete('/:id', async (req, res) => {
  try {
    await Interview.findByIdAndDelete(req.params.id);
    res.json({ message: 'Interview deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
