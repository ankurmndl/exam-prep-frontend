// "use client";
// import {useEffect,useMemo,useState} from "react";import Link from "next/link";import {ArrowLeft,Check,Circle,RotateCcw,Save} from "lucide-react";import {subjects} from "@/data/syllabus";import {getStatus,loadProgress,saveProgress,STATUSES} from "@/lib/progress";import StatusBadge from "@/components/StatusBadge";import ProgressBar from "@/components/ProgressBar";
// const order=["not_started","learning","needs_practice","prepared"];
// export default function SubjectPage({params}){const subject=subjects.find(s=>s.id===params.id);const[progress,setProgress]=useState({});const[mounted,setMounted]=useState(false);useEffect(()=>{setProgress(loadProgress());setMounted(true)},[]);useEffect(()=>{if(mounted)saveProgress(progress)},[progress,mounted]);const stats=useMemo(()=>{const c={not_started:0,learning:0,needs_practice:0,prepared:0};if(subject)subject.topics.forEach((_,i)=>c[getStatus(progress,subject.id,i)]++);return c},[progress,subject]);if(!subject)return <div className="p-8">Subject not found.</div>;
// function cycle(i){const current=getStatus(progress,subject.id,i);const next=order[(order.indexOf(current)+1)%order.length];setProgress(p=>({...p,[`${subject.id}:${i}`]:next}))}
// return <div className="min-h-screen bg-slate-50"><header className="border-b border-slate-200 bg-white"><div className="mx-auto max-w-4xl px-4 py-4 sm:px-6"><Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"><ArrowLeft className="h-4 w-4"/>Dashboard</Link></div></header><main className="mx-auto max-w-4xl px-4 py-6 sm:px-6"><div className="card p-5 sm:p-6"><p className="text-sm text-slate-500">Half-Yearly Examination</p><h1 className="mt-1 text-2xl font-bold">{subject.name}</h1><p className="mt-2 text-sm text-slate-500">Click a topic to move through the four preparation states.</p><div className="mt-5 flex items-center gap-3"><ProgressBar value={stats.prepared/subject.topics.length*100} className="flex-1"/><b>{Math.round(stats.prepared/subject.topics.length*100)}%</b></div></div><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{Object.entries(STATUSES).map(([k,v])=><div key={k} className="card p-3"><div className="text-xs text-slate-500">{v.label}</div><div className="mt-1 text-xl font-bold">{stats[k]}</div></div>)}</div><div className="mt-5 card divide-y divide-slate-100">{subject.topics.map((topic,i)=>{const status=getStatus(progress,subject.id,i);return <button key={topic} onClick={()=>cycle(i)} className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-slate-50 sm:p-5"><div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${status==="prepared"?"bg-emerald-50 text-emerald-600":status==="learning"?"bg-blue-50 text-blue-600":status==="needs_practice"?"bg-amber-50 text-amber-600":"bg-slate-100 text-slate-400"}`}>{status==="prepared"?<Check className="h-5 w-5"/>:status==="learning"?<RotateCcw className="h-4 w-4"/>:<Circle className="h-4 w-4"/>}</div><div className="min-w-0 flex-1"><div className="font-medium">{topic}</div><div className="mt-1 text-xs text-slate-400">Tap to change status</div></div><StatusBadge status={status}/></button>})}</div><div className="mt-5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-500"><Save className="mr-1 inline h-4 w-4"/>Saved automatically in this browser. Supabase can replace this later.</div></main></div>}

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  Circle,
  RotateCcw,
  Save,
} from "lucide-react";
import Link from "next/link";

import { subjects } from "@/data/syllabus";
import {
  getStatus,
  loadProgress,
  saveTopicProgress,
  STATUSES,
} from "@/lib/progress";

import StatusBadge from "@/components/StatusBadge";
import ProgressBar from "@/components/ProgressBar";

const order = [
  "not_started",
  "learning",
  "needs_practice",
  "prepared",
];

export default function SubjectPage({ params }) {

  const subject = subjects.find(
    (s) => s.id === params.id
  );

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

    const counts = {
      not_started: 0,
      learning: 0,
      needs_practice: 0,
      prepared: 0,
    };

    if (subject) {

      subject.topics.forEach((_, i) => {

        const status = getStatus(
          progress,
          subject.id,
          i
        );

        counts[status]++;
      });

    }

    return counts;

  }, [progress, subject]);

  if (!subject) {

    return (
      <div className="p-8">
        Subject not found.
      </div>
    );

  }

  async function cycle(index) {

    const current = getStatus(
      progress,
      subject.id,
      index
    );

    const currentIndex = order.indexOf(current);

    const next =
      order[(currentIndex + 1) % order.length];

    // Update UI immediately
    setProgress((previous) => ({
      ...previous,
      [`${subject.id}:${index}`]: next,
    }));

    // Save to Supabase
    const saved = await saveTopicProgress(
      subject.id,
      index,
      next
    );

    if (!saved) {

      // If database save fails,
      // reload the previous server state.
      const latest = await loadProgress();

      setProgress(latest);

      alert(
        "Could not save the change. Please check your Supabase connection."
      );
    }
  }

  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">

        <div className="text-sm text-slate-500">
          Loading preparation...
        </div>

      </div>
    );

  }

  const percentage = Math.round(
    (stats.prepared / subject.topics.length) * 100
  );

  return (

    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
          >

            <ArrowLeft className="h-4 w-4" />

            Dashboard

          </Link>

        </div>

      </header>

      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">

        {/* SUBJECT HEADER */}

        <div className="card p-5 sm:p-6">

          <p className="text-sm text-slate-500">
            Half-Yearly Examination
          </p>

          <h1 className="mt-1 text-2xl font-bold">
            {subject.name}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Tap a topic to move through the four
            preparation states.
          </p>

          <div className="mt-5 flex items-center gap-3">

            <ProgressBar
              value={percentage}
              className="flex-1"
            />

            <b>
              {percentage}%
            </b>

          </div>

        </div>

        {/* STATUS COUNTERS */}

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">

          {Object.entries(STATUSES).map(
            ([key, value]) => (

              <div
                key={key}
                className="card p-3"
              >

                <div className="text-xs text-slate-500">
                  {value.label}
                </div>

                <div className="mt-1 text-xl font-bold">
                  {stats[key]}
                </div>

              </div>

            )
          )}

        </div>

        {/* TOPICS */}

        <div className="mt-5 card divide-y divide-slate-100">

          {subject.topics.map(
            (topic, index) => {

              const status = getStatus(
                progress,
                subject.id,
                index
              );

              return (

                <button
                  key={topic}
                  onClick={() => cycle(index)}
                  className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-slate-50 sm:p-5"
                >

                  {/* ICON */}

                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      status === "prepared"
                        ? "bg-emerald-50 text-emerald-600"
                        : status === "learning"
                        ? "bg-blue-50 text-blue-600"
                        : status === "needs_practice"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >

                    {status === "prepared" ? (

                      <Check className="h-5 w-5" />

                    ) : status === "learning" ? (

                      <RotateCcw className="h-4 w-4" />

                    ) : (

                      <Circle className="h-4 w-4" />

                    )}

                  </div>

                  {/* TOPIC */}

                  <div className="min-w-0 flex-1">

                    <div className="font-medium">
                      {topic}
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      Tap to change status
                    </div>

                  </div>

                  {/* STATUS */}

                  <StatusBadge
                    status={status}
                  />

                </button>

              );

            }
          )}

        </div>

        {/* SAVE INFO */}

        <div className="mt-5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-500">

          <Save className="mr-1 inline h-4 w-4" />

          Saved to Supabase automatically.

        </div>

      </main>

    </div>

  );

}