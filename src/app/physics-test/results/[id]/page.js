"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileText,
} from "lucide-react";

import {
  physicsExam,
  physicsQuestions,
} from "@/data/physicsQuestionPaper";

import { getExamAttempt } from "@/lib/examAttempts";

export default function PhysicsResultPage({ params }) {
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAttempt() {
      const data = await getExamAttempt(params.id);

      setAttempt(data);
      setLoading(false);
    }

    loadAttempt();
  }, [params.id]);

  const answeredCount = useMemo(() => {
    if (!attempt) return 0;

    return physicsQuestions.filter(
      (question) =>
        attempt.answers?.[question.id] &&
        String(
          attempt.answers[question.id]
        ).trim() !== ""
    ).length;
  }, [attempt]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading result...
      </div>
    );
  }

  if (!attempt) {
    return (
      <div className="p-8">
        Exam attempt not found.
      </div>
    );
  }

  const percentage =
    attempt.objective_total > 0
      ? Math.round(
          (attempt.objective_score /
            attempt.objective_total) *
            100
        )
      : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <section className="card p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Paper submitted
              </p>

              <h1 className="text-2xl font-bold">
                {physicsExam.title}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {physicsExam.subtitle}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-sm text-slate-500">
                Questions answered
              </div>

              <div className="mt-1 text-2xl font-bold">
                {answeredCount}/33
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-sm text-slate-500">
                Objective score
              </div>

              <div className="mt-1 text-2xl font-bold">
                {attempt.objective_score}/
                {attempt.objective_total}
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-sm text-slate-500">
                Objective accuracy
              </div>

              <div className="mt-1 text-2xl font-bold">
                {percentage}%
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2 border-t border-slate-100 pt-5 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4" />

              Started:{" "}
              {new Date(
                attempt.started_at
              ).toLocaleString()}
            </div>

            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />

              Submitted:{" "}
              {attempt.submitted_at
                ? new Date(
                    attempt.submitted_at
                  ).toLocaleString()
                : "Not submitted"}
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="mb-4 text-lg font-bold">
            Answers submitted
          </h2>

          <div className="space-y-4">
            {physicsQuestions.map((question) => (
              <div
                key={question.id}
                className="card p-5"
              >
                <div className="flex justify-between gap-4">
                  <span className="font-semibold">
                    Question {question.id}
                  </span>

                  <span className="text-sm text-slate-500">
                    {question.marks} marks
                  </span>
                </div>

                <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">
                  {question.question}
                </p>

                <div className="mt-4 rounded-xl bg-slate-50 p-4">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Answer
                  </div>

                  <p className="whitespace-pre-line text-sm leading-6">
                    {attempt.answers?.[question.id] ||
                      "No answer submitted"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}