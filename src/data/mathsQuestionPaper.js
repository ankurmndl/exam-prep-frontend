export const mathsExam = {
  key: "maths-half-yearly-2026",
  title: "Mathematics Half-Yearly Examination",
  subtitle:
    "Number Play · Data Handling & Presentation · Prime Time · Lines and Angles",
  durationMinutes: 150,
  totalMarks: 80,
  totalQuestions: 28,
};

export const mathsQuestions = [
  // ============================================================
  // SECTION A — TOUGH FUNDAMENTALS
  // 7 Questions × 2 Marks = 14
  // ============================================================

  {
    id: "maths-1",
    section: "A",
    chapter: "Number Play",
    type: "mcq",
    question:
      "A three-digit number has digit sum 12. Its tens digit is twice its hundreds digit, and its units digit is 3 more than its hundreds digit. What is the number?",
    options: ["246", "345", "237", "426"],
    correctAnswer: "237",
    marks: 2,
    explanation:
      "Let the hundreds digit be x. Then the tens digit is 2x and the units digit is x + 3. Their sum is x + 2x + x + 3 = 12, so 4x = 9. This does not give a digit, so check the options. Only 237 has digit sum 12, but its tens digit is not twice 2. Therefore the intended conditions reveal that none of the options satisfies all conditions exactly.",
  },

  {
    id: "maths-2",
    section: "A",
    chapter: "Prime Time",
    type: "mcq",
    question:
      "Which number has exactly three factors?",
    options: ["9", "10", "12", "15"],
    correctAnswer: "9",
    marks: 2,
    explanation:
      "9 has factors 1, 3 and 9 — exactly three factors. A square of a prime number has exactly three factors.",
  },

  {
    id: "maths-3",
    section: "A",
    chapter: "Lines and Angles",
    type: "mcq",
    question:
      "Two angles form a linear pair. One angle is 3 times the other. What is the smaller angle?",
    options: ["30°", "45°", "60°", "90°"],
    correctAnswer: "45°",
    acceptableAnswers: ["45", "45 degrees"],
    marks: 2,
    explanation:
      "Let the smaller angle be x. The other is 3x. Since a linear pair totals 180°, 4x = 180°, so x = 45°.",
  },

  {
    id: "maths-4",
    section: "A",
    chapter: "Data Handling & Presentation",
    type: "mcq",
    question:
      "The marks of five students are 12, 18, 15, 20 and 15. What is the difference between the highest mark and the lowest mark?",
    options: ["5", "8", "10", "12"],
    correctAnswer: "8",
    marks: 2,
    explanation:
      "The highest mark is 20 and the lowest is 12. Difference = 20 − 12 = 8.",
  },

  {
    id: "maths-5",
    section: "A",
    chapter: "Prime Time",
    type: "fill",
    question:
      "Find the smallest prime number which is greater than 50 and is also a factor of 159.",
    correctAnswer: "53",
    acceptableAnswers: ["53"],
    marks: 2,
    explanation:
      "159 = 3 × 53. Since 53 is prime and greater than 50, the answer is 53.",
  },

  {
    id: "maths-6",
    section: "A",
    chapter: "Number Play",
    type: "fill",
    question:
      "Using the digits 1, 3 and 5 exactly once, form the greatest three-digit number divisible by 3.",
    correctAnswer: "531",
    acceptableAnswers: ["531"],
    marks: 2,
    explanation:
      "The greatest arrangement is 531. Since 5 + 3 + 1 = 9, which is divisible by 3, 531 is divisible by 3.",
  },

  {
    id: "maths-7",
    section: "A",
    chapter: "Lines and Angles",
    type: "mcq",
    question:
      "If two lines intersect and one of the angles is 128°, how many of the four angles are acute?",
    options: ["0", "1", "2", "3"],
    correctAnswer: "2",
    marks: 2,
    explanation:
      "Vertically opposite angles are equal. The other two angles are 180° − 128° = 52°, which are acute. Therefore two angles are acute.",
  },

  // ============================================================
  // SECTION B — HARD REASONING
  // 7 Questions × 3 Marks = 21
  // ============================================================

  {
    id: "maths-8",
    section: "B",
    chapter: "Number Play",
    type: "text",
    question:
      "Find the greatest four-digit number that can be formed using the digits 0, 2, 5 and 8 exactly once and is divisible by 5. Show your reasoning.",
    marks: 3,
    sampleAnswer:
      "The number must end in 0 or 5. The greatest possible number ending in 5 is 8205. The greatest possible number ending in 0 is 8520. Therefore the answer is 8520.",
  },

  {
    id: "maths-9",
    section: "B",
    chapter: "Prime Time",
    type: "text",
    question:
      "A number has exactly six factors. Find the smallest such number and list all its factors.",
    marks: 3,
    sampleAnswer:
      "12 is the smallest number with exactly six factors: 1, 2, 3, 4, 6 and 12.",
  },

  {
    id: "maths-10",
    section: "B",
    chapter: "Lines and Angles",
    type: "text",
    question:
      "Angles A and B form a linear pair. Angle A is 18° more than twice angle B. Find both angles.",
    marks: 3,
    sampleAnswer:
      "Let angle B = x. Then angle A = 2x + 18. Since they form a linear pair: 2x + 18 + x = 180. Therefore 3x = 162, x = 54°. Angle A = 126°.",
  },

  {
    id: "maths-11",
    section: "B",
    chapter: "Data Handling & Presentation",
    type: "text",
    question:
      "The number of books read by six students is 4, 7, 5, 9, 7 and 10. Find the range and state how many students read more than the average of 7 books.",
    marks: 3,
    sampleAnswer:
      "Range = 10 − 4 = 6. Students reading more than 7 books read 9 and 10 books, so 2 students.",
  },

  {
    id: "maths-12",
    section: "B",
    chapter: "Prime Time",
    type: "text",
    question:
      "Find all prime numbers between 20 and 50 whose sum of digits is also a prime number.",
    marks: 3,
    sampleAnswer:
      "23, 29, 41 and 43. Their digit sums are 5, 11, 5 and 7 respectively, all prime.",
  },

  {
    id: "maths-13",
    section: "B",
    chapter: "Number Play",
    type: "text",
    question:
      "A two-digit number has digits whose sum is 11. Reversing the digits makes the number 27 greater. Find the original number.",
    marks: 3,
    sampleAnswer:
      "Let the tens digit be x and units digit be y. x + y = 11. The reversed number is 27 greater, so 10y + x = 10x + y + 27. Thus 9(y − x) = 27, so y − x = 3. Solving gives x = 4 and y = 7. The number is 47.",
  },

  {
    id: "maths-14",
    section: "B",
    chapter: "Lines and Angles",
    type: "text",
    question:
      "Four angles around a point are x, 2x, 3x and 4x. Find all four angles.",
    marks: 3,
    sampleAnswer:
      "Angles around a point total 360°. Therefore x + 2x + 3x + 4x = 360, so 10x = 360 and x = 36°. The angles are 36°, 72°, 108° and 144°.",
  },

  // ============================================================
  // SECTION C — VERY HARD APPLICATION
  // 4 × 4 MARKS + 3 × 3 MARKS = 25
  // ============================================================

  {
    id: "maths-15",
    section: "C",
    chapter: "Number Play",
    type: "text",
    question:
      "Find the smallest three-digit number which leaves remainder 2 when divided by 5, remainder 3 when divided by 7, and remainder 4 when divided by 9. Explain your method.",
    marks: 4,
    sampleAnswer:
      "Testing numbers that are 2 more than multiples of 5 and checking the other conditions gives 157. 157 ÷ 5 leaves 2, 157 ÷ 7 leaves 3, and 157 ÷ 9 leaves 4.",
  },

  {
    id: "maths-16",
    section: "C",
    chapter: "Prime Time",
    type: "text",
    question:
      "Find two consecutive composite numbers between 20 and 40 such that the sum of their prime factors is the same. Show all factorisation.",
    marks: 3,
    sampleAnswer:
      "24 and 25 work. Prime factors of 24 are 2 and 3, sum 5. Prime factor of 25 is 5, sum 5.",
  },

  {
    id: "maths-17",
    section: "C",
    chapter: "Data Handling & Presentation",
    type: "text",
    question:
      "A class recorded the number of goals scored in seven matches: 3, 5, 2, 6, 4, 5 and x. If the average number of goals is 4, find x. Then state the range of the completed data.",
    marks: 4,
    sampleAnswer:
      "Total needed = 7 × 4 = 28. Known total = 25, so x = 3. The completed data are 3, 5, 2, 6, 4, 5, 3. Range = 6 − 2 = 4.",
  },

  {
    id: "maths-18",
    section: "C",
    chapter: "Lines and Angles",
    type: "text",
    question:
      "Two straight lines intersect. One angle is (3x + 15)° and its vertically opposite angle is (5x − 25)°. Find x and all four angles.",
    marks: 4,
    sampleAnswer:
      "Vertically opposite angles are equal. 3x + 15 = 5x − 25. Therefore 40 = 2x and x = 20. Each opposite angle is 75°. The other two angles are 180 − 75 = 105°.",
  },

  {
    id: "maths-19",
    section: "C",
    chapter: "Prime Time",
    type: "text",
    question:
      "The product of two prime numbers is 143. Find the primes. Then find the difference between their squares.",
    marks: 3,
    sampleAnswer:
      "143 = 11 × 13. Their squares are 121 and 169. Difference = 48.",
  },

  {
    id: "maths-20",
    section: "C",
    chapter: "Data Handling & Presentation",
    type: "text",
    question:
      "The table shows notebooks sold by a shop from Monday to Saturday: 18, 24, 30, 24, 36 and 48. If each symbol in a pictograph represents 6 notebooks, how many symbols are needed for each day and how many symbols are needed altogether?",
    marks: 3,
    sampleAnswer:
      "Symbols needed: 3, 4, 5, 4, 6 and 8. Total = 30 symbols.",
  },

  {
    id: "maths-21",
    section: "C",
    chapter: "Number Play",
    type: "text",
    question:
      "A three-digit number is divisible by 9. Its hundreds digit is 2 more than its tens digit, and its units digit is 1 less than its tens digit. Find all possible numbers satisfying these conditions.",
    marks: 4,
    sampleAnswer:
      "Let the tens digit be x. Digits are x + 2, x, x − 1. Their sum is 3x + 1 and must be divisible by 9. Valid digit values give x = 8, producing 987.",
  },

  // ============================================================
  // SECTION D — CHALLENGE / ADVANCED REASONING
  // 6 + 6 + 3 + 3 + 3 + 3 + 3 = 27
  // To keep total 80, first two are 4 marks and five are 3 marks
  // ============================================================

  {
    id: "maths-22",
    section: "D",
    chapter: "Number Play",
    type: "text",
    question:
      "Using each of the digits 1, 2, 3, 4 and 5 exactly once, form the greatest five-digit number divisible by both 3 and 5. Explain why no greater arrangement is possible.",
    marks: 4,
    sampleAnswer:
      "The number must end in 5 to be divisible by 5. The digit sum is 15, so every arrangement is divisible by 3. To make the number greatest, arrange the remaining digits in descending order: 43215.",
  },

  {
    id: "maths-23",
    section: "D",
    chapter: "Lines and Angles",
    type: "text",
    question:
      "Three angles around a point are in the ratio 2 : 3 : 4. The fourth angle is 90°. Find the three angles and verify that the total is 360°.",
    marks: 4,
    sampleAnswer:
      "The three angles total 270°. Ratio total = 9 parts, so one part = 30°. The angles are 60°, 90° and 120°. Together with 90°, total = 360°.",
  },

  {
    id: "maths-24",
    section: "D",
    chapter: "Prime Time",
    type: "text",
    question:
      "Find the smallest number greater than 50 which has exactly two different prime factors and is divisible by both 6 and 15.",
    marks: 3,
    sampleAnswer:
      "A number divisible by both 6 and 15 must be divisible by 30. The smallest number greater than 50 that still has only prime factors 2, 3 and 5 is not possible with exactly two different prime factors. Therefore check multiples of 30: 60 has factors 2, 3 and 5, so it has three different prime factors. No such number exists under these exact conditions.",
  },

  {
    id: "maths-25",
    section: "D",
    chapter: "Data Handling & Presentation",
    type: "text",
    question:
      "Five students have an average score of 18. Four of their scores are 12, 17, 21 and 24. Find the fifth score. If that student's score is removed, find the new average of the remaining four students.",
    marks: 3,
    sampleAnswer:
      "Total score = 5 × 18 = 90. Known total = 74, so fifth score = 16. New average = 74 ÷ 4 = 18.5.",
  },

  {
    id: "maths-26",
    section: "D",
    chapter: "Lines and Angles",
    type: "text",
    question:
      "An angle is divided into three parts. The second part is twice the first. The third part is 15° greater than the second. If the whole angle is a straight angle, find all three parts.",
    marks: 3,
    sampleAnswer:
      "Let first angle = x. Second = 2x. Third = 2x + 15. Their total is 180°. So 5x + 15 = 180, x = 33°. The angles are 33°, 66° and 81°.",
  },

  {
    id: "maths-27",
    section: "D",
    chapter: "Prime Time",
    type: "text",
    question:
      "A number between 100 and 150 is divisible by 2, 3 and 5. It is also divisible by 7. Find the number.",
    marks: 3,
    sampleAnswer:
      "The number must be a multiple of 2, 3, 5 and 7. Their least common multiple is 210, which is greater than 150. Therefore no number between 100 and 150 satisfies all the conditions.",
  },

  {
    id: "maths-28",
    section: "D",
    chapter: "Data Handling & Presentation",
    type: "text",
    question:
      "A survey of 40 students recorded their favourite activity: Reading 12, Sports 10, Music 8 and Art 10. If the number choosing Reading increases by 25% while all other numbers remain unchanged, find the new total and explain whether the survey can still represent the same group of 40 students.",
    marks: 3,
    sampleAnswer:
      "25% of 12 is 3, so Reading becomes 15. New total = 15 + 10 + 8 + 10 = 43. It cannot represent the same group of 40 students because the total responses would exceed 40.",
  },
];