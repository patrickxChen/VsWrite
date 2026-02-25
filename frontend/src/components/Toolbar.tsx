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
    <div className="mb-4 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-700/70 bg-slate-900/40 p-3 text-sm backdrop-blur">
      <button
        onClick={onToggleFocus}
        className="rounded-lg border border-slate-600/80 bg-slate-800/80 px-3 py-1.5 text-slate-100 transition hover:bg-slate-700"
      >
        {focusMode ? "Exit Focus" : "Focus Mode"}
      </button>
      <button
        onClick={onBold}
        className="rounded-lg border border-indigo-400/60 bg-indigo-500/20 px-3 py-1.5 font-semibold text-indigo-100 transition hover:bg-indigo-500/30"
      >
        Bold
      </button>
      <button
        onClick={onToggleSound}
        className="rounded-lg border border-slate-600/80 bg-slate-800/80 px-3 py-1.5 text-slate-100 transition hover:bg-slate-700"
      >
        {soundOn ? "Sound On" : "Sound Off"}
      </button>
      <label className="flex items-center gap-2 text-slate-300">
        Volume
        <input
          className="accent-indigo-400"
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={(event) => onVolumeChange(Number(event.target.value))}
        />
      </label>
      <span className="ml-auto rounded-md bg-slate-800/80 px-2 py-1 text-xs text-slate-300">{saveState}</span>
    </div>
  );
}
