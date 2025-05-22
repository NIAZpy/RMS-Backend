exports.extractSkills = async (req, res) => {
  const { resumeText } = req.body;

  // Simulate AI parsing (you can replace this with real GPT/OpenAI logic)
  const keywords = ['JavaScript', 'React', 'Node.js', 'MongoDB'];
  const extracted = keywords.filter(skill => resumeText.includes(skill));

  res.json({ skills: extracted });
};
