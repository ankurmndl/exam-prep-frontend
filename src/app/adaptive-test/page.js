"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock3,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
} from "lucide-react";

import questions from "@/data/linesAnglesQuestions";

import {
  chooseNextQuestion,
  getNextDifficulty,
  getSkillResults,
  getAssessment,
} from "@/lib/adaptiveTest";

const TOTAL_QUESTIONS = 15;
const TOTAL_SECONDS = 20 * 60;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

export default function AdaptiveTestPage() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const [timeLeft, setTimeLeft] =
    useState(TOTAL_SECONDS);

  const [currentQuestion, setCurrentQuestion] =
    useState(null);

  const [selectedAnswer, setSelectedAnswer] =
    useState(null);

  const [answers, setAnswers] = useState([]);

  const [testedIds, setTestedIds] = useState([]);

  const [difficulty, setDifficulty] = useState(2);

  const questionNumber = answers.length + 1;

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

  // AUTO SUBMIT WHEN TIMER ENDS
  useEffect(() => {
    if (started && timeLeft === 0) {
      setFinished(true);
    }
  }, [timeLeft, started]);

  function startTest() {
    const firstQuestion = chooseNextQuestion(
      questions,
      [],
      2,
      []
    );

    setCurrentQuestion(firstQuestion);
    setTestedIds([firstQuestion.id]);
    setStarted(true);
  }

  function submitAnswer() {
    if (
      selectedAnswer === null ||
      !currentQuestion
    ) {
      return;
    }

    const correct =
      selectedAnswer === currentQuestion.answer;

    const newAnswer = {
      id: currentQuestion.id,
      skill: currentQuestion.skill,
      difficulty: currentQuestion.difficulty,
      correct,
      selectedAnswer,
    };

    const newAnswers = [...answers, newAnswer];

    setAnswers(newAnswers);

    // TEST COMPLETE
    if (newAnswers.length >= TOTAL_QUESTIONS) {
      setFinished(true);
      return;
    }

    // CHANGE DIFFICULTY
    const nextDifficulty = getNextDifficulty(
      difficulty,
      correct
    );

    setDifficulty(nextDifficulty);

    // CHOOSE NEXT QUESTION
    const nextQuestion = chooseNextQuestion(
      questions,
      newAnswers,
      nextDifficulty,
      testedIds
    );

    if (!nextQuestion) {
      setFinished(true);
      return;
    }

    setCurrentQuestion(nextQuestion);

    setTestedIds((previous) => [
      ...previous,
      nextQuestion.id,
    ]);

    setSelectedAnswer(null);
  }

  function restartTest() {
    setStarted(false);
    setFinished(false);
    setTimeLeft(TOTAL_SECONDS);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setAnswers([]);
    setTestedIds([]);
    setDifficulty(2);
  }

  const score = useMemo(
    () =>
      answers.filter((answer) => answer.correct)
        .length,
    [answers]
  );

  const skillResults = useMemo(
    () => getSkillResults(answers),
    [answers]
  );

  const timeUsed =
    TOTAL_SECONDS - timeLeft;

  // =========================
  // START SCREEN
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

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">

                <Clock3 className="h-7 w-7" />

              </div>

              <p className="mt-6 text-sm font-medium text-slate-500">
                Maths · Half-Yearly Examination
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                Lines & Angles
              </h1>

              <p className="mt-3 text-slate-500">
                Adaptive Practice Assessment
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

              <div className="mt-8 rounded-xl border border-slate-200 p-4 text-left text-sm text-slate-600">

                <p className="font-semibold text-slate-800">
                  How it works
                </p>

                <ul className="mt-3 space-y-2">

                  <li>
                    • Questions adapt to your answers.
                  </li>

                  <li>
                    • Correct answers may lead to harder questions.
                  </li>

                  <li>
                    • Incorrect answers may lead to easier questions.
                  </li>

                  <li>
                    • The timer starts when you begin.
                  </li>

                  <li>
                    • The test submits automatically when time ends.
                  </li>

                </ul>

              </div>

              <button
                onClick={startTest}
                className="mt-8 w-full rounded-xl bg-slate-900 px-5 py-3.5 font-semibold text-white transition hover:bg-slate-800"
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
  // RESULT SCREEN
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

          <div className="card p-6 sm:p-8">

            <div className="text-center">

              <Trophy className="mx-auto h-10 w-10" />

              <p className="mt-4 text-sm text-slate-500">
                Adaptive Test Complete
              </p>

              <h1 className="mt-1 text-3xl font-bold">
                Lines & Angles
              </h1>

              <div className="mt-7 text-5xl font-bold">
                {score}
                <span className="text-2xl text-slate-400">
                  /15
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Time used: {formatTime(timeUsed)} / 20:00
              </p>

            </div>

          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">

            {skillResults.map((result) => {
              const assessment =
                getAssessment(result);

              const Icon =
                assessment === "strong"
                  ? CheckCircle2
                  : assessment === "developing"
                  ? RotateCcw
                  : XCircle;

              const label =
                assessment === "strong"
                  ? "Strong"
                  : assessment === "developing"
                  ? "Developing"
                  : "Needs Practice";

              return (
                <div
                  key={result.skill}
                  className="card p-5"
                >

                  <div className="flex items-center gap-2">

                    <Icon className="h-5 w-5" />

                    <span className="text-sm font-semibold">
                      {label}
                    </span>

                  </div>

                  <h2 className="mt-4 font-semibold">
                    {result.skill}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    {result.correct} correct out of{" "}
                    {result.total}
                  </p>

                  <div className="mt-3 text-2xl font-bold">
                    {result.percent}%
                  </div>

                </div>
              );
            })}

          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">

            <button
              onClick={restartTest}
              className="flex-1 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold hover:bg-slate-50"
            >
              Take Another Test
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
  // TEST SCREEN
  // =========================

  const warning =
    timeLeft <= 60
      ? "urgent"
      : timeLeft <= 300
      ? "warning"
      : "normal";

  return (
    <div className="min-h-screen bg-slate-50">

      {/* STICKY EXAM HEADER */}

      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">

          <div className="flex items-center justify-between gap-4">

            <div>

              <p className="text-xs font-medium text-slate-500">
                Lines & Angles
              </p>

              <p className="mt-1 text-sm font-semibold">
                Question {questionNumber} of{" "}
                {TOTAL_QUESTIONS}
              </p>

            </div>

            <div
              className={`rounded-xl px-4 py-2 text-center ${
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

              <div className="mt-0.5 text-[10px] text-slate-500">
                Time left
              </div>

            </div>

          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">

            <div
              className="h-full rounded-full bg-slate-900 transition-all"
              style={{
                width: `${
                  (answers.length /
                    TOTAL_QUESTIONS) *
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

            <div className="mb-6">

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">

                {currentQuestion.skill}

              </span>

            </div>

            <h1 className="text-xl font-semibold leading-8 sm:text-2xl">

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
              className="mt-8 w-full rounded-xl bg-slate-900 px-5 py-3.5 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {questionNumber === TOTAL_QUESTIONS
                ? "Finish Test"
                : "Submit Answer"}
            </button>

          </div>

        )}

      </main>

    </div>
  );
}