import { z } from "zod";

export const questionSchema = z.object({
  text: z.string().min(1, "نص السؤال مطلوب"),
  image: z
    .custom<File | null>(
      (value) =>
        value === null ||
        (typeof File !== "undefined" && value instanceof File),
      { message: "يجب أن تكون الصورة ملفاً صالحاً" }
    )
    .nullable(),
  lang: z.enum(["ar", "en"]),
});

export const generateExamSchema = z.object({
  name: z.string().min(1, "اسم الاختبار مطلوب").max(150),
  year: z.string().min(1, "السنة مطلوبة").max(50),
  classLevel: z.string().min(1, "الصف مطلوب").max(100),
  subject: z.string().min(1, "اسم المادة مطلوب").max(100),
  time: z.string().min(1, "الوقت مطلوب").max(50),
  marks: z.coerce.number().min(0, "الدرجة لا يمكن أن تكون سالبة"),
  teacherName: z.string().min(1, "اسم المعلم مطلوب").max(100),
  questions: z
    .array(questionSchema)
    .min(1, "يجب إضافة سؤال واحد على الأقل")
    .max(70, "الحد الأقصى 70 سؤالاً"),
});

export type GenerateExamValues = z.infer<typeof generateExamSchema>;
export type QuestionValue = z.infer<typeof questionSchema>;