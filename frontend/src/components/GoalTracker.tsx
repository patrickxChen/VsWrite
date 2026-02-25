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
    <div className="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-4 backdrop-blur">
      <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
        <span>Words: {wordCount}</span>
        <span>Goal: {wordGoal}</span>
      </div>
      <input
        type="number"
        min={1}
        value={wordGoal}
        onChange={(event) => onGoalChange(Number(event.target.value) || 1)}
        className="mb-3 w-28 rounded-lg border border-slate-600 bg-slate-800/80 px-2 py-1 text-sm text-slate-100"
      />
      <div className="mb-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400" style={{ width: `${progressPercent}%` }} />
      </div>
      <p className="text-xs text-slate-400">Progress: {progressLabel}</p>
    </div>
  );
}
