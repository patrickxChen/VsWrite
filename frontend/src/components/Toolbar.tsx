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
    <div className="toolbar-card mb-4 flex flex-wrap items-center gap-2 rounded-2xl border p-3 text-sm backdrop-blur">
      <button
        onClick={onToggleFocus}
        className="toolbar-btn rounded-lg border px-3.5 py-1.5 shadow-sm transition"
      >
        {focusMode ? "Exit Focus" : "Focus Mode"}
      </button>
      <button
        onClick={onToggleSound}
        className="toolbar-btn rounded-lg border px-3.5 py-1.5 shadow-sm transition"
      >
        {soundOn ? "Sound On" : "Sound Off"}
      </button>
      <label className="toolbar-volume flex items-center gap-2 rounded-lg border px-3 py-1">
        Volume
        <input
          className="toolbar-slider"
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={(event) => onVolumeChange(Number(event.target.value))}
        />
      </label>
      <span className="toolbar-save ml-auto rounded-lg px-3 py-1 text-xs font-medium shadow-sm">{saveState}</span>
    </div>
  );
}
