export function whenMathJaxReady(timeoutMs = 15000): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  return new Promise((resolve) => {
    const started = Date.now();
    const check = () => {
      const mj = window.MathJax;
      if (mj?.startup?.promise) {
        mj.startup.promise.then(() => resolve()).catch(() => resolve());
        return;
      }
      if (Date.now() - started > timeoutMs) return resolve(); // offline → preview shows raw LaTeX
      setTimeout(check, 150);
    };
    check();
  });
}