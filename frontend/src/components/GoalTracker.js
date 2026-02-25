import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
export function GoalTracker({ wordCount, wordGoal, onGoalChange }) {
    const clampedGoal = Math.max(wordGoal, 1);
    const progressPercent = Math.min((wordCount / clampedGoal) * 100, 100);
    return (_jsxs("div", { className: "rounded-xl border border-slate-700 bg-slate-900/70 p-3", children: [_jsxs("div", { className: "mb-2 flex items-center justify-between text-sm text-slate-300", children: [_jsxs("span", { children: ["Words: ", wordCount] }), _jsxs("span", { children: ["Goal: ", wordGoal] })] }), _jsx("input", { type: "number", min: 1, value: wordGoal, onChange: (event) => onGoalChange(Number(event.target.value) || 1), className: "mb-3 w-28 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm text-slate-100" }), _jsx("div", { className: "h-2 w-full overflow-hidden rounded bg-slate-800", children: _jsx("div", { className: "h-full bg-emerald-400", style: { width: `${progressPercent}%` } }) })] }));
}
