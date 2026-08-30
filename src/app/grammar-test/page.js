"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
  Clock3,
  CheckCircle2,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";

import questions from "@/data/pronounsAdjectivesQuestions";

import {
  TEST_SIZE,
  generateGrammarTest,
  getDetailedFeedback,
  getOverallAssessment,
} from "@/lib/grammarTest";

const TOTAL_SECONDS = 20 * 60;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(
    2,
    "0"
  )}:${String(remainingSeconds).padStart(
    2,
    "0"
  )}`;
}

export default function GrammarTestPage() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] =
    useState(TOTAL_SECONDS);

  const [testQuestions, setTestQuestions] =
    useState([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState(null);

  const [answers, setAnswers] = useState([]);

  // TIMER
  useEffect(() => {
    if (!started || finished) return;

    if (timeLeft <= 0) {
      setFinished(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) =>
        previous <= 1 ? 0 : previous - 1
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [started, finished, timeLeft]);

  useEffect(() => {
    if (started && timeLeft === 0) {
      setFinished(true);
    }
  }, [started, timeLeft]);

  function startTest() {
    const generatedTest =
      generateGrammarTest(questions);

    setTestQuestions(generatedTest);
    setStarted(true);
  }

  function submitAnswer() {
    if (selectedAnswer === null) return;

    const currentQuestion =
      testQuestions[currentIndex];

    const correct =
      selectedAnswer === currentQuestion.answer;

    const newAnswers = [
      ...answers,
      {
        id: currentQuestion.id,
        skill: currentQuestion.skill,
        question: currentQuestion.question,
        correct,
        selectedAnswer,
        correctAnswer: currentQuestion.answer,
        explanation: currentQuestion.explanation,
      },
    ];

    setAnswers(newAnswers);

    if (
      currentIndex >=
      testQuestions.length - 1
    ) {
      setFinished(true);
      return;
    }

    setCurrentIndex(
      (previous) => previous + 1
    );

    setSelectedAnswer(null);
  }

  function restartTest() {
    setStarted(false);
    setFinished(false);
    setTimeLeft(TOTAL_SECONDS);
    setTestQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
  }

  const score = useMemo(
    () =>
      answers.filter(
        (answer) => answer.correct
      ).length,
    [answers]
  );

  const feedback = useMemo(
    () => getDetailedFeedback(answers),
    [answers]
  );

  const overall = useMemo(
    () =>
      getOverallAssessment(
        score,
        TEST_SIZE
      ),
    [score]
  );

  const currentQuestion =
    testQuestions[currentIndex];

  const timeUsed =
    TOTAL_SECONDS - timeLeft;

  // =========================
  // START
  // =========================

  if (!started) {
    return (
      <div className="min-h-screen bg-slate-50">

        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <div className="card p-6 sm:p-10">

            <div className="mx-auto max-w-xl text-center">

              <Clock3 className="mx-auto h-12 w-12" />

              <p className="mt-6 text-sm font-medium text-slate-500">
                English Grammar · Class 6
              </p>

              <h1 className="mt-2 text-3xl font-bold">
                Pronouns & Adjectives
              </h1>

              <p className="mt-3 text-slate-500">
                Mastery Practice Test
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="text-2xl font-bold">
                    15
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    Questions
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="text-2xl font-bold">
                    20 min
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    Time Limit
                  </div>
                </div>

              </div>

              <div className="mt-7 rounded-xl border border-slate-200 p-4 text-left text-sm text-slate-600">

                <p className="font-semibold text-slate-900">
                  75-question mastery bank
                </p>

                <p className="mt-2 leading-6">
                  Every test selects 15 balanced
                  questions from Pronouns and
                  Adjectives. Questions already
                  attempted are avoided until the
                  question bank cycle is completed.
                </p>

              </div>

              <button
                onClick={startTest}
                className="mt-8 w-full rounded-xl bg-slate-900 px-5 py-3.5 font-semibold text-white hover:bg-slate-800"
              >
                Start Test
              </button>

            </div>

          </div>
        </main>

      </div>
    );
  }

  // =========================
  // RESULTS
  // =========================

  if (finished) {
    return (
      <div className="min-h-screen bg-slate-50">

        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">

          <div className="card p-6 text-center sm:p-8">

            <Trophy className="mx-auto h-10 w-10" />

            <p className="mt-4 text-sm text-slate-500">
              Test Complete
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              Pronouns & Adjectives
            </h1>

            <div className="mt-6 text-5xl font-bold">
              {score}
              <span className="text-2xl text-slate-400">
                /{TEST_SIZE}
              </span>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Time used: {formatTime(timeUsed)} / 20:00
            </p>

            <div className="mx-auto mt-6 max-w-xl rounded-xl bg-slate-50 p-4">

              <div className="font-bold">
                {overall.label}
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {overall.message}
              </p>

            </div>

          </div>

          {/* SKILL FEEDBACK */}

          <section className="mt-6">

            <h2 className="text-lg font-bold">
              Detailed Feedback
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              See exactly which grammar areas need more work.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">

              {feedback.map((item) => {
                const strong =
                  item.percent >= 80;

                const developing =
                  item.percent >= 50 &&
                  item.percent < 80;

                const Icon = strong
                  ? CheckCircle2
                  : developing
                  ? RotateCcw
                  : XCircle;

                const label = strong
                  ? "Strong"
                  : developing
                  ? "Developing"
                  : "Needs Practice";

                return (
                  <div
                    key={item.skill}
                    className="card p-5"
                  >

                    <div className="flex items-center justify-between gap-3">

                      <div className="flex items-center gap-2">

                        <Icon className="h-5 w-5" />

                        <span className="text-sm font-semibold">
                          {label}
                        </span>

                      </div>

                      <span className="text-lg font-bold">
                        {item.percent}%
                      </span>

                    </div>

                    <h3 className="mt-4 font-semibold">
                      {item.skill}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      {item.correct} correct out of{" "}
                      {item.total}
                    </p>

                    <p className="mt-3 text-sm leading-6 text-slate-600">

                      {strong &&
                        "Excellent understanding of this area. Keep it strong with occasional practice."}

                      {developing &&
                        "You understand the basics, but revise this area and practise similar questions."}

                      {!strong &&
                        !developing &&
                        "This is a priority revision area. Review the concept carefully before the next test."}

                    </p>

                  </div>
                );
              })}

            </div>

          </section>

          {/* MISTAKE REVIEW */}

          <section className="mt-6">

            <h2 className="text-lg font-bold">
              Review Mistakes
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Understand the mistake before taking the next test.
            </p>

            <div className="mt-4 space-y-4">

              {answers
                .filter((answer) => !answer.correct)
                .map((answer, index) => (
                  <div
                    key={answer.id}
                    className="card p-5"
                  >

                    <div className="flex items-center gap-2">

                      <XCircle className="h-5 w-5" />

                      <span className="text-sm font-semibold">
                        Mistake {index + 1}
                      </span>

                    </div>

                    <p className="mt-4 font-medium">
                      {answer.question}
                    </p>

                    <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm">

                      <p>
                        <span className="font-semibold">
                          Explanation:
                        </span>{" "}
                        {answer.explanation}
                      </p>

                    </div>

                  </div>
                ))}

              {score === TEST_SIZE && (
                <div className="card p-5 text-center text-sm text-slate-600">
                  Excellent — no mistakes to review in this test.
                </div>
              )}

            </div>

          </section>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">

            <button
              onClick={restartTest}
              className="flex-1 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold hover:bg-slate-50"
            >
              Take Next Test
            </button>

            <Link
              href="/"
              className="flex-1 rounded-xl bg-slate-900 px-5 py-3 text-center font-semibold text-white hover:bg-slate-800"
            >
              Back to Dashboard
            </Link>

          </div>

        </main>
      </div>
    );
  }

  // =========================
  // TEST
  // =========================

  const warning =
    timeLeft <= 60
      ? "urgent"
      : timeLeft <= 300
      ? "warning"
      : "normal";

  return (
    <div className="min-h-screen bg-slate-50">

      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">

          <div className="flex items-center justify-between gap-4">

            <div>
              <p className="text-xs font-medium text-slate-500">
                Pronouns & Adjectives
              </p>

              <p className="mt-1 text-sm font-semibold">
                Question {currentIndex + 1} of{" "}
                {TEST_SIZE}
              </p>
            </div>

            <div
              className={`rounded-xl px-4 py-2 ${
                warning === "urgent"
                  ? "bg-red-50"
                  : warning === "warning"
                  ? "bg-amber-50"
                  : "bg-slate-100"
              }`}
            >

              <div className="flex items-center gap-2 font-bold">
                <Clock3 className="h-4 w-4" />
                {formatTime(timeLeft)}
              </div>

              <div className="mt-0.5 text-center text-[10px] text-slate-500">
                Time left
              </div>

            </div>

          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">

            <div
              className="h-full rounded-full bg-slate-900 transition-all"
              style={{
                width: `${
                  ((currentIndex + 1) /
                    TEST_SIZE) *
                  100
                }%`,
              }}
            />

          </div>

        </div>

      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">

        {currentQuestion && (
          <div className="card p-6 sm:p-8">

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {currentQuestion.skill}
            </span>

            <h1 className="mt-6 text-xl font-semibold leading-8 sm:text-2xl">
              {currentQuestion.question}
            </h1>

            <div className="mt-7 space-y-3">

              {currentQuestion.options.map(
                (option, index) => {
                  const selected =
                    selectedAnswer === index;

                  return (
                    <button
                      key={option}
                      onClick={() =>
                        setSelectedAnswer(index)
                      }
                      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                        selected
                          ? "border-slate-900 bg-slate-50"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >

                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                          selected
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-300 text-slate-500"
                        }`}
                      >
                        {String.fromCharCode(
                          65 + index
                        )}
                      </div>

                      <span className="font-medium">
                        {option}
                      </span>

                    </button>
                  );
                }
              )}

            </div>

            <button
              disabled={selectedAnswer === null}
              onClick={submitAnswer}
              className="mt-8 w-full rounded-xl bg-slate-900 px-5 py-3.5 font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {currentIndex === TEST_SIZE - 1
                ? "Finish Test"
                : "Submit Answer"}
            </button>

          </div>
        )}

      </main>

    </div>
  );
}