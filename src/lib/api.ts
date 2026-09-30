import type { ExamFormValues } from "@/types/exam";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/+$/, "");

export async function generateExamPdf(values: ExamFormValues): Promise<Blob> {
  const fd = new FormData();

  fd.append("name", values.name);
  fd.append("year", values.year);
  fd.append("class_level", values.class_level);
  fd.append("subject_name", values.subject_name);
  fd.append("time", values.time);
  fd.append("marks", String(values.marks));
  fd.append("teacher_name", values.teacher_name);

  values.questions.forEach((q, i) => {
    fd.append(`questions[${i}][text]`, q.text ?? "");
    if (q.image instanceof File) {
      fd.append(`questions[${i}][image]`, q.image, q.image.name);
    }
  });

  const res = await fetch(`${API_URL}/generate`, { method: "POST", body: fd });
  if (!res.ok) throw new Error(await extractError(res));
  return res.blob();
}

async function extractError(res: Response): Promise<string> {
  if (res.status === 429)
    return "تم تجاوز حد الطلبات (5 طلبات كل 5 دقائق) — انتظر قليلاً ثم أعد المحاولة.";
  let detail = `تعذر توليد الاختبار (HTTP ${res.status}).`;
  try {
    const body = await res.json();
    const d = body?.detail;
    if (typeof d === "string") detail = d;
    else if (Array.isArray(d) && d.length) detail = d[0]?.msg ?? detail;
  } catch {
    /* not JSON */
  }
  return detail;
}

export function downloadBlob(blob: Blob, filename: string) {
  const safe = filename.replace(/[\\/:*?"<>|]/g, "-");
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = safe;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}