interface MathJaxNamespace {
  typesetPromise?: (elements?: HTMLElement[]) => Promise<void>;
  typeset?: (elements?: HTMLElement[]) => void;
  typesetClear?: () => void;
  startup?: { promise?: Promise<void> };
}

declare global {
  interface Window {
    MathJax?: MathJaxNamespace;
  }
}

export {};