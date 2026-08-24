// // const KEY="exam-prep-progress-v1";
// // export const STATUSES={not_started:{label:"Not Started",symbol:"☐"},learning:{label:"Learning",symbol:"◐"},needs_practice:{label:"Needs Practice",symbol:"🟡"},prepared:{label:"Prepared",symbol:"✓"}};
// // export function loadProgress(){if(typeof window==="undefined")return{};try{return JSON.parse(localStorage.getItem(KEY)||"{}")}catch{return{}}}
// // export function saveProgress(p){if(typeof window!=="undefined")localStorage.setItem(KEY,JSON.stringify(p))}
// // export function getStatus(p,s,i){return p[`${s}:${i}`]||"not_started"}

// import { supabase } from "./supabase";

// export const STATUSES = {
//   not_started: { label: "Not Started", symbol: "☐" },
//   learning: { label: "Learning", symbol: "◐" },
//   needs_practice: { label: "Needs Practice", symbol: "🟡" },
//   prepared: { label: "Prepared", symbol: "✓" },
// };

// const STUDENT_ID = "son";

// export async function loadProgress() {
//   const { data, error } = await supabase
//     .from("progress")
//     .select("subject_id, topic_index, status")
//     .eq("student_id", STUDENT_ID);

//   if (error) {
//     console.error("Error loading progress:", error);
//     return {};
//   }

//   const result = {};

//   data.forEach((row) => {
//     result[`${row.subject_id}:${row.topic_index}`] = row.status;
//   });

//   return result;
// }

// export async function saveTopicProgress(subjectId, topicIndex, status) {
//   const { error } = await supabase
//     .from("progress")
//     .upsert(
//       {
//         student_id: STUDENT_ID,
//         subject_id: subjectId,
//         topic_index: topicIndex,
//         status,
//         updated_at: new Date().toISOString(),
//       },
//       {
//         onConflict: "student_id,subject_id,topic_index",
//       }
//     );

//   if (error) {
//     console.error("Error saving progress:", error);
//     return false;
//   }

//   return true;
// }

// export function getStatus(progress, subjectId, topicIndex) {
//   return progress[`${subjectId}:${topicIndex}`] || "not_started";
// }

import { supabase } from "./supabase";

export const STATUSES = {
  not_started: {
    label: "Not Started",
    symbol: "☐",
  },
  learning: {
    label: "Learning",
    symbol: "◐",
  },
  needs_practice: {
    label: "Needs Practice",
    symbol: "🟡",
  },
  prepared: {
    label: "Prepared",
    symbol: "✓",
  },
};

const STUDENT_ID = "son";

export async function loadProgress() {
  const { data, error } = await supabase
    .from("progress")
    .select("subject_id, topic_index, status")
    .eq("student_id", STUDENT_ID);

  if (error) {
    console.error("Error loading progress:", error);
    return {};
  }

  const result = {};

  data.forEach((row) => {
    result[`${row.subject_id}:${row.topic_index}`] = row.status;
  });

  return result;
}

export async function saveTopicProgress(subjectId, topicIndex, status) {
  const { error } = await supabase
    .from("progress")
    .upsert(
      {
        student_id: STUDENT_ID,
        subject_id: subjectId,
        topic_index: topicIndex,
        status,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "student_id,subject_id,topic_index",
      }
    );

  if (error) {
    console.error("Error saving progress:", error);
    return false;
  }

  return true;
}

export function getStatus(progress, subjectId, topicIndex) {
  return progress[`${subjectId}:${topicIndex}`] || "not_started";
}