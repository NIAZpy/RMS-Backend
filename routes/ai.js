const express = require('express');
const router = express.Router();
const { extractSkills } = require('../controllers/aiController');
const { match } = require('../controllers/aiController');

router.post('/extract-skills', extractSkills);

// POST /api/ai/match
router.post('/match', match);

module.exports = router;
