// // // "use client";
// // // import {useEffect,useMemo,useState} from "react";import Link from "next/link";import {ArrowRight,CalendarDays,CheckCircle2,Clock3,Target} from "lucide-react";import {exam,subjects} from "@/data/syllabus";import {getStatus,loadProgress,saveProgress} from "@/lib/progress";import ProgressBar from "@/components/ProgressBar";import SubjectCard from "@/components/SubjectCard";import TopBar from "@/components/TopBar";
// // // function daysLeft(d){return Math.max(0,Math.ceil((new Date(d+"T00:00:00")-new Date())/86400000))}
// // // export default function Home(){const[progress,setProgress]=useState({});const[mounted,setMounted]=useState(false);useEffect(()=>{setProgress(loadProgress());setMounted(true)},[]);useEffect(()=>{if(mounted)saveProgress(progress)},[progress,mounted]);
// // // const stats=useMemo(()=>{let total=0,prepared=0,learning=0,practice=0;const bySubject={};subjects.forEach(s=>{let p=0,l=0,n=0;s.topics.forEach((_,i)=>{total++;const st=getStatus(progress,s.id,i);if(st==="prepared"){prepared++;p++}if(st==="learning"){learning++;l++}if(st==="needs_practice"){practice++;n++}});bySubject[s.id]={prepared:p,remaining:s.topics.length-p,percent:Math.round(p/s.topics.length*100),learning:l,needsPractice:n}});return{total,prepared,learning,practice,percent:total?Math.round(prepared/total*100):0,bySubject}},[progress]);
// // // const attention=subjects.flatMap(s=>s.topics.map((topic,i)=>({s,topic,i,status:getStatus(progress,s.id,i)}))).filter(x=>x.status==="needs_practice"||x.status==="learning").slice(0,5);const remaining=subjects.flatMap(s=>s.topics.map((topic,i)=>({s,topic,i}))).filter(x=>getStatus(progress,x.s.id,x.i)==="not_started").slice(0,6);
// // // return <div className="min-h-screen bg-slate-50"><TopBar exam={exam}/><main className="mx-auto max-w-6xl px-4 py-6 sm:px-6"><div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]"><section className="card p-5 sm:p-6"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-slate-500">{exam.name}</p><h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Preparation overview</h1><p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">See what has been studied, what needs practice, and what is ready.</p></div><div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3"><Clock3 className="h-5 w-5 text-slate-500"/><div><div className="text-xl font-bold">{daysLeft(exam.date)}</div><div className="text-xs text-slate-500">days left</div></div></div></div><div className="mt-7"><div className="mb-2 flex items-end justify-between"><span className="text-sm font-semibold text-slate-700">Overall prepared</span><span className="text-2xl font-bold">{stats.percent}%</span></div><ProgressBar value={stats.percent} className="h-3"/><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500"><span><b className="text-slate-900">{stats.prepared}</b> prepared</span><span><b className="text-slate-900">{stats.learning}</b> learning</span><span><b className="text-slate-900">{stats.practice}</b> need practice</span><span><b className="text-slate-900">{stats.total-stats.prepared-stats.learning-stats.practice}</b> not started</span></div></div></section><section className="card p-5"><div className="flex items-center gap-2"><Target className="h-5 w-5"/><h2 className="font-semibold">What needs attention?</h2></div><div className="mt-4 space-y-3">{attention.length?attention.map(x=><Link key={`${x.s.id}-${x.i}`} href={`/subject/${x.s.id}`} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 hover:bg-slate-100"><div className="min-w-0"><div className="truncate text-sm font-medium">{x.topic}</div><div className="mt-0.5 text-xs text-slate-500">{x.s.short}</div></div><ArrowRight className="h-4 w-4 shrink-0 text-slate-400"/></Link>):<p className="text-sm text-slate-500">Nothing currently flagged.</p>}</div></section></div><section className="mt-7"><div className="mb-4"><h2 className="text-lg font-bold">Subjects</h2><p className="text-sm text-slate-500">Tap a subject to update preparation.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{subjects.map(s=><SubjectCard key={s.id} subject={s} stats={stats.bySubject[s.id]}/>)}</div></section><section className="mt-7 grid gap-5 lg:grid-cols-2"><div className="card p-5"><div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-600"/><h2 className="font-semibold">Recently prepared</h2></div><div className="mt-4 space-y-2">{subjects.flatMap(s=>s.topics.map((topic,i)=>({s,topic,i}))).filter(x=>getStatus(progress,x.s.id,x.i)==="prepared").slice(-5).reverse().map(x=><div key={`${x.s.id}-${x.i}`} className="flex justify-between gap-3 rounded-lg border border-slate-100 px-3 py-2.5 text-sm"><span className="truncate">{x.topic}</span><span className="shrink-0 text-xs text-emerald-600">Prepared</span></div>)}{!stats.prepared&&<p className="text-sm text-slate-500">No topics marked prepared yet.</p>}</div></div><div className="card p-5"><div className="flex items-center gap-2"><CalendarDays className="h-5 w-5"/><h2 className="font-semibold">Still to study</h2></div><div className="mt-4 space-y-2">{remaining.map(x=><div key={`${x.s.id}-${x.i}`} className="flex justify-between gap-3 rounded-lg border border-slate-100 px-3 py-2.5 text-sm"><span className="truncate">{x.topic}</span><span className="shrink-0 text-xs text-slate-400">{x.s.short}</span></div>)}{!remaining.length&&<p className="text-sm text-slate-500">Everything has been started.</p>}</div></div></section></main></div>}

// // "use client";

// // import { useEffect, useMemo, useState } from "react";
// // import Link from "next/link";
// // import {
// //   ArrowRight,
// //   CalendarDays,
// //   CheckCircle2,
// //   Clock3,
// //   Target,
// //   BrainCircuit,
// // } from "lucide-react";

// // import { exam, subjects } from "@/data/syllabus";
// // import { getStatus, loadProgress } from "@/lib/progress";

// // import ProgressBar from "@/components/ProgressBar";
// // import SubjectCard from "@/components/SubjectCard";
// // import TopBar from "@/components/TopBar";

// // function daysLeft(date) {
// //   return Math.max(
// //     0,
// //     Math.ceil(
// //       (new Date(date + "T00:00:00") - new Date()) / 86400000
// //     )
// //   );
// // }

// // export default function Home() {
// //   const [progress, setProgress] = useState({});
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     async function load() {
// //       const data = await loadProgress();
// //       setProgress(data);
// //       setLoading(false);
// //     }

// //     load();
// //   }, []);

// //   const stats = useMemo(() => {
// //     let total = 0;
// //     let prepared = 0;
// //     let learning = 0;
// //     let practice = 0;

// //     const bySubject = {};

// //     subjects.forEach((s) => {
// //       let p = 0;
// //       let l = 0;
// //       let n = 0;

// //       s.topics.forEach((_, i) => {
// //         total++;

// //         const status = getStatus(progress, s.id, i);

// //         if (status === "prepared") {
// //           prepared++;
// //           p++;
// //         }

// //         if (status === "learning") {
// //           learning++;
// //           l++;
// //         }

// //         if (status === "needs_practice") {
// //           practice++;
// //           n++;
// //         }
// //       });

// //       bySubject[s.id] = {
// //         prepared: p,
// //         remaining: s.topics.length - p,
// //         percent: Math.round(
// //           (p / s.topics.length) * 100
// //         ),
// //         learning: l,
// //         needsPractice: n,
// //       };
// //     });

// //     return {
// //       total,
// //       prepared,
// //       learning,
// //       practice,
// //       percent: total
// //         ? Math.round((prepared / total) * 100)
// //         : 0,
// //       bySubject,
// //     };
// //   }, [progress]);

// //   const attention = subjects
// //     .flatMap((s) =>
// //       s.topics.map((topic, i) => ({
// //         s,
// //         topic,
// //         i,
// //         status: getStatus(progress, s.id, i),
// //       }))
// //     )
// //     .filter(
// //       (x) =>
// //         x.status === "needs_practice" ||
// //         x.status === "learning"
// //     )
// //     .slice(0, 5);

// //   const remaining = subjects
// //     .flatMap((s) =>
// //       s.topics.map((topic, i) => ({
// //         s,
// //         topic,
// //         i,
// //       }))
// //     )
// //     .filter(
// //       (x) =>
// //         getStatus(progress, x.s.id, x.i) ===
// //         "not_started"
// //     )
// //     .slice(0, 6);

// //   if (loading) {
// //     return (
// //       <div className="flex min-h-screen items-center justify-center bg-slate-50">
// //         <div className="text-sm text-slate-500">
// //           Loading preparation...
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-slate-50">
// //       <TopBar exam={exam} />

// //       <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">

// //         {/* OVERVIEW */}
// //         <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">

// //           <section className="card p-5 sm:p-6">

// //             <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

// //               <div>
// //                 <p className="text-sm font-medium text-slate-500">
// //                   {exam.name}
// //                 </p>

// //                 <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
// //                   Preparation overview
// //                 </h1>

// //                 <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
// //                   See what has been studied, what needs practice,
// //                   and what is ready.
// //                 </p>
// //               </div>

// //               <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3">

// //                 <Clock3 className="h-5 w-5 text-slate-500" />

// //                 <div>
// //                   <div className="text-xl font-bold">
// //                     {daysLeft(exam.date)}
// //                   </div>

// //                   <div className="text-xs text-slate-500">
// //                     days left
// //                   </div>
// //                 </div>

// //               </div>

// //             </div>

// //             <div className="mt-7">

// //               <div className="mb-2 flex items-end justify-between">

// //                 <span className="text-sm font-semibold text-slate-700">
// //                   Overall prepared
// //                 </span>

// //                 <span className="text-2xl font-bold">
// //                   {stats.percent}%
// //                 </span>

// //               </div>

// //               <ProgressBar
// //                 value={stats.percent}
// //                 className="h-3"
// //               />

// //               <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">

// //                 <span>
// //                   <b className="text-slate-900">
// //                     {stats.prepared}
// //                   </b>{" "}
// //                   prepared
// //                 </span>

// //                 <span>
// //                   <b className="text-slate-900">
// //                     {stats.learning}
// //                   </b>{" "}
// //                   learning
// //                 </span>

// //                 <span>
// //                   <b className="text-slate-900">
// //                     {stats.practice}
// //                   </b>{" "}
// //                   need practice
// //                 </span>

// //                 <span>
// //                   <b className="text-slate-900">
// //                     {stats.total -
// //                       stats.prepared -
// //                       stats.learning -
// //                       stats.practice}
// //                   </b>{" "}
// //                   not started
// //                 </span>

// //               </div>

// //             </div>

// //           </section>

// //           {/* ATTENTION */}
// //           <section className="card p-5">

// //             <div className="flex items-center gap-2">

// //               <Target className="h-5 w-5" />

// //               <h2 className="font-semibold">
// //                 What needs attention?
// //               </h2>

// //             </div>

// //             <div className="mt-4 space-y-3">

// //               {attention.length ? (
// //                 attention.map((x) => (

// //                   <Link
// //                     key={`${x.s.id}-${x.i}`}
// //                     href={`/subject/${x.s.id}`}
// //                     className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 hover:bg-slate-100"
// //                   >

// //                     <div className="min-w-0">

// //                       <div className="truncate text-sm font-medium">
// //                         {x.topic}
// //                       </div>

// //                       <div className="mt-0.5 text-xs text-slate-500">
// //                         {x.s.short}
// //                       </div>

// //                     </div>

// //                     <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />

// //                   </Link>

// //                 ))
// //               ) : (
// //                 <p className="text-sm text-slate-500">
// //                   Nothing currently flagged.
// //                 </p>
// //               )}

// //             </div>

// //           </section>

// //         </div>

// //         {/* SUBJECTS */}
// //         <section className="mt-7">

// //           <div className="mb-4">

// //             <h2 className="text-lg font-bold">
// //               Subjects
// //             </h2>

// //             <p className="text-sm text-slate-500">
// //               Tap a subject to update preparation.
// //             </p>

// //           </div>

// //           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

// //             {subjects.map((subject) => (

// //               <SubjectCard
// //                 key={subject.id}
// //                 subject={subject}
// //                 stats={stats.bySubject[subject.id]}
// //               />

// //             ))}

// //           </div>

// //         </section>

// //                     <section className="mt-7">

// //             <div className="card overflow-hidden p-5 sm:p-6">

// //                 <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

// //                 <div className="flex items-start gap-4">

// //                     <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100">

// //                     <BrainCircuit className="h-6 w-6" />

// //                     </div>

// //                     <div>

// //                     <p className="text-sm font-medium text-slate-500">
// //                         Maths · Half-Yearly
// //                     </p>

// //                     <h2 className="mt-1 text-lg font-bold">
// //                         Lines & Angles Adaptive Test
// //                     </h2>

// //                     <p className="mt-1 text-sm text-slate-500">
// //                         15 questions · 20 minutes · Questions adapt to performance
// //                     </p>

// //                     </div>

// //                 </div>

// //                 <Link
// //                     href="/adaptive-test"
// //                     className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
// //                 >

// //                     Start Test

// //                     <ArrowRight className="h-4 w-4" />

// //                 </Link>

// //                 </div>

// //             </div>

// //             </section>

// //         {/* BOTTOM INFORMATION */}
// //         <section className="mt-7 grid gap-5 lg:grid-cols-2">

// //           {/* PREPARED */}
// //           <div className="card p-5">

// //             <div className="flex items-center gap-2">

// //               <CheckCircle2 className="h-5 w-5 text-emerald-600" />

// //               <h2 className="font-semibold">
// //                 Recently prepared
// //               </h2>

// //             </div>

// //             <div className="mt-4 space-y-2">

// //               {subjects
// //                 .flatMap((s) =>
// //                   s.topics.map((topic, i) => ({
// //                     s,
// //                     topic,
// //                     i,
// //                   }))
// //                 )
// //                 .filter(
// //                   (x) =>
// //                     getStatus(
// //                       progress,
// //                       x.s.id,
// //                       x.i
// //                     ) === "prepared"
// //                 )
// //                 .slice(-5)
// //                 .reverse()
// //                 .map((x) => (

// //                   <div
// //                     key={`${x.s.id}-${x.i}`}
// //                     className="flex justify-between gap-3 rounded-lg border border-slate-100 px-3 py-2.5 text-sm"
// //                   >

// //                     <span className="truncate">
// //                       {x.topic}
// //                     </span>

// //                     <span className="shrink-0 text-xs text-emerald-600">
// //                       Prepared
// //                     </span>

// //                   </div>

// //                 ))}

// //               {!stats.prepared && (
// //                 <p className="text-sm text-slate-500">
// //                   No topics marked prepared yet.
// //                 </p>
// //               )}

// //             </div>

// //           </div>

// //           {/* STILL TO STUDY */}
// //           <div className="card p-5">

// //             <div className="flex items-center gap-2">

// //               <CalendarDays className="h-5 w-5" />

// //               <h2 className="font-semibold">
// //                 Still to study
// //               </h2>

// //             </div>

// //             <div className="mt-4 space-y-2">

// //               {remaining.map((x) => (

// //                 <div
// //                   key={`${x.s.id}-${x.i}`}
// //                   className="flex justify-between gap-3 rounded-lg border border-slate-100 px-3 py-2.5 text-sm"
// //                 >

// //                   <span className="truncate">
// //                     {x.topic}
// //                   </span>

// //                   <span className="shrink-0 text-xs text-slate-400">
// //                     {x.s.short}
// //                   </span>

// //                 </div>

// //               ))}

// //               {!remaining.length && (
// //                 <p className="text-sm text-slate-500">
// //                   Everything has been started.
// //                 </p>
// //               )}

// //             </div>

// //           </div>

// //         </section>

// //       </main>
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import {
//   ArrowRight,
//   CalendarDays,
//   CheckCircle2,
//   Clock3,
//   Target,
//   BrainCircuit,
// } from "lucide-react";

// import { exam, subjects } from "@/data/syllabus";

// import {
//   getStatus,
//   loadProgress,
// } from "@/lib/progress";

// import ProgressBar from "@/components/ProgressBar";
// import SubjectCard from "@/components/SubjectCard";
// import TopBar from "@/components/TopBar";

// function daysLeft(date) {
//   return Math.max(
//     0,
//     Math.ceil(
//       (new Date(date + "T00:00:00") - new Date()) /
//         86400000
//     )
//   );
// }

// export default function Home() {
//   const [progress, setProgress] = useState({});
//   const [loading, setLoading] = useState(true);

//   // Load progress from Supabase
//   useEffect(() => {
//     async function fetchProgress() {
//       const data = await loadProgress();
//       setProgress(data);
//       setLoading(false);
//     }

//     fetchProgress();
//   }, []);

//   const stats = useMemo(() => {
//     let total = 0;
//     let prepared = 0;
//     let learning = 0;
//     let practice = 0;

//     const bySubject = {};

//     subjects.forEach((subject) => {
//       let subjectPrepared = 0;
//       let subjectLearning = 0;
//       let subjectPractice = 0;

//       subject.topics.forEach((_, index) => {
//         total++;

//         const status = getStatus(
//           progress,
//           subject.id,
//           index
//         );

//         if (status === "prepared") {
//           prepared++;
//           subjectPrepared++;
//         }

//         if (status === "learning") {
//           learning++;
//           subjectLearning++;
//         }

//         if (status === "needs_practice") {
//           practice++;
//           subjectPractice++;
//         }
//       });

//       bySubject[subject.id] = {
//         prepared: subjectPrepared,
//         remaining:
//           subject.topics.length - subjectPrepared,
//         percent: Math.round(
//           (subjectPrepared / subject.topics.length) * 100
//         ),
//         learning: subjectLearning,
//         needsPractice: subjectPractice,
//       };
//     });

//     return {
//       total,
//       prepared,
//       learning,
//       practice,
//       percent: total
//         ? Math.round((prepared / total) * 100)
//         : 0,
//       bySubject,
//     };
//   }, [progress]);

//   const attention = subjects
//     .flatMap((subject) =>
//       subject.topics.map((topic, index) => ({
//         subject,
//         topic,
//         index,
//         status: getStatus(
//           progress,
//           subject.id,
//           index
//         ),
//       }))
//     )
//     .filter(
//       (item) =>
//         item.status === "needs_practice" ||
//         item.status === "learning"
//     )
//     .slice(0, 5);

//   const remaining = subjects
//     .flatMap((subject) =>
//       subject.topics.map((topic, index) => ({
//         subject,
//         topic,
//         index,
//       }))
//     )
//     .filter(
//       (item) =>
//         getStatus(
//           progress,
//           item.subject.id,
//           item.index
//         ) === "not_started"
//     )
//     .slice(0, 6);

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <TopBar exam={exam} />

//       <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">

//         {loading && (
//           <div className="mb-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
//             Loading preparation progress...
//           </div>
//         )}

//         {/* TOP OVERVIEW */}
//         <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">

//           <section className="card p-5 sm:p-6">

//             <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

//               <div>
//                 <p className="text-sm font-medium text-slate-500">
//                   {exam.name}
//                 </p>

//                 <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
//                   Preparation overview
//                 </h1>

//                 <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
//                   See what has been studied, what needs practice,
//                   and what is ready.
//                 </p>
//               </div>

//               <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3">

//                 <Clock3 className="h-5 w-5 text-slate-500" />

//                 <div>
//                   <div className="text-xl font-bold">
//                     {daysLeft(exam.date)}
//                   </div>

//                   <div className="text-xs text-slate-500">
//                     days left
//                   </div>
//                 </div>

//               </div>
//             </div>

//             <div className="mt-7">

//               <div className="mb-2 flex items-end justify-between">

//                 <span className="text-sm font-semibold text-slate-700">
//                   Overall prepared
//                 </span>

//                 <span className="text-2xl font-bold">
//                   {stats.percent}%
//                 </span>

//               </div>

//               <ProgressBar
//                 value={stats.percent}
//                 className="h-3"
//               />

//               <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">

//                 <span>
//                   <b className="text-slate-900">
//                     {stats.prepared}
//                   </b>{" "}
//                   prepared
//                 </span>

//                 <span>
//                   <b className="text-slate-900">
//                     {stats.learning}
//                   </b>{" "}
//                   learning
//                 </span>

//                 <span>
//                   <b className="text-slate-900">
//                     {stats.practice}
//                   </b>{" "}
//                   need practice
//                 </span>

//                 <span>
//                   <b className="text-slate-900">
//                     {stats.total -
//                       stats.prepared -
//                       stats.learning -
//                       stats.practice}
//                   </b>{" "}
//                   not started
//                 </span>

//               </div>
//             </div>

//           </section>

//           {/* ATTENTION */}
//           <section className="card p-5">

//             <div className="flex items-center gap-2">
//               <Target className="h-5 w-5" />

//               <h2 className="font-semibold">
//                 What needs attention?
//               </h2>
//             </div>

//             <div className="mt-4 space-y-3">

//               {attention.length ? (
//                 attention.map((item) => (
//                   <Link
//                     key={`${item.subject.id}-${item.index}`}
//                     href={`/subject/${item.subject.id}`}
//                     className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 hover:bg-slate-100"
//                   >

//                     <div className="min-w-0">

//                       <div className="truncate text-sm font-medium">
//                         {item.topic}
//                       </div>

//                       <div className="mt-0.5 text-xs text-slate-500">
//                         {item.subject.short}
//                       </div>

//                     </div>

//                     <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />

//                   </Link>
//                 ))
//               ) : (
//                 <p className="text-sm text-slate-500">
//                   Nothing currently flagged.
//                 </p>
//               )}

//             </div>

//           </section>

//         </div>

//         {/* PRACTICE TESTS */}
//         <section className="mt-7">

//           <div className="mb-4">

//             <h2 className="text-lg font-bold">
//               Practice Tests
//             </h2>

//             <p className="text-sm text-slate-500">
//               Test understanding and identify areas
//               that need more practice.
//             </p>

//           </div>

//           <div className="grid gap-5 lg:grid-cols-2">

//             {/* MATHS TEST */}
//             <div className="card p-5 sm:p-6">

//               <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

//                 <div className="flex items-start gap-4">

//                   <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100">
//                     <Target className="h-6 w-6" />
//                   </div>

//                   <div>

//                     <p className="text-sm font-medium text-slate-500">
//                       Mathematics · Half-Yearly
//                     </p>

//                     <h2 className="mt-1 text-lg font-bold">
//                       Lines & Angles
//                     </h2>

//                     <p className="mt-1 text-sm leading-6 text-slate-500">
//                       15-question adaptive test with
//                       a timed exam experience.
//                     </p>

//                   </div>

//                 </div>

//                 <Link
//                   href="/adaptive-test"
//                   className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
//                 >
//                   Start Test
//                   <ArrowRight className="h-4 w-4" />
//                 </Link>

//               </div>

//             </div>

//             {/* ENGLISH GRAMMAR TEST */}
//             <div className="card p-5 sm:p-6">

//               <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

//                 <div className="flex items-start gap-4">

//                   <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100">
//                     <BrainCircuit className="h-6 w-6" />
//                   </div>

//                   <div>

//                     <p className="text-sm font-medium text-slate-500">
//                       English Grammar · Half-Yearly
//                     </p>

//                     <h2 className="mt-1 text-lg font-bold">
//                       Pronouns & Adjectives
//                     </h2>

//                     <p className="mt-1 text-sm leading-6 text-slate-500">
//                       75-question mastery bank ·
//                       15 questions per test ·
//                       20 minutes.
//                     </p>

//                   </div>

//                 </div>

//                 <Link
//                   href="/grammar-test"
//                   className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
//                 >
//                   Start Test
//                   <ArrowRight className="h-4 w-4" />
//                 </Link>

//               </div>

//             </div>

//           </div>
//         </section>

//         {/* SUBJECTS */}
//         <section className="mt-7">

//           <div className="mb-4">

//             <h2 className="text-lg font-bold">
//               Subjects
//             </h2>

//             <p className="text-sm text-slate-500">
//               Tap a subject to update preparation.
//             </p>

//           </div>

//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

//             {subjects.map((subject) => (
//               <SubjectCard
//                 key={subject.id}
//                 subject={subject}
//                 stats={stats.bySubject[subject.id]}
//               />
//             ))}

//           </div>

//         </section>

//         {/* RECENTLY PREPARED + STILL TO STUDY */}
//         <section className="mt-7 grid gap-5 lg:grid-cols-2">

//           <div className="card p-5">

//             <div className="flex items-center gap-2">

//               <CheckCircle2 className="h-5 w-5 text-emerald-600" />

//               <h2 className="font-semibold">
//                 Recently prepared
//               </h2>

//             </div>

//             <div className="mt-4 space-y-2">

//               {subjects
//                 .flatMap((subject) =>
//                   subject.topics.map((topic, index) => ({
//                     subject,
//                     topic,
//                     index,
//                   }))
//                 )
//                 .filter(
//                   (item) =>
//                     getStatus(
//                       progress,
//                       item.subject.id,
//                       item.index
//                     ) === "prepared"
//                 )
//                 .slice(-5)
//                 .reverse()
//                 .map((item) => (
//                   <div
//                     key={`${item.subject.id}-${item.index}`}
//                     className="flex justify-between gap-3 rounded-lg border border-slate-100 px-3 py-2.5 text-sm"
//                   >

//                     <span className="truncate">
//                       {item.topic}
//                     </span>

//                     <span className="shrink-0 text-xs text-emerald-600">
//                       Prepared
//                     </span>

//                   </div>
//                 ))}

//               {!stats.prepared && (
//                 <p className="text-sm text-slate-500">
//                   No topics marked prepared yet.
//                 </p>
//               )}

//             </div>

//           </div>

//           <div className="card p-5">

//             <div className="flex items-center gap-2">

//               <CalendarDays className="h-5 w-5" />

//               <h2 className="font-semibold">
//                 Still to study
//               </h2>

//             </div>

//             <div className="mt-4 space-y-2">

//               {remaining.map((item) => (
//                 <div
//                   key={`${item.subject.id}-${item.index}`}
//                   className="flex justify-between gap-3 rounded-lg border border-slate-100 px-3 py-2.5 text-sm"
//                 >

//                   <span className="truncate">
//                     {item.topic}
//                   </span>

//                   <span className="shrink-0 text-xs text-slate-400">
//                     {item.subject.short}
//                   </span>

//                 </div>
//               ))}

//               {!remaining.length && (
//                 <p className="text-sm text-slate-500">
//                   Everything has been started.
//                 </p>
//               )}

//             </div>

//           </div>

//         </section>

//       </main>
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Target,
} from "lucide-react";

import { exam, subjects } from "@/data/syllabus";
import { getStatus, loadProgress } from "@/lib/progress";

import ProgressBar from "@/components/ProgressBar";
import SubjectCard from "@/components/SubjectCard";
import TopBar from "@/components/TopBar";
import TestCard from "@/components/TestCard";

function daysLeft(date) {
  return Math.max(
    0,
    Math.ceil(
      (new Date(date + "T00:00:00") - new Date()) / 86400000
    )
  );
}

export default function Home() {
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await loadProgress();
      setProgress(data);
      setLoading(false);
    }

    load();
  }, []);

  const stats = useMemo(() => {
    let total = 0;
    let prepared = 0;
    let learning = 0;
    let practice = 0;

    const bySubject = {};

    subjects.forEach((subject) => {
      let subjectPrepared = 0;
      let subjectLearning = 0;
      let subjectPractice = 0;

      subject.topics.forEach((_, index) => {
        total++;

        const status = getStatus(
          progress,
          subject.id,
          index
        );

        if (status === "prepared") {
          prepared++;
          subjectPrepared++;
        }

        if (status === "learning") {
          learning++;
          subjectLearning++;
        }

        if (status === "needs_practice") {
          practice++;
          subjectPractice++;
        }
      });

      bySubject[subject.id] = {
        prepared: subjectPrepared,
        remaining: subject.topics.length - subjectPrepared,
        percent: Math.round(
          (subjectPrepared / subject.topics.length) * 100
        ),
        learning: subjectLearning,
        needsPractice: subjectPractice,
      };
    });

    return {
      total,
      prepared,
      learning,
      practice,
      percent: total
        ? Math.round((prepared / total) * 100)
        : 0,
      bySubject,
    };
  }, [progress]);

  const attention = subjects
    .flatMap((subject) =>
      subject.topics.map((topic, index) => ({
        subject,
        topic,
        index,
        status: getStatus(
          progress,
          subject.id,
          index
        ),
      }))
    )
    .filter(
      (item) =>
        item.status === "needs_practice" ||
        item.status === "learning"
    )
    .slice(0, 5);

  const remaining = subjects
    .flatMap((subject) =>
      subject.topics.map((topic, index) => ({
        subject,
        topic,
        index,
      }))
    )
    .filter(
      (item) =>
        getStatus(
          progress,
          item.subject.id,
          item.index
        ) === "not_started"
    )
    .slice(0, 6);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-sm text-slate-500">
          Loading preparation...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar exam={exam} />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {/* OVERVIEW */}
        <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <section className="card p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {exam.name}
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                  Preparation overview
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  See what has been studied, what needs practice,
                  and what is ready.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3">
                <Clock3 className="h-5 w-5 text-slate-500" />

                <div>
                  <div className="text-xl font-bold">
                    {daysLeft(exam.date)}
                  </div>

                  <div className="text-xs text-slate-500">
                    days left
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7">
              <div className="mb-2 flex items-end justify-between">
                <span className="text-sm font-semibold text-slate-700">
                  Overall prepared
                </span>

                <span className="text-2xl font-bold">
                  {stats.percent}%
                </span>
              </div>

              <ProgressBar
                value={stats.percent}
                className="h-3"
              />

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                <span>
                  <b className="text-slate-900">
                    {stats.prepared}
                  </b>{" "}
                  prepared
                </span>

                <span>
                  <b className="text-slate-900">
                    {stats.learning}
                  </b>{" "}
                  learning
                </span>

                <span>
                  <b className="text-slate-900">
                    {stats.practice}
                  </b>{" "}
                  need practice
                </span>

                <span>
                  <b className="text-slate-900">
                    {stats.total -
                      stats.prepared -
                      stats.learning -
                      stats.practice}
                  </b>{" "}
                  not started
                </span>
              </div>
            </div>
          </section>

          {/* ATTENTION */}
          <section className="card p-5">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5" />

              <h2 className="font-semibold">
                What needs attention?
              </h2>
            </div>

            <div className="mt-4 space-y-3">
              {attention.length ? (
                attention.map((item) => (
                  <Link
                    key={`${item.subject.id}-${item.index}`}
                    href={`/subject/${item.subject.id}`}
                    className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 hover:bg-slate-100"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">
                        {item.topic}
                      </div>

                      <div className="mt-0.5 text-xs text-slate-500">
                        {item.subject.short}
                      </div>
                    </div>

                    <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
                  </Link>
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  Nothing currently flagged.
                </p>
              )}
            </div>
          </section>
        </div>

        {/* SUBJECTS */}
        <section className="mt-7">
          <div className="mb-4">
            <h2 className="text-lg font-bold">
              Subjects
            </h2>

            <p className="text-sm text-slate-500">
              Tap a subject to update preparation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                stats={stats.bySubject[subject.id]}
              />
            ))}
          </div>
        </section>

        {/* PRACTICE TESTS */}
        <section className="mt-7">
          <div className="mb-4">
            <h2 className="text-lg font-bold">
              Practice Tests
            </h2>

            <p className="text-sm text-slate-500">
              Take adaptive tests and full question papers.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <TestCard
              subject="Mathematics"
              topic="Lines and Angles"
              title="Adaptive Test"
              description="Difficulty adapts based on answers"
              questions={15}
              marks={15}
              duration="20 minutes"
              href="/adaptive-test"
            />

            <TestCard
              subject="English Grammar"
              topic="Pronouns and Adjectives"
              title="Grammar Practice Test"
              description="Questions selected from the practice bank"
              questions={15}
              marks={15}
              duration="20 minutes"
              href="/grammar-test"
            />

            <TestCard
              subject="Science"
              topic="Physics · Half-Yearly"
              title="Full Question Paper"
              description="Measurement of Length and Motion & Beyond Earth"
              questions={33}
              marks={80}
              duration="2½ hours"
              href="/physics-test"
            />
          </div>
        </section>

        {/* BOTTOM INFORMATION */}
        <section className="mt-7 grid gap-5 lg:grid-cols-2">
          {/* RECENTLY PREPARED */}
          <div className="card p-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />

              <h2 className="font-semibold">
                Recently prepared
              </h2>
            </div>

            <div className="mt-4 space-y-2">
              {subjects
                .flatMap((subject) =>
                  subject.topics.map((topic, index) => ({
                    subject,
                    topic,
                    index,
                  }))
                )
                .filter(
                  (item) =>
                    getStatus(
                      progress,
                      item.subject.id,
                      item.index
                    ) === "prepared"
                )
                .slice(-5)
                .reverse()
                .map((item) => (
                  <div
                    key={`${item.subject.id}-${item.index}`}
                    className="flex justify-between gap-3 rounded-lg border border-slate-100 px-3 py-2.5 text-sm"
                  >
                    <span className="truncate">
                      {item.topic}
                    </span>

                    <span className="shrink-0 text-xs text-emerald-600">
                      Prepared
                    </span>
                  </div>
                ))}

              {!stats.prepared && (
                <p className="text-sm text-slate-500">
                  No topics marked prepared yet.
                </p>
              )}
            </div>
          </div>

          {/* STILL TO STUDY */}
          <div className="card p-5">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />

              <h2 className="font-semibold">
                Still to study
              </h2>
            </div>

            <div className="mt-4 space-y-2">
              {remaining.map((item) => (
                <div
                  key={`${item.subject.id}-${item.index}`}
                  className="flex justify-between gap-3 rounded-lg border border-slate-100 px-3 py-2.5 text-sm"
                >
                  <span className="truncate">
                    {item.topic}
                  </span>

                  <span className="shrink-0 text-xs text-slate-400">
                    {item.subject.short}
                  </span>
                </div>
              ))}

              {!remaining.length && (
                <p className="text-sm text-slate-500">
                  Everything has been started.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}