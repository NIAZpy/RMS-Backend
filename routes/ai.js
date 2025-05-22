const express = require('express');
const router = express.Router();
const { extractSkills } = require('../controllers/aiController');

router.post('/extract-skills', extractSkills);

module.exports = router;
