const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const { body, validationResult } = require('express-validator');


// Create candidate profile
router.post('/', async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    const saved = await candidate.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all candidate profiles
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get one candidate
router.get('/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ error: 'Not found' });
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update candidate
router.put('/:id', async (req, res) => {
  try {
    const updated = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete candidate
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Candidate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted', deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Create candidate with validation
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('skills').isArray({ min: 1 }).withMessage('At least one skill is required'),
    body('resumeLink').optional().isURL().withMessage('Resume must be a valid URL')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      const candidate = new Candidate(req.body);
      const saved = await candidate.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);



module.exports = router;
