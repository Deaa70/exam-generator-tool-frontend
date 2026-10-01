import { BadgeQuestionMark, CircleQuestionMark, FileQuestion } from "lucide-react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="space-y-1 sm:space-y-2">
      <h1 className="text-xl font-extrabold text-white sm:text-2xl md:text-3xl">
        {title}
      </h1>
      {subtitle && (
        <p className="text-xs text-gray-400 sm:text-sm">{subtitle}</p>
      )}

      <Link
        href={"/how-it-works"}
        className="items-center pt-1 text-xs text-gray-400  border-b-gray-400 hover:border-b-[#00ffbf] w-fit border-b transition-colors hover:text-[#00ffbf] sm:text-sm flex flex-row gap-1">
        <span>كيف تعمل الأداة</span><CircleQuestionMark size={15} /> </Link>
    </header>
  );
}
