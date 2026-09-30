"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { GenerateExamValues } from "@/schema/generate-exam-schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export default function SubmitExam() {
  const { handleSubmit } = useFormContext<GenerateExamValues>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: GenerateExamValues) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();

      // Top-level exam fields, matching FastAPI Form(...) parameter names.
      formData.append("name", data.name);
      formData.append("year", data.year);
      formData.append("class_level", data.classLevel);
      formData.append("subject_name", data.subject);
      formData.append("time", data.time);
      formData.append("marks", String(data.marks));
      formData.append("teacher_name", data.teacherName);

      // Indexed question fields: questions[i][text] and questions[i][image].
      data.questions.forEach((question, index) => {
        formData.append(`questions[${index}][text]`, question.text);
        if (question.image) {
          formData.append(`questions[${index}][image]`, question.image);
        }
      });

      const response = await fetch(`${API_URL}/generate`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let message = `فشل إنشاء الاختبار (${response.status})`;
        try {
          const errorBody = await response.json();
          if (errorBody?.detail) {
            message =
              typeof errorBody.detail === "string"
                ? errorBody.detail
                : JSON.stringify(errorBody.detail);
          }
        } catch {
          // Non-JSON error body, keep the default message.
        }
        throw new Error(message);
      }

      // Backend returns a PDF stream.
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${data.name}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
      setSuccess(true);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "فشل إرسال الاختبار"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {error && (
        <div className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300 sm:px-4 sm:py-3 sm:text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-md border border-[#00ffbf]/40 bg-[#00ffbf]/10 px-3 py-2 text-xs text-[#00ffbf] sm:px-4 sm:py-3 sm:text-sm">
          تم إنشاء الاختبار وتنزيل الملف بنجاح.
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit(onSubmit)}
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-md bg-[#00ffbf] px-4 py-2.5 text-xs font-bold text-[#0b1220] transition-colors hover:bg-[#00e6ac] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-6 sm:py-3 sm:text-sm"
      >
        {loading ? "جاري الإرسال..." : "إنشاء الاختبار"}
      </button>
    </div>
  );
}