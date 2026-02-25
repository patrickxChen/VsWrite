type GoalTrackerProps = {
  wordCount: number;
  wordGoal: number;
  onGoalChange: (goal: number) => void;
};

export function GoalTracker({ wordCount, wordGoal, onGoalChange }: GoalTrackerProps) {
  const clampedGoal = Math.max(wordGoal, 1);
  const progressPercent = Math.min((wordCount / clampedGoal) * 100, 100);

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
      <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
        <span>Words: {wordCount}</span>
        <span>Goal: {wordGoal}</span>
      </div>
      <input
        type="number"
        min={1}
        value={wordGoal}
        onChange={(event) => onGoalChange(Number(event.target.value) || 1)}
        className="mb-3 w-28 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm text-slate-100"
      />
      <div className="h-2 w-full overflow-hidden rounded bg-slate-800">
        <div className="h-full bg-emerald-400" style={{ width: `${progressPercent}%` }} />
      </div>
    </div>
  );
}
