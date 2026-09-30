// import type { ExamFormValues } from "@/schemas/exam-schema";

import { ExamFormValues } from "@/types/exam";

const KEY = "exam-draft";

export function emptyExam(): ExamFormValues {
  return {
    name: "",
    year: "",
    class_level: "",
    subject_name: "",
    time: "",
    marks: "20",
    teacher_name: "",
    questions: [{ text: "", image: null }],
  };
}

export function loadDraft(): ExamFormValues {
  if (typeof window === "undefined") return emptyExam();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyExam();
    const parsed = JSON.parse(raw) as Partial<ExamFormValues>;
    return {
      ...emptyExam(),
      ...parsed,
      questions:
        Array.isArray(parsed.questions) && parsed.questions.length
          ? parsed.questions.map((q) => ({ text: typeof q?.text === "string" ? q.text : "", image: null }))
          : [{ text: "", image: null }],
    };
  } catch {
    return emptyExam();
  }
}

export function saveDraft(v: ExamFormValues) {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        ...v,
        questions: v.questions?.map((q) => ({ text: q.text, image: null })) ?? [], // Files aren't serializable
      })
    );
  } catch {
    /* quota etc. */
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}