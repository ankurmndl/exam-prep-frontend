// import Link from "next/link";
// import {
//   ArrowRight,
//   CalendarDays,
//   Clock,
//   CheckCircle2,
//   FileText,
// } from "lucide-react";

// function formatDate(date) {
//   if (!date) return "—";

//   return new Intl.DateTimeFormat("en-IN", {
//     dateStyle: "medium",
//     timeStyle: "short",
//   }).format(new Date(date));
// }

// export default function AttemptCard({ attempt }) {
//   const isSubmitted = attempt.status === "submitted";

//   return (
//     <div className="card p-5">
//       <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
//         <div>
//           <div className="flex flex-wrap items-center gap-2">
//             <h2 className="font-bold">
//               {attempt.exam_title}
//             </h2>

//             <span
//               className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
//                 isSubmitted
//                   ? "bg-emerald-50 text-emerald-700"
//                   : "bg-amber-50 text-amber-700"
//               }`}
//             >
//               {isSubmitted ? "Submitted" : "In Progress"}
//             </span>
//           </div>

//           <p className="mt-1 text-sm text-slate-500">
//             {attempt.exam_key}
//           </p>
//         </div>

//         <div className="flex items-center gap-2 text-sm text-slate-500">
//           <FileText className="h-4 w-4" />
//           {attempt.total_marks} marks
//         </div>
//       </div>

//       <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
//         <div className="flex items-start gap-2">
//           <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

//           <div>
//             <div className="text-xs text-slate-400">
//               Started
//             </div>

//             <div className="mt-1 font-medium">
//               {formatDate(attempt.started_at)}
//             </div>
//           </div>
//         </div>

//         <div className="flex items-start gap-2">
//           <Clock className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

//           <div>
//             <div className="text-xs text-slate-400">
//               Submitted
//             </div>

//             <div className="mt-1 font-medium">
//               {attempt.submitted_at
//                 ? formatDate(attempt.submitted_at)
//                 : "Not submitted"}
//             </div>
//           </div>
//         </div>

//         <div className="flex items-start gap-2">
//           <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

//           <div>
//             <div className="text-xs text-slate-400">
//               Objective Score
//             </div>

//             <div className="mt-1 font-medium">
//               {attempt.objective_score} /{" "}
//               {attempt.objective_total}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-5 border-t border-slate-100 pt-4">
//         <Link
//           href={`/physics-test/results/${attempt.id}`}
//           className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:underline"
//         >
//           View Attempt
//           <ArrowRight className="h-4 w-4" />
//         </Link>
//       </div>
//     </div>
//   );
// }

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  CheckCircle2,
  FileText,
} from "lucide-react";

function formatDate(date) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function getResultUrl(attempt) {
  if (attempt.exam_key === "maths_half_yearly") {
    return `/maths-test/results/${attempt.id}`;
  }

  if (attempt.exam_key === "physics_half_yearly") {
    return `/physics-test/results/${attempt.id}`;
  }

  return "#";
}

export default function AttemptCard({ attempt }) {
  const isSubmitted = attempt.status === "submitted";

  return (
    <div className="card p-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-bold">
              {attempt.exam_title}
            </h2>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                isSubmitted
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {isSubmitted ? "Submitted" : "In Progress"}
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            {attempt.exam_key}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <FileText className="h-4 w-4" />
          {attempt.total_marks} marks
        </div>
      </div>

      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
        <div className="flex items-start gap-2">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

          <div>
            <div className="text-xs text-slate-400">
              Started
            </div>

            <div className="mt-1 font-medium">
              {formatDate(attempt.started_at)}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

          <div>
            <div className="text-xs text-slate-400">
              Submitted
            </div>

            <div className="mt-1 font-medium">
              {attempt.submitted_at
                ? formatDate(attempt.submitted_at)
                : "Not submitted"}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

          <div>
            <div className="text-xs text-slate-400">
              Objective Score
            </div>

            <div className="mt-1 font-medium">
              {attempt.objective_score} /{" "}
              {attempt.objective_total}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        {isSubmitted && getResultUrl(attempt) !== "#" ? (
          <Link
            href={getResultUrl(attempt)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:underline"
          >
            View Attempt
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className="text-sm font-medium text-slate-400">
            Attempt not submitted
          </span>
        )}
      </div>
    </div>
  );
}