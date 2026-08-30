"use client";

export default function QuestionNavigator({
  questions,
  answers,
  activeQuestion,
  onSelect,
}) {
  return (
    <aside className="card p-4">
      <h2 className="font-semibold">
        Questions
      </h2>

      <p className="mt-1 text-xs text-slate-500">
        Click a number to jump to a question.
      </p>

      <div className="mt-4 grid grid-cols-5 gap-2">
        {questions.map((question, index) => {
          const answered =
            answers[question.id]?.trim?.() ||
            answers[question.id];

          return (
            <button
              key={question.id}
              onClick={() => onSelect(index)}
              className={`aspect-square rounded-lg text-sm font-semibold transition ${
                index === activeQuestion
                  ? "bg-slate-900 text-white"
                  : answered
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {question.id}
            </button>
          );
        })}
      </div>

      <div className="mt-4 space-y-2 text-xs text-slate-500">
        <div>⬛ Current question</div>
        <div>🟢 Answered</div>
        <div>⬜ Not answered</div>
      </div>
    </aside>
  );
}