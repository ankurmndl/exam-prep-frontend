// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   ArrowLeft,
//   ArrowRight,
//   Send,
// } from "lucide-react";

// import {
//   physicsExam,
//   physicsQuestions,
// } from "@/data/physicsQuestionPaper";

// import {
//   createExamAttempt,
//   saveExamAttempt,
//   submitExamAttempt,
// } from "@/lib/examAttempts";

// import ExamHeader from "@/components/exam/ExamHeader";
// import QuestionCard from "@/components/exam/QuestionCard";
// import QuestionNavigator from "@/components/exam/QuestionNavigator";

// export default function PhysicsTestPage() {
//   const router = useRouter();

//   const [attemptId, setAttemptId] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [activeQuestion, setActiveQuestion] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [timeLeft, setTimeLeft] = useState(
//     physicsExam.durationMinutes * 60
//   );

//   // Create a new attempt in Supabase when exam starts
//   useEffect(() => {
//     async function startExam() {
//       const attempt = await createExamAttempt(physicsExam);

//       if (attempt) {
//         setAttemptId(attempt.id);
//       }

//       setLoading(false);
//     }

//     startExam();
//   }, []);

//   // Countdown timer
//   useEffect(() => {
//     if (loading || timeLeft <= 0) return;

//     const timer = setInterval(() => {
//       setTimeLeft((current) =>
//         Math.max(0, current - 1)
//       );
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [loading, timeLeft]);

//   const answeredCount = useMemo(() => {
//     return physicsQuestions.filter(
//       (question) =>
//         answers[question.id] &&
//         String(answers[question.id]).trim() !== ""
//     ).length;
//   }, [answers]);

//   function updateAnswer(value) {
//     const questionId =
//       physicsQuestions[activeQuestion].id;

//     setAnswers((current) => ({
//       ...current,
//       [questionId]: value,
//     }));
//   }

//   async function handleSave() {
//     if (!attemptId) return;

//     setSaving(true);

//     await saveExamAttempt(
//       attemptId,
//       answers
//     );

//     setSaving(false);
//   }

//   function calculateObjectiveScore() {
//     let score = 0;
//     let total = 0;

//     physicsQuestions.forEach((question) => {
//       if (
//         question.type === "mcq" ||
//         question.type === "fill"
//       ) {
//         total += question.marks;

//         const userAnswer = String(
//           answers[question.id] || ""
//         )
//           .trim()
//           .toLowerCase();

//         const correctAnswers = [
//           question.correctAnswer,
//           ...(question.acceptableAnswers || []),
//         ].map((answer) =>
//           String(answer).trim().toLowerCase()
//         );

//         if (
//           correctAnswers.includes(userAnswer)
//         ) {
//           score += question.marks;
//         }
//       }
//     });

//     return { score, total };
//   }

//   async function handleSubmit() {
//     if (!attemptId) return;

//     const confirmed = window.confirm(
//       "Are you sure you want to submit this paper? You cannot continue editing after submission."
//     );

//     if (!confirmed) return;

//     setSaving(true);

//     const result = calculateObjectiveScore();

//     const success =
//       await submitExamAttempt(
//         attemptId,
//         answers,
//         result.score,
//         result.total
//       );

//     if (success) {
//       router.push(
//         `/physics-test/results/${attemptId}`
//       );
//     } else {
//       setSaving(false);
//       alert(
//         "There was a problem submitting the paper. Please try again."
//       );
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-50">
//         <p className="text-slate-500">
//           Preparing your question paper...
//         </p>
//       </div>
//     );
//   }

//   const question =
//     physicsQuestions[activeQuestion];

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <ExamHeader
//         exam={physicsExam}
//         timeLeft={timeLeft}
//         answeredCount={answeredCount}
//         saving={saving}
//         onSave={handleSave}
//       />

//       <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[1fr_280px] sm:px-6">
//         <div>
//           <QuestionCard
//             question={question}
//             answer={answers[question.id]}
//             onChange={updateAnswer}
//           />

//           <div className="mt-5 flex items-center justify-between gap-3">
//             <button
//               onClick={() =>
//                 setActiveQuestion((current) =>
//                   Math.max(0, current - 1)
//                 )
//               }
//               disabled={activeQuestion === 0}
//               className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 font-semibold disabled:opacity-40"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               Previous
//             </button>

//             {activeQuestion <
//             physicsQuestions.length - 1 ? (
//               <button
//                 onClick={() =>
//                   setActiveQuestion((current) =>
//                     Math.min(
//                       physicsQuestions.length - 1,
//                       current + 1
//                     )
//                   )
//                 }
//                 className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white"
//               >
//                 Next
//                 <ArrowRight className="h-4 w-4" />
//               </button>
//             ) : (
//               <button
//                 onClick={handleSubmit}
//                 disabled={saving}
//                 className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white disabled:opacity-50"
//               >
//                 <Send className="h-4 w-4" />
//                 Submit Paper
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="lg:sticky lg:top-28 lg:self-start">
//           <QuestionNavigator
//             questions={physicsQuestions}
//             answers={answers}
//             activeQuestion={activeQuestion}
//             onSelect={setActiveQuestion}
//           />

//           <button
//             onClick={handleSubmit}
//             disabled={saving}
//             className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white disabled:opacity-50"
//           >
//             <Send className="h-4 w-4" />
//             Submit Paper
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Send,
} from "lucide-react";

import {
  physicsExam,
  physicsQuestions,
} from "@/data/physicsQuestionPaper";

import {
  createExamAttempt,
  saveExamAttempt,
  submitExamAttempt,
} from "@/lib/examAttempts";

import ExamHeader from "@/components/exam/ExamHeader";
import QuestionCard from "@/components/exam/QuestionCard";
import QuestionNavigator from "@/components/exam/QuestionNavigator";

export default function PhysicsTestPage() {
  const router = useRouter();

  const [attemptId, setAttemptId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [startError, setStartError] = useState("");

  const [timeLeft, setTimeLeft] = useState(
    physicsExam.durationMinutes * 60
  );

  // Create a new attempt in Supabase when exam starts
  useEffect(() => {
    async function startExam() {
      try {
        setStartError("");

        const attempt = await createExamAttempt(physicsExam);

        console.log("Created exam attempt:", attempt);

        if (!attempt || !attempt.id) {
          setStartError(
            "Could not create your exam attempt in Supabase."
          );
          return;
        }

        setAttemptId(attempt.id);
      } catch (error) {
        console.error("Error creating exam attempt:", error);

        setStartError(
          "Could not connect to Supabase to start this exam."
        );
      } finally {
        setLoading(false);
      }
    }

    startExam();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (loading || !attemptId || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, attemptId, timeLeft]);

  const answeredCount = useMemo(() => {
    return physicsQuestions.filter(
      (question) =>
        answers[question.id] &&
        String(answers[question.id]).trim() !== ""
    ).length;
  }, [answers]);

  function updateAnswer(value) {
    const questionId =
      physicsQuestions[activeQuestion].id;

    setAnswers((current) => ({
      ...current,
      [questionId]: value,
    }));
  }

  async function handleSave() {
    if (!attemptId) {
      alert(
        "The exam attempt has not been created yet. Please refresh the page."
      );
      return;
    }

    try {
      setSaving(true);

      const success = await saveExamAttempt(
        attemptId,
        answers
      );

      console.log("Save result:", success);

      if (success === false) {
        alert(
          "Answers could not be saved. Please try again."
        );
      }
    } catch (error) {
      console.error("Save error:", error);

      alert(
        "There was a problem saving your answers."
      );
    } finally {
      setSaving(false);
    }
  }

  function calculateObjectiveScore() {
    let score = 0;
    let total = 0;

    physicsQuestions.forEach((question) => {
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
    console.log("Submit clicked");
    console.log("Attempt ID:", attemptId);
    console.log("Answers:", answers);

    if (!attemptId) {
      alert(
        "Your exam attempt was not created in Supabase, so the paper cannot be submitted. Please refresh and try again."
      );
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to submit this paper?\n\nYou have answered ${answeredCount} out of ${physicsQuestions.length} questions.\n\nYou cannot continue editing after submission.`
    );

    if (!confirmed) return;

    try {
      setSaving(true);

      // Save latest answers first
      const saveSuccess = await saveExamAttempt(
        attemptId,
        answers
      );

      console.log(
        "Final answer save result:",
        saveSuccess
      );

      if (saveSuccess === false) {
        alert(
          "Your latest answers could not be saved. The paper was not submitted."
        );
        return;
      }

      const result = calculateObjectiveScore();

      console.log("Objective score:", result);

      const success = await submitExamAttempt(
        attemptId,
        answers,
        result.score,
        result.total
      );

      console.log("Submit result:", success);

      if (success) {
        router.push(
          `/physics-test/results/${attemptId}`
        );
        return;
      }

      alert(
        "There was a problem submitting the paper. Please try again."
      );
    } catch (error) {
      console.error("Submit error:", error);

      alert(
        "There was a problem submitting the paper. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">
          Preparing your question paper...
        </p>
      </div>
    );
  }

  if (startError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="card max-w-md p-6 text-center">
          <h1 className="text-lg font-bold">
            Unable to start exam
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {startError}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const question =
    physicsQuestions[activeQuestion];

  return (
    <div className="min-h-screen bg-slate-50">
      <ExamHeader
        exam={physicsExam}
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
            physicsQuestions.length - 1 ? (
              <button
                onClick={() =>
                  setActiveQuestion((current) =>
                    Math.min(
                      physicsQuestions.length - 1,
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
                disabled={saving || !attemptId}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                {saving ? "Submitting..." : "Submit Paper"}
              </button>
            )}
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <QuestionNavigator
            questions={physicsQuestions}
            answers={answers}
            activeQuestion={activeQuestion}
            onSelect={setActiveQuestion}
          />

          <button
            onClick={handleSubmit}
            disabled={saving || !attemptId}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {saving ? "Submitting..." : "Submit Paper"}
          </button>

          {!attemptId && (
            <p className="mt-2 text-center text-xs text-red-500">
              Waiting for exam attempt to be created...
            </p>
          )}
        </div>
      </main>
    </div>
  );
}