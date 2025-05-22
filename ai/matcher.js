function matchCandidateToJob(candidateSkills, jobSkills) {
  const matches = candidateSkills.filter(skill =>
    jobSkills.includes(skill.toLowerCase())
  );
  const score = (matches.length / jobSkills.length) * 100;

  return {
    matchedSkills: matches,
    matchPercentage: Math.round(score)
  };
}

module.exports = { matchCandidateToJob };
