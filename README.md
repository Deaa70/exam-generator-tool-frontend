# Exam Generator — Frontend

A Next.js 16 (App Router) single-page tool for building Arabic exam papers and exporting them as ready-to-print A4 PDFs.

Fill in the exam header, add any number of questions (rich text + LaTeX + optional image), and hit **إنشاء الاختبار**. The form posts a multipart payload to the FastAPI backend, which typesets the math in a headless browser and streams back a PDF that downloads automatically.

---

## Features

- **Single-page App Router layout** — server component shell, client components for interactivity.
- **Zod + React Hook Form** validation with `onChange` mode.
- **Rich content editor** for each question: `contentEditable` field that supports HTML, LaTeX, and inline math.
- **MathLive equation editor** in a shadcn/ui Dialog — inserts `\(...\)` spans into whichever field is currently focused.
- **MathJax 3** live rendering inside the editor.
- **Arabic-first UI** with Cairo font, RTL layout, dark theme.
- **Per-question language toggle** (AR / EN) that flips `dir` on the field.
- **Per-question image upload** with MIME and size validation.
- **Live stats** — reads `/stats` from the backend to show total generated exams and questions.
- **Responsive** — mobile-first, scales up cleanly at `sm` and `md`.
- **Rate-limit aware** — shows the backend's `429` message inline.

---

## Tech Stack

| Layer            | Tool                                       |
| ---------------- | ------------------------------------------ |
| Framework        | Next.js 16 (App Router, Turbopack)         |
| UI               | React 19, Tailwind CSS v4                  |
| Components       | shadcn/ui (Dialog, AlertDialog)            |
| Forms            | react-hook-form + @hookform/resolvers      |
| Validation       | Zod                                        |
| Math input       | MathLive (`<math-field>`)                  |
| Math rendering   | MathJax 3 (CDN)                            |
| Icons            | lucide-react                               |
| Font             | Cairo (next/font/google)                   |

---

## Project Structure

```
src/
├── app/
│   ├── generate-exam/
│   │   └── page.tsx              # Server component shell
│   ├── layout.tsx                # Root layout + Cairo + MathJax script
│   └── globals.css
├── components/
│   ├── ui/                       # shadcn/ui primitives
│   ├── generate-exam-form.tsx    # Client form root
│   ├── basic-exam-info.tsx       # Header fields (name, year, class, ...)
│   ├── questions-section.tsx     # useFieldArray + Add button
│   ├── question-card.tsx         # Per-question card
│   ├── content-editable-field.tsx# contentEditable rich text field
│   ├── math-equation-dialog.tsx  # MathLive in a Dialog
│   ├── submit-exam.tsx           # POST /generate + download
│   ├── stats.tsx                 # GET /stats
│   ├── page-header.tsx           # Title + subtitle
│   └── site-footer.tsx           # Built-by credit
├── schema/
│   └── generate-exam-schema.ts   # Zod schema + inferred types
└── types/
    └── global.d.ts               # MathJax window typings
```

---

## Getting Started

### 1. Install

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 2. Configure environment

Create `.env.local` at the project root:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

`NEXT_PUBLIC_API_URL` must point to the FastAPI backend (defaults to empty string, which will send requests to the same origin).

### 3. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000 — the app should render the **إضافة اختبار** page.

### 4. Build for production

```bash
npm run build
npm start
```

---

## How It Works

### Form flow

1. `page.tsx` (server) renders `PageHeader`, `Stats`, `GenerateExamForm`, and `SiteFooter`.
2. `GenerateExamForm` sets up `react-hook-form` with the Zod resolver and provides context to children.
3. `BasicExamInfo` renders the text/number inputs for the exam header.
4. `QuestionsSection` renders one `QuestionCard` per question and manages add/remove via `useFieldArray`.
5. `SubmitExam` calls `handleSubmit(onSubmit)` and posts the multipart body.

### Question editing

- Each question's **text** is a `contentEditable` div (`ContentEditableField`).
- On focus, the field's `id` is stored in `sessionStorage` under `selected-field-id`.
- The `MathEquationDialog` reads that id, appends a `<span class="ql-formula">\(...\)</span>` to the target element, dispatches an `input` event, then calls `MathJax.typesetClear()` / `typeset()` to re-render.
- The text field itself reads its `innerHTML` on input and stores it in the form state.
- Language toggle flips `lang` between `"ar"` and `"en"`, which sets `dir` on the field and moves the placeholder.

### Submit

`submit-exam.tsx` builds a `FormData`:

| Form field                  | Source                              |
| --------------------------- | ----------------------------------- |
| `name`                      | `data.name`                         |
| `year`                      | `data.year`                         |
| `class_level`               | `data.classLevel`                   |
| `subject_name`              | `data.subject`                      |
| `time`                      | `data.time`                         |
| `marks`                     | `String(data.marks)`                |
| `teacher_name`              | `data.teacherName`                  |
| `questions[i][text]`        | each question's HTML body           |
| `questions[i][image]`       | each question's File (if present)   |

It POSTs to `${NEXT_PUBLIC_API_URL}/generate`, reads the response as a `Blob`, and triggers a download named `<exam name>.pdf`.

Errors surface inline; `429` from the rate limiter is shown as the backend's message.

---

## Backend Contract

The frontend expects a backend exposing:

### `POST /generate`

**Content-Type:** `multipart/form-data`

Same field names as the table above. Response body is `application/pdf`.

### `GET /stats`

Returns:

```json
{ "generations": 42, "total_questions": 320 }
```

`Stats` renders two cards with these values and formats numbers with `toLocaleString`.

---

## Environment Variables

| Variable                | Default | Description                                 |
| ----------------------- | ------- | ------------------------------------------- |
| `NEXT_PUBLIC_API_URL`   | `""`    | Base URL of the FastAPI backend (no trailing slash). |

---

## Scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Start dev server (Turbopack).     |
| `npm run build` | Production build.                 |
| `npm start`     | Start production server.          |
| `npm run lint`  | Run ESLint.                       |

---

## Adding shadcn/ui components

This project uses shadcn/ui with Tailwind v4. To add a new primitive:

```bash
npx shadcn@latest add <component>
```

It lands in `src/components/ui/` and is imported by name, e.g.:

```tsx
import { Button } from "@/components/ui/button";
```

Only `Dialog` and `AlertDialog` are currently used at the app level.

---

## Styling Notes

- **Theme:** dark navy (`#0b1220` background, `#111827` panels), accent `#00ffbf`.
- **Font:** Cairo, applied to `<html>` in `layout.tsx`.
- **RTL:** the root `<html>` has `dir="rtl"`. Per-question language override is done by setting `dir` on the contentEditable itself.
- **No skeletons, no Suspense, no lazy loading** — the page renders immediately and only the two network calls (`/stats`, `/generate`) have their own inline loading states.

---

## MathJax

MathJax is loaded from the CDN in `layout.tsx` via `next/script` (`strategy="afterInteractive"`):

```
https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js
```

The editor calls `MathJax.typesetClear()` + `typeset()` after inserting an equation, and after external value updates from the form (e.g. reset). Types are declared in `types/global.d.ts`.

If the app runs on a machine without internet access, MathJax won't load and inline formulas will render as raw LaTeX. To make this offline, host `tex-mml-chtml.js` yourself under `/public` and change the script URL.

---

## Browser Support

Requires a modern evergreen browser — the editor relies on `contentEditable`, `MathLive` custom elements, and modern CSS (`:has`, logical properties). No support for IE or legacy Edge.
 
---

Built by [Deaa Dev](https://deaa.vercel.app/ar).