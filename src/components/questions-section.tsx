"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import QuestionCard from "./question-card";
import type { GenerateExamValues } from "@/schema/generate-exam-schema";

export default function QuestionsSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext<GenerateExamValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const addQuestion = () => {
    append({ text: "", image: null, lang: "ar" });
  };

  return (
    <section className="rounded-lg border border-white/10 bg-white/2 p-4 shadow-lg shadow-black/20 sm:rounded-xl sm:p-5 md:p-6">
      <div className="mb-5 flex flex-col gap-1 sm:mb-6 sm:flex-row sm:items-center sm:justify-between md:mb-8">
        <h2 className="text-base font-bold text-white sm:text-lg md:text-xl">
          قسم الأسئلة
        </h2>
        {errors.questions?.message && (
          <p className="text-xs text-red-400 sm:text-sm">
            {errors.questions.message}
          </p>
        )}
      </div>

      <div className="space-y-3 sm:space-y-4 md:space-y-5">
        {fields.map((field, index) => (
          <QuestionCard
            key={field.id}
            index={index}
            canRemove={fields.length > 1}
            onRemove={() => remove(index)}
          />
        ))}
      </div>

      {fields.length < 70 && (
        <button
          type="button"
          onClick={addQuestion}
          className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-[#00ffbf]/40 bg-[#00ffbf]/10 px-3.5 py-2 text-xs font-semibold text-[#00ffbf] transition-colors hover:border-[#00ffbf]/70 hover:bg-[#00ffbf]/20 sm:mt-6 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
        >
          <span className="text-base leading-none sm:text-lg">+</span>
          إضافة سؤال
        </button>
      )}
    </section>
  );
}