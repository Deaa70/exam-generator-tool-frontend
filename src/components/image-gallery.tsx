"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [index, setIndex] = useState(0);

  if (!images.length) return null;

  const hasMultiple = images.length > 1;
  const current = images[index];

  const goPrev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="mt-4">
      <div className="relative overflow-hidden rounded-md border border-white/10 bg-[#0b1220]">
        <Image
          src={current.src}
          alt={current.alt}
          width={1200}
          height={700}
          className="w-full"
          sizes="(max-width: 768px) 100vw, 768px"
        />

        {hasMultiple && (
          <>
            {/* Prev — visually on the left in RTL means "next", so we label carefully */}
            <button
              type="button"
              onClick={goPrev}
              aria-label="الصورة السابقة"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 sm:p-2.5"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="الصورة التالية"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 sm:p-2.5"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="mt-2 flex items-center justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`الصورة ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-4 bg-[#00ffbf]"
                  : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}