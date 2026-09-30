import Image from "next/image";

interface SiteFooterProps {
  name: string;
  role?: string;
  imageSrc: string;
  imageAlt?: string;
}

export default function SiteFooter({
  name,
  role = "مطوّر الأداة",
  imageSrc,
  imageAlt = name,
}: SiteFooterProps) {
  return (
    <footer className="mt-10 border-t border-white/10 pt-6 sm:mt-12 sm:pt-8">
      <div className="flex flex-col-reverse items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-5 sm:text-right">
        <div className="space-y-1">
          {role && <p className="text-xs text-gray-400 sm:text-sm">{role}</p>}
          <a
            className="text-sm font-bold text-white sm:text-base underline"
            target="_blank"
            href="https://deaa.vercel.app/ar">
            {name}
          </a>
        </div>

        <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16">
          <div className="absolute inset-0 rounded-full ring-2 ring-[#00ffbf]/10 ring-offset-2 ring-offset-[#0b1220]" />
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="51px"
            className="rounded-full object-cover"
          />
        </div>
      </div>
    </footer>
  );
}
