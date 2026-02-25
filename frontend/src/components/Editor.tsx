import type { RefObject } from "react";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
  onKeyTyped: () => void;
  focusMode: boolean;
  editorRef: RefObject<HTMLTextAreaElement>;
  isTyping: boolean;
};

export function Editor({ value, onChange, onKeyTyped, focusMode, editorRef, isTyping }: EditorProps) {
  return (
    <textarea
      ref={editorRef}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={onKeyTyped}
      placeholder="Start writing..."
      className={`h-[72vh] w-full resize-none rounded-2xl border border-slate-300/80 bg-white/88 p-6 text-base leading-8 text-slate-800 shadow-[0_12px_26px_rgba(15,23,42,0.07)] outline-none ring-0 transition-all duration-200 focus:border-sky-400 focus:bg-white focus:shadow-[0_14px_30px_rgba(14,165,233,0.14)] ${
        focusMode ? "text-lg leading-9" : ""
      } ${
        isTyping ? "typing-active" : ""
      }`}
    />
  );
}
