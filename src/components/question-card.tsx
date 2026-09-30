"use client";

import { useEffect, useMemo, useRef } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ImagePlus, Trash2, X } from "lucide-react";
import ContentEditableField from "./content-editable-field";
import MathEquationDialog from "./math-equation-dialog";
import type { GenerateExamValues } from "@/schema/generate-exam-schema";

interface QuestionCardProps {
  index: number;
  canRemove: boolean;
  onRemove: () => void;
}

const iconButtonClasses =
  "inline-flex h-8 w-8 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 sm:h-9 sm:w-9";

export default function QuestionCard({
  index,
  canRemove,
  onRemove,
}: QuestionCardProps) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<GenerateExamValues>();

  const image = useWatch({ control, name: `questions.${index}.image` });
  const lang =
    useWatch({ control, name: `questions.${index}.lang` }) ?? "ar";

  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageUrl = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image]);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const questionErrors = errors.questions?.[index];

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("يجب أن يكون الملف صورة");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("يجب أن يكون حجم الصورة أقل من 10MB");
      return;
    }

    setValue(`questions.${index}.image`, file, { shouldValidate: true });
  };

  const removeImage = () => {
    setValue(`questions.${index}.image`, null, { shouldValidate: true });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const toggleLang = () => {
    setValue(`questions.${index}.lang`, lang === "ar" ? "en" : "ar");
  };

  return (
    <div className="relative rounded-md border border-white/10 bg-[#0f172a] p-3 pt-12 sm:rounded-lg sm:p-5 sm:pt-14">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/10 px-2.5 py-1.5 sm:px-4 sm:py-2">
        <h3 className="text-xs font-bold text-[#00ffbf] sm:text-sm md:text-base">
          السؤال {index + 1}
        </h3>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <button
            type="button"
            onClick={toggleLang}
            title="تغيير اتجاه السؤال"
            className="inline-flex h-8 items-center justify-center rounded-md border border-white/15 px-2 text-[10px] font-bold text-white transition-colors hover:border-[#00ffbf]/60 hover:text-[#00ffbf] sm:h-9 sm:px-2.5 sm:text-xs"
          >
            {lang === "ar" ? "AR" : "EN"}
          </button>

          <MathEquationDialog />

          <button
            type="button"
            title="إرفاق صورة"
            onClick={() => fileInputRef.current?.click()}
            className={iconButtonClasses}
          >
            <ImagePlus className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />

          <AlertDialog>
            <AlertDialogTrigger               type="button"
                disabled={!canRemove}
                title="حذف السؤال"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-red-500 transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40 sm:h-9 sm:w-9"
             
            >
 
                <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </AlertDialogTrigger>
            <AlertDialogContent className="border border-white/10 bg-[#111827] text-white">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-base sm:text-lg">
                  حذف السؤال؟
                </AlertDialogTitle>
                <AlertDialogDescription className="text-xs text-gray-400 sm:text-sm">
                  سيتم حذف هذا السؤال نهائياً.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-white/15 bg-transparent text-xs text-white hover:bg-white/5 sm:text-sm">
                  إلغاء
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={onRemove}
                  className="bg-red-500 text-xs text-white hover:bg-red-400 sm:text-sm"
                >
                  حذف
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="my-1 sm:my-2">
        <label className="mb-2 block text-xs font-semibold text-white sm:mb-3 sm:text-sm">
          السؤال
        </label>

        <Controller
          name={`questions.${index}.text`}
          control={control}
          render={({ field }) => (
            <ContentEditableField
              id={`question-${index}`}
              value={field.value}
              onChange={field.onChange}
              lang={lang}
              className={`min-h-20 rounded-md border bg-[#111827] p-2.5 text-sm text-white transition-colors focus:border-[#00ffbf]/70 focus:outline-none sm:min-h-24 sm:p-3 ${
                questionErrors?.text
                  ? "border-red-500"
                  : "border-white/10"
              }`}
              placeholder={
                lang === "ar"
                  ? "اكتب السؤال هنا"
                  : "Write the question here"
              }
            />
          )}
        />

        {questionErrors?.text && (
          <p className="mt-1.5 text-xs text-red-400 sm:mt-2">
            {questionErrors.text.message}
          </p>
        )}
      </div>

      {imageUrl && (
        <div className="relative mx-auto my-3 w-fit sm:my-4">
          <img
            src={imageUrl}
            alt="Question"
            className="w-32 rounded-md border border-white/10 sm:w-40"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-400"
          >
            <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}