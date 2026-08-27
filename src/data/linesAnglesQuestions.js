const questions = [
  // =========================
  // BASIC LINE CONCEPTS
  // =========================

  {
    id: "line-easy-1",
    skill: "Basic Line Concepts",
    difficulty: 1,
    question: "Which figure extends endlessly in both directions?",
    options: ["Line segment", "Ray", "Line", "Point"],
    answer: 2,
    explanation:
      "A line extends endlessly in both directions.",
  },
  {
    id: "line-easy-2",
    skill: "Basic Line Concepts",
    difficulty: 1,
    question: "A ray has how many endpoints?",
    options: ["0", "1", "2", "3"],
    answer: 1,
    explanation:
      "A ray starts at one endpoint and extends endlessly in one direction.",
  },
  {
    id: "line-medium-1",
    skill: "Basic Line Concepts",
    difficulty: 2,
    question:
      "Two lines that never meet and remain the same distance apart are called:",
    options: [
      "Intersecting lines",
      "Parallel lines",
      "Perpendicular lines",
      "Rays",
    ],
    answer: 1,
    explanation:
      "Parallel lines never meet and remain the same distance apart.",
  },
  {
    id: "line-medium-2",
    skill: "Basic Line Concepts",
    difficulty: 2,
    question:
      "Two lines intersect to form four right angles. What are these lines called?",
    options: [
      "Parallel lines",
      "Perpendicular lines",
      "Curved lines",
      "Rays",
    ],
    answer: 1,
    explanation:
      "Perpendicular lines intersect at 90°.",
  },
  {
    id: "line-hard-1",
    skill: "Basic Line Concepts",
    difficulty: 3,
    question:
      "If two distinct lines are perpendicular to the same line, how are they related to each other?",
    options: [
      "They intersect at 90°",
      "They are parallel",
      "They form a ray",
      "They must overlap",
    ],
    answer: 1,
    explanation:
      "In a plane, two distinct lines perpendicular to the same line are parallel.",
  },

  // =========================
  // TYPES OF ANGLES
  // =========================

  {
    id: "type-easy-1",
    skill: "Types of Angles",
    difficulty: 1,
    question: "Which angle is an acute angle?",
    options: ["45°", "90°", "120°", "180°"],
    answer: 0,
    explanation:
      "An acute angle is greater than 0° and less than 90°.",
  },
  {
    id: "type-easy-2",
    skill: "Types of Angles",
    difficulty: 1,
    question: "An angle measuring exactly 90° is called:",
    options: [
      "Acute angle",
      "Obtuse angle",
      "Right angle",
      "Straight angle",
    ],
    answer: 2,
    explanation:
      "An angle of exactly 90° is a right angle.",
  },
  {
    id: "type-medium-1",
    skill: "Types of Angles",
    difficulty: 2,
    question: "Which of the following is an obtuse angle?",
    options: ["65°", "90°", "135°", "180°"],
    answer: 2,
    explanation:
      "An obtuse angle is greater than 90° but less than 180°.",
  },
  {
    id: "type-medium-2",
    skill: "Types of Angles",
    difficulty: 2,
    question: "Which angle is a reflex angle?",
    options: ["89°", "145°", "180°", "225°"],
    answer: 3,
    explanation:
      "A reflex angle is greater than 180° and less than 360°.",
  },
  {
    id: "type-hard-1",
    skill: "Types of Angles",
    difficulty: 3,
    question:
      "An angle is 35° more than a right angle. What type of angle is it?",
    options: [
      "Acute",
      "Right",
      "Obtuse",
      "Straight",
    ],
    answer: 2,
    explanation:
      "90° + 35° = 125°, which is an obtuse angle.",
  },

  // =========================
  // ANGLE MEASUREMENT
  // =========================

  {
    id: "measure-easy-1",
    skill: "Angle Measurement",
    difficulty: 1,
    question:
      "What is the measure of a straight angle?",
    options: ["90°", "120°", "180°", "360°"],
    answer: 2,
    explanation:
      "A straight angle measures 180°.",
  },
  {
    id: "measure-easy-2",
    skill: "Angle Measurement",
    difficulty: 1,
    question:
      "One complete turn measures:",
    options: ["90°", "180°", "270°", "360°"],
    answer: 3,
    explanation:
      "One complete turn is 360°.",
  },
  {
    id: "measure-medium-1",
    skill: "Angle Measurement",
    difficulty: 2,
    question:
      "An angle measures 145°. How much more is needed to make a straight angle?",
    options: ["25°", "35°", "45°", "55°"],
    answer: 1,
    explanation:
      "A straight angle is 180°. 180° − 145° = 35°.",
  },
  {
    id: "measure-medium-2",
    skill: "Angle Measurement",
    difficulty: 2,
    question:
      "An angle measures 270°. What is its smaller angle measure?",
    options: ["45°", "90°", "180°", "270°"],
    answer: 1,
    explanation:
      "360° − 270° = 90°.",
  },
  {
    id: "measure-hard-1",
    skill: "Angle Measurement",
    difficulty: 3,
    question:
      "A reflex angle measures 250°. What is the smaller angle formed by the same two rays?",
    options: ["100°", "110°", "120°", "130°"],
    answer: 1,
    explanation:
      "The smaller angle is 360° − 250° = 110°.",
  },

  // =========================
  // ANGLE RELATIONSHIPS
  // =========================

  {
    id: "relation-easy-1",
    skill: "Angle Relationships",
    difficulty: 1,
    question:
      "Two angles whose sum is 90° are called:",
    options: [
      "Adjacent angles",
      "Supplementary angles",
      "Complementary angles",
      "Reflex angles",
    ],
    answer: 2,
    explanation:
      "Complementary angles add up to 90°.",
  },
  {
    id: "relation-easy-2",
    skill: "Angle Relationships",
    difficulty: 1,
    question:
      "Two angles whose sum is 180° are called:",
    options: [
      "Complementary angles",
      "Supplementary angles",
      "Reflex angles",
      "Acute angles",
    ],
    answer: 1,
    explanation:
      "Supplementary angles add up to 180°.",
  },
  {
    id: "relation-medium-1",
    skill: "Angle Relationships",
    difficulty: 2,
    question:
      "Two angles are complementary. One angle is 37°. What is the other angle?",
    options: ["43°", "53°", "143°", "153°"],
    answer: 1,
    explanation:
      "90° − 37° = 53°.",
  },
  {
    id: "relation-medium-2",
    skill: "Angle Relationships",
    difficulty: 2,
    question:
      "Two angles are supplementary. One angle is 118°. What is the other angle?",
    options: ["52°", "62°", "72°", "82°"],
    answer: 1,
    explanation:
      "180° − 118° = 62°.",
  },
  {
    id: "relation-hard-1",
    skill: "Angle Relationships",
    difficulty: 3,
    question:
      "Three adjacent angles on a straight line measure 45°, 2x°, and 55°. Find x.",
    options: ["35", "40", "45", "50"],
    answer: 1,
    explanation:
      "45 + 2x + 55 = 180. Therefore 2x = 80 and x = 40.",
  },
  {
    id: "relation-hard-2",
    skill: "Angle Relationships",
    difficulty: 3,
    question:
      "Two complementary angles are in the ratio 2:3. What is the smaller angle?",
    options: ["30°", "36°", "45°", "54°"],
    answer: 1,
    explanation:
      "The total is 90°. Five parts = 90°, so one part = 18°. The smaller angle = 2 × 18° = 36°.",
  },

  // =========================
  // REASONING
  // =========================

  {
    id: "reason-easy-1",
    skill: "Angle Reasoning",
    difficulty: 1,
    question:
      "Two adjacent angles form a straight angle. If one is 70°, what is the other?",
    options: ["20°", "70°", "90°", "110°"],
    answer: 3,
    explanation:
      "Angles on a straight line add up to 180°. 180° − 70° = 110°.",
  },
  {
    id: "reason-medium-1",
    skill: "Angle Reasoning",
    difficulty: 2,
    question:
      "Four angles around a point are 80°, 95°, 110°, and x°. Find x.",
    options: ["65°", "70°", "75°", "85°"],
    answer: 2,
    explanation:
      "Angles around a point add up to 360°. x = 360 − 80 − 95 − 110 = 75°.",
  },
  {
    id: "reason-medium-2",
    skill: "Angle Reasoning",
    difficulty: 2,
    question:
      "Two adjacent angles form a right angle. One angle is 28°. Find the other.",
    options: ["52°", "62°", "72°", "82°"],
    answer: 1,
    explanation:
      "28° + x = 90°, so x = 62°.",
  },
  {
    id: "reason-hard-1",
    skill: "Angle Reasoning",
    difficulty: 3,
    question:
      "Three angles around a point are 3x°, 2x°, and 100°. Find x.",
    options: ["45", "50", "52", "65"],
    answer: 2,
    explanation:
      "3x + 2x + 100 = 360. Therefore 5x = 260 and x = 52.",
  },
  {
    id: "reason-hard-2",
    skill: "Angle Reasoning",
    difficulty: 3,
    question:
      "Two supplementary angles are in the ratio 4:5. What is the larger angle?",
    options: ["80°", "90°", "100°", "120°"],
    answer: 2,
    explanation:
      "4 + 5 = 9 parts. 180° ÷ 9 = 20°. Larger angle = 5 × 20° = 100°.",
  },
];

export default questions;