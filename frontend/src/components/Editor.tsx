type EditorProps = {
  value: string;
  onChange: (value: string) => void;
  onKeyTyped: () => void;
  focusMode: boolean;
};

export function Editor({ value, onChange, onKeyTyped, focusMode }: EditorProps) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={onKeyTyped}
      placeholder="Start writing..."
      className={`h-[70vh] w-full resize-none rounded-xl border border-slate-700 bg-slate-900/80 p-5 text-base leading-7 text-slate-100 outline-none ring-0 ${
        focusMode ? "text-lg leading-8" : ""
      }`}
    />
  );
}
