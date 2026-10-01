"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sigma } from "lucide-react";

const MathField = "math-field" as any;

export default function MathEquationDialog() {
  const mathRef = useRef<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    import("mathlive").catch(console.error);
  }, []);

  const insertEquation = () => {
    const tex = mathRef.current?.value ?? "";
    const fieldId = sessionStorage.getItem("selected-field-id");
    const element = fieldId ? document.getElementById(fieldId) : null;

    if (!element || !tex) return;

    const latex = `\\(${tex}\\)`;

    const span = document.createElement("span");
    span.className = `${latex} ql-formula`;
    span.setAttribute("style", "direction: ltr;");
    span.setAttribute("contenteditable", "false");
    span.innerHTML = latex;

    element.appendChild(span);
    element.dispatchEvent(new Event("input", { bubbles: true }));

    const mathJax = window.MathJax;
    if (mathJax?.typesetClear && mathJax?.typeset) {
      mathJax.typesetClear();
      mathJax.typeset();
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        type="button"
        title="إضافة معادلة"
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 sm:h-9 sm:w-9">
        {/* <button> */}
          <Sigma className="h-4 w-4 sm:h-5 sm:w-5" />
        {/* </button> */}
      </DialogTrigger>

      <DialogContent className="w-[92vw] border border-white/10 bg-[#111827] text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-sm text-[#00ffbf] text-center sm:text-base">
            إضافة معادلة أو رمز
          </DialogTitle>
        </DialogHeader>

        <div className="my-1 sm:my-2">
          <MathField
            ref={mathRef}
            className="ltr block min-h-12 w-full rounded-md border border-[#00ffbf]/40 bg-[#0b1220] px-3 py-2 text-sm text-white outline-none focus:border-[#00ffbf] sm:min-h-14 sm:text-base"
          />
        </div>

        <div className="mt-2 flex justify-end gap-2 bg-transparent">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-md border border-white/15 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/5 sm:px-4 sm:py-2 sm:text-sm">
            إغلاق
          </button>
          <button
            type="button"
            onClick={insertEquation}
            className="rounded-md bg-[#00ffbf] px-3 py-1.5 text-xs font-semibold text-[#0b1220] transition-colors hover:bg-[#00e6ac] sm:px-4 sm:py-2 sm:text-sm">
            إدراج
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
