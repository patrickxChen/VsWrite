type ToolbarProps = {
  focusMode: boolean;
  onToggleFocus: () => void;
  soundOn: boolean;
  onToggleSound: () => void;
  volume: number;
  onVolumeChange: (value: number) => void;
  saveState: string;
};

export function Toolbar({
  focusMode,
  onToggleFocus,
  soundOn,
  onToggleSound,
  volume,
  onVolumeChange,
  saveState
}: ToolbarProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
      <button
        onClick={onToggleFocus}
        className="rounded border border-slate-600 bg-slate-800 px-3 py-1.5 text-slate-100"
      >
        {focusMode ? "Exit Focus" : "Focus Mode"}
      </button>
      <button
        onClick={onToggleSound}
        className="rounded border border-slate-600 bg-slate-800 px-3 py-1.5 text-slate-100"
      >
        {soundOn ? "Sound On" : "Sound Off"}
      </button>
      <label className="flex items-center gap-2 text-slate-300">
        Volume
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={(event) => onVolumeChange(Number(event.target.value))}
        />
      </label>
      <span className="ml-auto text-xs text-slate-400">{saveState}</span>
    </div>
  );
}
