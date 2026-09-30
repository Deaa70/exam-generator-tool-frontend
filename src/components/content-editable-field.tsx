"use client";

import { useCallback, useEffect, useRef } from "react";

interface ContentEditableFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  lang?: "ar" | "en";
  className?: string;
  placeholder?: string;
}

function processNodeRecursively(node: HTMLElement) {
  if (node.tagName === "SPAN" && node.className.includes("ql-formula")) {
    let equation = "";
    node.classList.forEach((className) => {
      if (className.includes("ql-formula")) return;
      equation += className + " ";
    });
    node.innerHTML = equation.trim();
  } else if (node.childNodes?.length) {
    node.childNodes.forEach((child) => {
      processNodeRecursively(child as HTMLElement);
    });
  }
}

export default function ContentEditableField({
  id,
  value,
  onChange,
  lang = "ar",
  className,
  placeholder,
}: ContentEditableFieldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const focused = useRef(false);

  const typeset = useCallback(() => {
    const mathJax = window.MathJax;
    if (mathJax?.typesetClear && mathJax?.typeset) {
      mathJax.typesetClear();
      mathJax.typeset();
    }
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    if (!focused.current && ref.current.innerHTML !== (value || "")) {
      ref.current.innerHTML = value || "";
      typeset();
    }
  }, [value, typeset]);

  const handleInput = () => {
    if (!ref.current) return;
    const html = ref.current.innerHTML;
    if (html === "<br>" || html === "<div><br></div>") {
      onChange("");
      return;
    }
    const clone = ref.current.cloneNode(true) as HTMLElement;
    processNodeRecursively(clone);
    onChange(clone.innerHTML);
  };

  const isEmpty =
    !value || value.replace(/<[^>]*>/g, "").trim() === "";

  const dir = lang === "en" ? "ltr" : "rtl";
  const textAlign = lang === "en" ? "text-left" : "text-right";

  return (
    <div className="relative">
      <div
        id={id}
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        dir={dir}
        onFocus={() => {
          focused.current = true;
          sessionStorage.setItem("selected-field-id", id);
        }}
        onBlur={() => {
          focused.current = false;
        }}
        onInput={handleInput}
        className={`${className ?? ""} ${textAlign} peer`}
      />

      {isEmpty && placeholder && (
        <p
          dir={dir}
          className={`pointer-events-none absolute top-2.5 ${
            lang === "en" ? "left-2.5" : "right-2.5"
          } text-xs text-gray-400 peer-focus:hidden sm:top-3 sm:text-sm ${
            lang === "en" ? "sm:left-3" : "sm:right-3"
          }`}
        >
          {placeholder}
        </p>
      )}
    </div>
  );
}