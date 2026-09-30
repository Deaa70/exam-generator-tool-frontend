"use client";

import { useFormContext } from "react-hook-form";
import type { GenerateExamValues } from "@/schema/generate-exam-schema";

const inputClasses =
  "w-full rounded-md border border-white/10 bg-[#111827] px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-gray-400 focus:border-[#00ffbf]/70 focus:ring-1 focus:ring-[#00ffbf]/40 sm:py-2.5";

const labelClasses =
  "mb-2 block text-xs font-semibold text-white sm:mb-3 sm:text-sm";

export default function BasicExamInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<GenerateExamValues>();

  return (
    <section className="rounded-lg border border-white/10 bg-white/2 p-4 shadow-lg shadow-black/20 sm:rounded-xl sm:p-5 md:p-6">
      <h2 className="mb-5 text-base font-bold text-white sm:mb-6 sm:text-lg md:mb-8 md:text-xl">
        معلومات الاختبار
      </h2>

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:gap-y-6 md:grid-cols-2 md:gap-y-8">
        <div>
          <label htmlFor="name" className={labelClasses}>
            اسم الاختبار
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder="ادخل اسم الاختبار, مثال امتحان رياضيات"
            className={inputClasses}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-400 sm:mt-2">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="year" className={labelClasses}>
            السنة
          </label>
          <input
            id="year"
            type="text"
            {...register("year")}
            placeholder="ادخل السنة"
            className={inputClasses}
          />
          {errors.year && (
            <p className="mt-1.5 text-xs text-red-400 sm:mt-2">
              {errors.year.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="classLevel" className={labelClasses}>
            الصف
          </label>
          <input
            id="classLevel"
            type="text"
            {...register("classLevel")}
            placeholder="ادخل الصف , مثال بكلوريا"
            className={inputClasses}
          />
          {errors.classLevel && (
            <p className="mt-1.5 text-xs text-red-400 sm:mt-2">
              {errors.classLevel.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className={labelClasses}>
            المادة
          </label>
          <input
            id="subject"
            type="text"
            {...register("subject")}
            placeholder="ادخل اسم المادة"
            className={inputClasses}
          />
          {errors.subject && (
            <p className="mt-1.5 text-xs text-red-400 sm:mt-2">
              {errors.subject.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="time" className={labelClasses}>
            الوقت
          </label>
          <input
            id="time"
            type="text"
            {...register("time")}
            placeholder="مثال: ساعتان"
            className={inputClasses}
          />
          {errors.time && (
            <p className="mt-1.5 text-xs text-red-400 sm:mt-2">
              {errors.time.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="marks" className={labelClasses}>
            الدرجة
          </label>
          <input
            id="marks"
            type="number"
            {...register("marks")}
            placeholder="ادخل الدرجة , مثال : 600"
            className={inputClasses}
          />
          {errors.marks && (
            <p className="mt-1.5 text-xs text-red-400 sm:mt-2">
              {errors.marks.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="teacherName" className={labelClasses}>
            اسم المعلم
          </label>
          <input
            id="teacherName"
            type="text"
            {...register("teacherName")}
            placeholder="ادخل اسم المعلم , مثال : الاستاذ ضياء الناصر"
            className={inputClasses}
          />
          {errors.teacherName && (
            <p className="mt-1.5 text-xs text-red-400 sm:mt-2">
              {errors.teacherName.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}