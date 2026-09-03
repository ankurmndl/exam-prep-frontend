"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Send,
} from "lucide-react";

import {
  mathsExam,
  mathsQuestions,
} from "@/data/mathsQuestionPaper";

import {
  createExamAttempt,
  saveExamAttempt,
  submitExamAttempt,
} from "@/lib/examAttempts";

import ExamHeader from "@/components/exam/ExamHeader";
import QuestionCard from "@/components/exam/QuestionCard";
import QuestionNavigator from "@/components/exam/QuestionNavigator";

export default function MathsTestPage() {
  const router = useRouter();

  const [attemptId, setAttemptId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [timeLeft, setTimeLeft] = useState(
    mathsExam.durationMinutes * 60
  );

  // Create a new attempt when the paper starts
  useEffect(() => {
    async function startExam() {
      const attempt = await createExamAttempt(mathsExam);

      console.log("Created maths exam attempt:", attempt);

      if (attempt) {
        setAttemptId(attempt.id);
      }

      setLoading(false);
    }

    startExam();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (loading || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((current) =>
        Math.max(0, current - 1)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, timeLeft]);

  const answeredCount = useMemo(() => {
    return mathsQuestions.filter(
      (question) =>
        answers[question.id] &&
        String(answers[question.id]).trim() !== ""
    ).length;
  }, [answers]);

  function updateAnswer(value) {
    const questionId =
      mathsQuestions[activeQuestion].id;

    setAnswers((current) => ({
      ...current,
      [questionId]: value,
    }));
  }

  async function handleSave() {
    if (!attemptId) {
      alert("Exam attempt is still being prepared. Please wait.");
      return;
    }

    setSaving(true);

    const success = await saveExamAttempt(
      attemptId,
      answers
    );

    setSaving(false);

    if (success) {
      alert("Your answers have been saved.");
    } else {
      alert("Could not save your answers. Please try again.");
    }
  }

  function calculateObjectiveScore() {
    let score = 0;
    let total = 0;

    mathsQuestions.forEach((question) => {
      if (
        question.type === "mcq" ||
        question.type === "fill"
      ) {
        total += question.marks;

        const userAnswer = String(
          answers[question.id] || ""
        )
          .trim()
          .toLowerCase();

        const correctAnswers = [
          question.correctAnswer,
          ...(question.acceptableAnswers || []),
        ].map((answer) =>
          String(answer).trim().toLowerCase()
        );

        if (correctAnswers.includes(userAnswer)) {
          score += question.marks;
        }
      }
    });

    return { score, total };
  }

  async function handleSubmit() {
    if (!attemptId) {
      alert("Exam attempt is not ready yet. Please wait.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to submit this paper? You cannot continue editing after submission."
    );

    if (!confirmed) return;

    setSaving(true);

    const result = calculateObjectiveScore();

    const success = await submitExamAttempt(
      attemptId,
      answers,
      result.score,
      result.total
    );

    if (success) {
      router.push(
        `/maths-test/results/${attemptId}`
      );
    } else {
      setSaving(false);

      alert(
        "There was a problem submitting the paper. Please try again."
      );
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">
          Preparing your Maths question paper...
        </p>
      </div>
    );
  }

  const question = mathsQuestions[activeQuestion];

  return (
    <div className="min-h-screen bg-slate-50">
      <ExamHeader
        exam={mathsExam}
        timeLeft={timeLeft}
        answeredCount={answeredCount}
        saving={saving}
        onSave={handleSave}
      />

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_280px]">
        <div>
          <QuestionCard
            question={question}
            answer={answers[question.id]}
            onChange={updateAnswer}
          />

          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              onClick={() =>
                setActiveQuestion((current) =>
                  Math.max(0, current - 1)
                )
              }
              disabled={activeQuestion === 0}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 font-semibold disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>

            {activeQuestion <
            mathsQuestions.length - 1 ? (
              <button
                onClick={() =>
                  setActiveQuestion((current) =>
                    Math.min(
                      mathsQuestions.length - 1,
                      current + 1
                    )
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                Submit Paper
              </button>
            )}
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <QuestionNavigator
            questions={mathsQuestions}
            answers={answers}
            activeQuestion={activeQuestion}
            onSelect={setActiveQuestion}
          />

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            Submit Paper
          </button>
        </div>
      </main>
    </div>
  );
}