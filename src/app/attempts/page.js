"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ClipboardList,
  RefreshCw,
} from "lucide-react";

import { getExamAttempts } from "@/lib/examAttempts";
import AttemptCard from "@/components/attempts/AttemptCard";

export default function AttemptsPage() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadAttempts() {
    setLoading(true);

    const data = await getExamAttempts();

    setAttempts(data);

    setLoading(false);
  }

  useEffect(() => {
    loadAttempts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>

          <button
            onClick={loadAttempts}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw
              className={`h-4 w-4 ${
                loading ? "animate-spin" : ""
              }`}
            />
            Refresh
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
            <ClipboardList className="h-6 w-6" />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Examination History
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Exam Attempts
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              View all saved and submitted examination attempts.
            </p>
          </div>
        </div>

        <div className="mt-7 space-y-4">
          {loading ? (
            <div className="card p-8 text-center text-sm text-slate-500">
              Loading exam attempts...
            </div>
          ) : attempts.length === 0 ? (
            <div className="card p-8 text-center">
              <ClipboardList className="mx-auto h-8 w-8 text-slate-300" />

              <h2 className="mt-3 font-semibold">
                No exam attempts yet
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Attempts will appear here when an examination is started.
              </p>
            </div>
          ) : (
            attempts.map((attempt) => (
              <AttemptCard
                key={attempt.id}
                attempt={attempt}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}