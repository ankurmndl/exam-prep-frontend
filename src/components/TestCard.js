import Link from "next/link";
import { ArrowRight, BrainCircuit } from "lucide-react";

export default function TestCard({
  subject = "Science",
  topic,
  title,
  description,
  questions,
  marks,
  duration,
  href,
}) {
  return (
    <div className="card p-5 sm:p-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100">
            <BrainCircuit className="h-6 w-6" />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              {subject} · {topic}
            </p>

            <h2 className="mt-1 text-lg font-bold">
              {title}
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              {description} · {questions} questions · {marks} marks ·{" "}
              {duration}.
            </p>
          </div>
        </div>

        <Link
          href={href}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
        >
          Start Test
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}