export interface QuestionValue {
  text: string;        // HTML + LaTeX — يُرسل كما هو إلى /generate
  image: File | null;
}

export interface ExamFormValues {
  name: string;
  year: string;
  class_level: string;
  subject_name: string;
  time: string;
  marks: string;       // FastAPI يحوّل "20" إلى int
  teacher_name: string;
  questions: QuestionValue[];
}