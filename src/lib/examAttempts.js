import { supabase } from "./supabase";

const STUDENT_ID = "son";

export async function createExamAttempt(exam) {
  const { data, error } = await supabase
    .from("exam_attempts")
    .insert({
      student_id: STUDENT_ID,
      exam_key: exam.key,
      exam_title: exam.title,
      total_marks: exam.totalMarks,
      status: "in_progress",
      answers: {},
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating exam attempt:", error);
    return null;
  }

  return data;
}

export async function saveExamAttempt(attemptId, answers) {
  const { error } = await supabase
    .from("exam_attempts")
    .update({
      answers,
      updated_at: new Date().toISOString(),
    })
    .eq("id", attemptId);

  if (error) {
    console.error("Error saving exam attempt:", error);
    return false;
  }

  return true;
}

export async function submitExamAttempt(
  attemptId,
  answers,
  objectiveScore,
  objectiveTotal
) {
  const { error } = await supabase
    .from("exam_attempts")
    .update({
      answers,
      objective_score: objectiveScore,
      objective_total: objectiveTotal,
      status: "submitted",
      submitted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", attemptId);

  if (error) {
    console.error("Error submitting exam:", error);
    return false;
  }

  return true;
}

export async function getExamAttempt(attemptId) {
  const { data, error } = await supabase
    .from("exam_attempts")
    .select("*")
    .eq("id", attemptId)
    .single();

  if (error) {
    console.error("Error loading exam attempt:", error);
    return null;
  }

  return data;
}