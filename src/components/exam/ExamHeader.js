"use client";

import { Clock3, Save } from "lucide-react";

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(secs).padStart(2, "0"),
  ].join(":");
}

export default function ExamHeader({
  exam,
  timeLeft,
  answeredCount,
  saving,
  onSave,
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {exam.subtitle}
          </p>

          <h1 className="text-xl font-bold sm:text-2xl">
            {exam.title}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            80 Marks · 2½ Hours · {answeredCount}/33 answered
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2">
            <Clock3 className="h-5 w-5" />

            <span className="font-bold tabular-nums">
              {formatTime(timeLeft)}
            </span>
          </div>

          <button
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />

            {saving ? "Saving..." : "Save Draft"}
          </button>
        </div>
      </div>
    </header>
  );
}