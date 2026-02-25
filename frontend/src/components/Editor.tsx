import type { RefObject } from "react";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
  onKeyTyped: () => void;
  focusMode: boolean;
  editorRef: RefObject<HTMLTextAreaElement>;
};

export function Editor({ value, onChange, onKeyTyped, focusMode, editorRef }: EditorProps) {
  return (
    <textarea
      ref={editorRef}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={onKeyTyped}
      placeholder="Start writing..."
      className={`h-[70vh] w-full resize-none rounded-2xl border border-slate-700/70 bg-slate-950/60 p-6 text-base leading-8 text-slate-100 outline-none ring-0 transition focus:border-indigo-400/60 focus:bg-slate-950 ${
        focusMode ? "text-lg leading-8" : ""
      }`}
    />
  );
}
