"use client";

export default function QuestionCard({
  question,
  answer,
  onChange,
}) {
  return (
    <div className="card p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-sm font-medium text-slate-500">
            Question {question.id}
          </span>

          <span className="ml-3 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {question.marks} mark{question.marks > 1 ? "s" : ""}
          </span>
        </div>

        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold">
          Section {question.section}
        </span>
      </div>

      <div className="mt-5 whitespace-pre-line text-base leading-7 text-slate-800">
        {question.question}
      </div>

      {question.type === "mcq" && (
        <div className="mt-6 space-y-3">
          {question.options.map((option) => (
            <label
              key={option}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                answer === option
                  ? "border-slate-900 bg-slate-50"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                checked={answer === option}
                onChange={() => onChange(option)}
              />

              <span className="text-sm font-medium">
                {option}
              </span>
            </label>
          ))}
        </div>
      )}

      {question.type === "fill" && (
        <input
          value={answer || ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Type your answer"
          className="mt-6 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-700"
        />
      )}

      {question.type === "textarea" && (
        <textarea
          value={answer || ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Write your answer here..."
          rows={12}
          className="mt-6 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 leading-6 outline-none focus:border-slate-700"
        />
      )}
    </div>
  );
}