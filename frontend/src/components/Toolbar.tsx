type ToolbarProps = {
  focusMode: boolean;
  onToggleFocus: () => void;
  onBold: () => void;
  soundOn: boolean;
  onToggleSound: () => void;
  volume: number;
  onVolumeChange: (value: number) => void;
  saveState: string;
};

export function Toolbar({
  focusMode,
  onToggleFocus,
  onBold,
  soundOn,
  onToggleSound,
  volume,
  onVolumeChange,
  saveState
}: ToolbarProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-300/80 bg-white/82 p-3 text-sm shadow-[0_10px_20px_rgba(15,23,42,0.06)] backdrop-blur">
      <button
        onClick={onToggleFocus}
        className="rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-1.5 text-slate-700 shadow-sm transition hover:bg-slate-100"
      >
        {focusMode ? "Exit Focus" : "Focus Mode"}
      </button>
      <button
        onClick={onBold}
        className="rounded-lg border border-violet-300 bg-violet-50 px-3.5 py-1.5 font-semibold text-violet-700 shadow-sm transition hover:bg-violet-100"
      >
        Bold
      </button>
      <button
        onClick={onToggleSound}
        className="rounded-lg border border-sky-300 bg-sky-50 px-3.5 py-1.5 text-sky-700 shadow-sm transition hover:bg-sky-100"
      >
        {soundOn ? "Sound On" : "Sound Off"}
      </button>
      <label className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1 text-slate-600">
        Volume
        <input
          className="accent-sky-500"
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={(event) => onVolumeChange(Number(event.target.value))}
        />
      </label>
      <span className="ml-auto rounded-lg bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 shadow-sm">{saveState}</span>
    </div>
  );
}
