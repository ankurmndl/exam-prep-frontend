const STORAGE_KEY = "grammar-pronouns-adjectives-used";

export const TEST_SIZE = 15;

export const GROUPS = {
  personal: [
    "Personal Pronouns",
    "Possessive Pronouns",
    "Reflexive Pronouns",
  ],
  otherPronouns: [
    "Demonstrative Pronouns",
    "Interrogative Pronouns",
    "Relative Pronouns",
    "Pronoun Usage",
    "Pronoun Agreement",
  ],
  adjectiveTypes: [
    "Adjectives of Quality",
    "Adjectives of Number",
    "Adjectives of Quantity",
    "Demonstrative Adjectives",
    "Possessive Adjectives",
    "Interrogative Adjectives",
    "Adjective Identification",
  ],
  comparison: [
    "Degrees of Comparison",
  ],
  usage: [
    "Adjective Usage",
  ],
  mixed: [
    "Mixed Grammar",
  ],
};

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function getUsedIds() {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );
  } catch {
    return [];
  }
}

export function saveUsedQuestions(ids) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(ids)
  );
}

function pickFromSkills(pool, skills, count) {
  const matching = shuffle(
    pool.filter((question) =>
      skills.includes(question.skill)
    )
  );

  return matching.slice(0, count);
}

export function generateGrammarTest(allQuestions) {
  let usedIds = getUsedIds();

  // Start a new 75-question cycle when fewer than 15
  // unused questions remain.
  let available = allQuestions.filter(
    (question) => !usedIds.includes(question.id)
  );

  if (available.length < TEST_SIZE) {
    usedIds = [];
    available = [...allQuestions];
    saveUsedQuestions([]);
  }

  const selected = [];
  const selectedIds = new Set();

  function addQuestions(skills, count) {
    const choices = pickFromSkills(
      available.filter(
        (question) =>
          !selectedIds.has(question.id)
      ),
      skills,
      count
    );

    choices.forEach((question) => {
      selected.push(question);
      selectedIds.add(question.id);
    });
  }

  // Balanced 15-question test
  addQuestions(GROUPS.personal, 3);
  addQuestions(GROUPS.otherPronouns, 4);
  addQuestions(GROUPS.adjectiveTypes, 3);
  addQuestions(GROUPS.comparison, 3);
  addQuestions(GROUPS.usage, 1);
  addQuestions(GROUPS.mixed, 1);

  // Safety fallback if any group runs short
  if (selected.length < TEST_SIZE) {
    const remaining = shuffle(
      available.filter(
        (question) =>
          !selectedIds.has(question.id)
      )
    );

    remaining
      .slice(0, TEST_SIZE - selected.length)
      .forEach((question) => {
        selected.push(question);
        selectedIds.add(question.id);
      });
  }

  const finalQuestions = shuffle(selected).slice(
    0,
    TEST_SIZE
  );

  saveUsedQuestions([
    ...usedIds,
    ...finalQuestions.map(
      (question) => question.id
    ),
  ]);

  return finalQuestions;
}

export function getDetailedFeedback(answers) {
  const skillMap = {};

  answers.forEach((answer) => {
    if (!skillMap[answer.skill]) {
      skillMap[answer.skill] = {
        total: 0,
        correct: 0,
      };
    }

    skillMap[answer.skill].total += 1;

    if (answer.correct) {
      skillMap[answer.skill].correct += 1;
    }
  });

  return Object.entries(skillMap)
    .map(([skill, result]) => ({
      skill,
      total: result.total,
      correct: result.correct,
      percent: Math.round(
        (result.correct / result.total) * 100
      ),
    }))
    .sort((a, b) => a.percent - b.percent);
}

export function getOverallAssessment(
  score,
  total
) {
  const percent = Math.round(
    (score / total) * 100
  );

  if (percent >= 85) {
    return {
      label: "Excellent",
      message:
        "Excellent work. You have a strong understanding of the grammar tested.",
    };
  }

  if (percent >= 70) {
    return {
      label: "Good",
      message:
        "Good understanding overall. Review the weaker areas before taking the next test.",
    };
  }

  if (percent >= 50) {
    return {
      label: "Developing",
      message:
        "You understand some important concepts, but more revision and practice are needed.",
    };
  }

  return {
    label: "Needs Practice",
    message:
      "This chapter needs more focused revision before moving ahead.",
  };
}