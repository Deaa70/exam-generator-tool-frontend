import type { Metadata } from "next";
import Link from "next/link";
import { Sigma, ImagePlus, Trash2, Plus } from "lucide-react";
import ImageGallery, { type GalleryImage } from "@/components/image-gallery";

/* -------------------------------------------------------------------------- */
/*  SEO                                                                       */
/* -------------------------------------------------------------------------- */

const SITE_URL = "https://exam-generator.siraj.sy";

export const metadata: Metadata = {
  title: "كيفية إنشاء اختبار | دليل استخدام أداة الاختبارات",
  description:
    "دليل سريع لاستخدام أداة إنشاء الاختبارات: تعبئة معلومات الاختبار، كتابة الأسئلة، إدراج المعادلات الرياضية عبر لوحة المفاتيح، إرفاق الصور، وتنزيل الملف كـ PDF جاهز للطباعة.",
  keywords: [
    "إنشاء اختبار",
    "أداة اختبارات",
    "توليد اختبارات",
    "معادلات رياضية",
    "لوحة مفاتيح رياضية",
    "اختبار PDF",
    "بنك أسئلة",
  ],
  alternates: { canonical: `${SITE_URL}/guide` },
  openGraph: {
    title: "كيفية إنشاء اختبار في دقيقة",
    description:
      "خمس خطوات بسيطة لإنشاء اختبار احترافي مع معادلات رياضية وصور، وتنزيله كـ PDF.",
    url: `${SITE_URL}/guide`,
    siteName: "أداة إنشاء الاختبار",
    locale: "ar_SY",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "كيفية إنشاء اختبار في دقيقة",
    description:
      "خمس خطوات بسيطة لإنشاء اختبار احترافي مع معادلات رياضية وصور.",
  },
  robots: { index: true, follow: true },
};

/* Structured data — HowTo schema so Google can surface this as a rich result. */
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "كيفية إنشاء اختبار باستخدام أداة إنشاء الاختبار",
  description:
    "خطوات إنشاء اختبار إلكتروني مع أسئلة نصية ومعادلات رياضية وصور، وتنزيله كملف PDF.",
  inLanguage: "ar",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "املأ معلومات الاختبار",
      text: "أدخل اسم الاختبار، السنة، الصف، المادة، الوقت، الدرجة، واسم المعلم.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "اكتب نص السؤال",
      text: "اكتب نص السؤال مباشرة في بطاقة السؤال. استخدم زر AR/EN لتبديل اتجاه الكتابة.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "أدرج معادلة رياضية",
      text: "اضغط أيقونة Σ لفتح لوحة المفاتيح الرياضية، اكتب المعادلة بلمس الرموز، ثم اضغط إدراج.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "أرفق صورة (اختياري)",
      text: "اضغط أيقونة الصورة واختر ملفاً من جهازك بحجم أقل من 10 ميجابايت.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "أنشئ الاختبار",
      text: "اضغط زر إنشاء الاختبار وسيتم تنزيل ملف PDF تلقائياً.",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Content                                                                   */
/* -------------------------------------------------------------------------- */

interface Step {
  n: string;
  title: string;
  body: string;
  icon?: React.ReactNode;
  images?: GalleryImage[];
}

const STEPS: Step[] = [
  {
    n: "١",
    title: "املأ معلومات الاختبار",
    body: "أدخل اسم الاختبار، السنة، الصف، المادة، الوقت، الدرجة، واسم المعلم. هذه الحقول تظهر أعلى الصفحة الأولى من الاختبار.",
    images: [
      {
        src: "/1.png",
        alt: "1",
      },
      {
        src: "/2.png",
        alt: "2",
      },
 
    ],
  },
  {
    n: "٢",
    title: "اكتب نص السؤال",
    body: "في بطاقة «السؤال ١»، اكتب نص السؤال مباشرة في المساحة المخصصة. لإدخال نص بالإنجليزية، اضغط زر AR/EN لتغيير اتجاه السؤال.",
      images: [
              {
        src: "/3.png",
        alt: "3",
          },
          
    ],
  },
  {
    n: "٣",
    title: "أدرج معادلة رياضية",
    body: "اضغط أيقونة Σ لفتح لوحة المفاتيح الرياضية، واكتب المعادلة بالضغط على الرموز والأرقام. لاحظ المعاينة الفورية أثناء الكتابة، ثم اضغط «إدراج» لتظهر المعادلة داخل نص السؤال ويمكنك متابعة الكتابة بعدها مباشرة.",
    icon: <Sigma className="h-5 w-5" />,
      images: [
                      {
        src: "/4.png",
        alt: "4",
          },
                        {
        src: "/5.png",
        alt: "5",
          },
                        
        {
        src: "/6.png",
        alt: "6",
          },
        {
        src: "/7.png",
        alt: "7",
          },

    ],
  },
  {
    n: "٤",
    title: "أرفق صورة (اختياري)",
    body: "اضغط أيقونة الصورة واختر ملفاً من جهازك (بحجم أقل من 10 ميجابايت). لإزالة الصورة، اضغط علامة × التي تظهر فوقها.",
    icon: <ImagePlus className="h-5 w-5" />,
      images: [
                  {
        src: "/8.png",
        alt: "8",
          },
      ],
  },
  {
    n: "٥",
    title: "أضف المزيد أو احذف",
    body: "زر «إضافة سؤال» أسفل القسم يضيف سؤالاً جديداً (حتى 70 سؤالاً). أيقونة سلة المهملات تحذف سؤالاً — يبقى سؤال واحد على الأقل.",
    icon: (
      <span className="inline-flex items-center gap-2">
        <Plus className="h-5 w-5" />
        <Trash2 className="h-5 w-5" />
      </span>
    ),
    images: [],
  },
  {
    n: "٦",
    title: "أنشئ الاختبار",
    body: "اضغط زر «إنشاء الاختبار». سيتم تجهيز الاختبار وتنزيل ملف PDF جاهز للطباعة تلقائياً باسم الاختبار.",
    images: [],
  },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function GuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <main
        className="min-h-screen bg-[#0b1220] px-3 py-8 sm:px-4 sm:py-12"
        dir="rtl">
        <article className="mx-auto max-w-3xl">
          {/* Header */}
          <header className="mb-8 space-y-3 sm:mb-12 sm:space-y-4">
            <h1 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl">
              كيفية إنشاء اختبار في دقيقة
            </h1>
            <p className="text-sm text-gray-400 sm:text-base">
              ست خطوات بسيطة — لا حاجة لأي خبرة تقنية.
            </p>
          </header>

          {/* Video — optional, remove if not ready */}
          {/*
          <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg border border-white/10 sm:mb-12">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/VIDEO_ID"
              title="شرح استخدام أداة إنشاء الاختبار"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          */}

          {/* Steps */}
          <ol className="space-y-4 sm:space-y-6">
            {STEPS.map((step) => (
              <li
                key={step.n}
                className="rounded-lg border border-white/10 bg-white/[0.02] p-4 sm:rounded-xl sm:p-6">
                <div className="mb-2 flex items-center gap-3 sm:mb-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00ffbf]/15 text-sm font-bold text-[#00ffbf] sm:h-9 sm:w-9 sm:text-base">
                    {step.n}
                  </span>
                  <h2 className="flex items-center gap-2 text-base font-bold text-white sm:text-lg">
                    {step.title}
                    {step.icon && (
                      <span className="text-[#00ffbf]" aria-hidden="true">
                        {step.icon}
                      </span>
                    )}
                  </h2>
                </div>

                <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
                  {step.body}
                </p>

                {step.images && step.images.length > 0 && (
                  <ImageGallery images={step.images} />
                )}
              </li>
            ))}
          </ol>

          {/* CTA */}
          <div className="mt-8 text-center sm:mt-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-[#00ffbf] px-5 py-2.5 text-sm font-bold text-[#0b1220] transition-colors hover:bg-[#00e6ac] sm:px-7 sm:py-3 sm:text-base">
              ابدأ بإنشاء اختبار
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
