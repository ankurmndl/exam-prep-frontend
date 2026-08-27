export function chooseNextQuestion(
  questions,
  answers,
  currentDifficulty,
  testedIds
) {
  const available = questions.filter(
    (question) => !testedIds.includes(question.id)
  );

  if (!available.length) {
    return null;
  }

  // Try to find a question at the requested difficulty
  let candidates = available.filter(
    (question) =>
      question.difficulty === currentDifficulty
  );

  // If none available, find the closest difficulty
  if (!candidates.length) {
    candidates = available.filter(
      (question) =>
        Math.abs(
          question.difficulty - currentDifficulty
        ) <= 1
    );
  }

  // Final fallback
  if (!candidates.length) {
    candidates = available;
  }

  // Prefer skills that have been tested less
  const skillCounts = {};

  answers.forEach((answer) => {
    skillCounts[answer.skill] =
      (skillCounts[answer.skill] || 0) + 1;
  });

  const lowestCount = Math.min(
    ...candidates.map(
      (question) => skillCounts[question.skill] || 0
    )
  );

  const balancedCandidates = candidates.filter(
    (question) =>
      (skillCounts[question.skill] || 0) === lowestCount
  );

  return balancedCandidates[
    Math.floor(
      Math.random() * balancedCandidates.length
    )
  ];
}

export function getNextDifficulty(
  currentDifficulty,
  correct
) {
  if (correct) {
    return Math.min(3, currentDifficulty + 1);
  }

  return Math.max(1, currentDifficulty - 1);
}

export function getSkillResults(answers) {
  const skills = {};

  answers.forEach((answer) => {
    if (!skills[answer.skill]) {
      skills[answer.skill] = {
        total: 0,
        correct: 0,
      };
    }

    skills[answer.skill].total++;

    if (answer.correct) {
      skills[answer.skill].correct++;
    }
  });

  return Object.entries(skills).map(
    ([skill, value]) => ({
      skill,
      total: value.total,
      correct: value.correct,
      percent: Math.round(
        (value.correct / value.total) * 100
      ),
    })
  );
}

export function getAssessment(skillResult) {
  if (skillResult.percent >= 80) {
    return "strong";
  }

  if (skillResult.percent >= 50) {
    return "developing";
  }

  return "needs_practice";
}