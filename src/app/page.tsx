import GenerateExamForm from "@/components/generate-exam-form";
import PageHeader from "@/components/PageHeader";
import SiteFooter from "@/components/site-footer";
import Stats from "@/components/stats";

export default function GenerateExamPage() {
  return (
    <main
      className="min-h-screen bg-[#0b1220] px-3 py-6 sm:px-4 sm:py-8 md:py-10"
      dir="rtl"
    >
      <div className="mx-auto max-w-5xl space-y-5 sm:space-y-6 md:space-y-8">
        <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-start md:justify-between">
          <PageHeader
            title="إضافة اختبار"
            subtitle="قم بتعبئة معلومات الاختبار وأضف الأسئلة ثم احفظ الاختبار."
          />
          <Stats />
        </div>

        <GenerateExamForm />
        <SiteFooter name="Deaa Dev" imageSrc="/logo.png"/>
      </div>
    </main>
  );
}