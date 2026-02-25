type GoalTrackerProps = {
  wordCount: number;
  wordGoal: number;
  onGoalChange: (goal: number) => void;
};

export function GoalTracker({ wordCount, wordGoal, onGoalChange }: GoalTrackerProps) {
  const clampedGoal = Math.max(wordGoal, 1);
  const progressPercent = Math.min((wordCount / clampedGoal) * 100, 100);
  const progressLabel = `${Math.round(progressPercent)}%`;

  return (
    <div className="min-w-[260px] rounded-xl border border-slate-300 bg-slate-50/80 p-3.5 shadow-[0_8px_18px_rgba(15,23,42,0.06)]">
      <div className="mb-2 flex items-center justify-between text-sm text-slate-700">
        <span className="font-medium">Words: {wordCount}</span>
        <span className="font-medium">Goal: {wordGoal}</span>
      </div>
      <div className="mb-2 flex items-center gap-2">
        <label className="text-xs font-medium text-slate-600">Set goal</label>
        <input
          type="number"
          min={1}
          value={wordGoal}
          onChange={(event) => onGoalChange(Number(event.target.value) || 1)}
          className="w-24 rounded-lg border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 outline-none transition focus:border-sky-400"
        />
      </div>
      <div className="mb-1.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-violet-500 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
      </div>
      <p className="text-xs text-slate-500">Progress: {progressLabel}</p>
    </div>
  );
}
