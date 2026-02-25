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
      className={`editor-surface h-[72vh] w-full resize-none rounded-2xl border p-6 text-base leading-8 outline-none ring-0 transition-all duration-200 ${
        focusMode ? "text-lg leading-9" : ""
      } ${
        isTyping ? "typing-active" : ""
      }`}
    />
  );
}
