"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Sigma } from "lucide-react";

const MathField = "math-field" as any;

export default function MathEquationDialog() {
  const mathRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const savedRangeRef = useRef<Range | null>(null);

  useEffect(() => {
    import("mathlive").catch(console.error);
  }, []);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      // Preserve the caret inside the target contentEditable before
      // focus moves into the dialog.
      const selection = window.getSelection();
      savedRangeRef.current =
        selection && selection.rangeCount > 0
          ? selection.getRangeAt(0).cloneRange()
          : null;
    }
    setOpen(nextOpen);
  };

  const insertEquation = () => {
    const tex = mathRef.current?.value ?? "";
    const fieldId = sessionStorage.getItem("selected-field-id");
    const element = fieldId
      ? (document.getElementById(fieldId) as HTMLElement | null)
      : null;

    if (!element || !tex) {
      setOpen(false);
      return;
    }

    const latex = `\\(${tex}\\) `;

    const span = document.createElement("span");
    span.className = `${latex} ql-formula`;
    span.setAttribute("style", "direction: ltr;");
    span.setAttribute("contenteditable", "false");
    span.textContent = latex; // textContent is safer than innerHTML for LaTeX

    // 1. Give focus back to the contentEditable so React's onFocus fires
    //    (keeps focused.current === true in ContentEditableField).
    element.focus();

    const selection = window.getSelection();
    if (!selection) {
      setOpen(false);
      return;
    }

    // 2. Pick the insertion range.
    let range = savedRangeRef.current;
    const savedIsValid =
      !!range &&
      element.contains(range.startContainer) &&
      element.contains(range.endContainer);

    if (!savedIsValid) {
      range = document.createRange();
      range.selectNodeContents(element);
      range.collapse(false); // caret at the end
    }

    // 3. Insert the formula span at the caret.
    range!.deleteContents();
    range!.insertNode(span);

    // 4. Move the caret immediately AFTER the inserted span.
    const caretAfter = document.createRange();
    caretAfter.setStartAfter(span);
    caretAfter.collapse(true);
    selection.removeAllRanges();
    selection.addRange(caretAfter);

    // 5. Tell react-hook-form about the change.
    element.dispatchEvent(new Event("input", { bubbles: true }));

    // 6. Typeset MathJax (this may alter the span's inner HTML).
    const mathJax = window.MathJax;
    if (mathJax?.typesetClear && mathJax?.typeset) {
      mathJax.typesetClear();
      mathJax.typeset();
    }

    // 7. Re-apply focus + caret in case MathJax changed the DOM around it.
    setOpen(false);

    // Defer so the dialog's unmount/focus cleanup doesn't fight us.
    window.setTimeout(() => {
      const el = document.getElementById(fieldId ?? "");
      if (!el) return;
      el.focus();
      if (span.parentNode) {
        const after = document.createRange();
        after.setStartAfter(span);
        after.collapse(true);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(after);
      }
    }, 0);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger
        type="button"
        title="إضافة معادلة"
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 sm:h-9 sm:w-9"
      >
        <Sigma className="h-4 w-4 sm:h-5 sm:w-5" />
      </AlertDialogTrigger>

      <AlertDialogContent
        // Silence the "missing description" dev warning — this is a form,
        // not a destructive confirmation, so there's nothing to describe.
        aria-describedby={undefined}
        // @ts-expect-error — Radix supports this, shadcn's types don't expose it
        onCloseAutoFocus={(event: Event) => event.preventDefault()}
        className="w-[92vw] border border-white/10 bg-[#111827] text-white sm:max-w-lg"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-sm text-[#00ffbf] text-center sm:text-base">
            إضافة معادلة أو رمز
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="my-1 sm:my-2">
          <MathField
            ref={mathRef}
            className="ltr block min-h-12 w-full rounded-md border border-[#00ffbf]/40 bg-[#0b1220] px-3 py-2 text-sm text-white outline-none focus:border-[#00ffbf] sm:min-h-14 sm:text-base"
          />
        </div>

        <div className="mt-2 flex justify-end gap-2 bg-transparent">
          <AlertDialogCancel
            type="button"
            className="rounded-md border border-white/15 bg-transparent px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/5 sm:px-4 sm:py-2 sm:text-sm"
          >
            إغلاق
          </AlertDialogCancel>
          <AlertDialogAction
            type="button"
            onClick={insertEquation}
            className="rounded-md bg-[#00ffbf] px-3 py-1.5 text-xs font-semibold text-[#0b1220] transition-colors hover:bg-[#00e6ac] sm:px-4 sm:py-2 sm:text-sm"
          >
            إدراج
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}