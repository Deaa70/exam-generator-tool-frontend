"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BasicExamInfo from "./basic-exam-info";
import QuestionsSection from "./questions-section";
import SubmitExam from "./submit-exam";
import {
  generateExamSchema,
  type GenerateExamValues,
} from "@/schema/generate-exam-schema";

const defaultValues: GenerateExamValues = {
  name: "",
  year: "",
  classLevel: "",
  subject: "",
  time: "",
  marks: 0,
  teacherName: "",
  questions: [{ text: "", image: null, lang: "ar" }],
};

export default function GenerateExamForm() {
  const methods = useForm<GenerateExamValues>({
    resolver: zodResolver(generateExamSchema),
    defaultValues,
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <form
        className="space-y-5 sm:space-y-6 md:space-y-8"
        onSubmit={(event) => event.preventDefault()}
      >
        <BasicExamInfo />
        <QuestionsSection />
        <SubmitExam />
      </form>
    </FormProvider>
  );
}