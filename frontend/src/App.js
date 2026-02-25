import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import { Editor } from "./components/Editor";
import { ExportButtons } from "./components/ExportButtons";
import { GoalTracker } from "./components/GoalTracker";
import { Toolbar } from "./components/Toolbar";
import { createSession, getSession, updateSession } from "./lib/api";
import { playTypewriterKey } from "./lib/typewriterSound";
import { countWords } from "./lib/wordCount";
const SESSION_KEY = "vswrite.session.id";
export default function App() {
    const [content, setContent] = useState("");
    const [focusMode, setFocusMode] = useState(false);
    const [soundOn, setSoundOn] = useState(true);
    const [volume, setVolume] = useState(0.6);
    const [wordGoal, setWordGoal] = useState(300);
    const [saveState, setSaveState] = useState("Idle");
    const [sessionId, setSessionId] = useState(null);
    const words = useMemo(() => countWords(content), [content]);
    useEffect(() => {
        const id = localStorage.getItem(SESSION_KEY);
        if (!id) {
            return;
        }
        getSession(id)
            .then((session) => {
            setSessionId(session.id);
            setContent(session.content);
            setWordGoal(session.wordGoal);
        })
            .catch(() => {
            localStorage.removeItem(SESSION_KEY);
        });
    }, []);
    useEffect(() => {
        const timeout = window.setTimeout(async () => {
            if (!content.trim()) {
                return;
            }
            setSaveState("Saving...");
            try {
                if (!sessionId) {
                    const created = await createSession({ content, wordCount: words, wordGoal });
                    localStorage.setItem(SESSION_KEY, created.id);
                    setSessionId(created.id);
                }
                else {
                    await updateSession(sessionId, { content, wordCount: words, wordGoal });
                }
                setSaveState("Saved");
            }
            catch {
                setSaveState("Save failed");
            }
        }, 900);
        return () => window.clearTimeout(timeout);
    }, [content, sessionId, wordGoal, words]);
    const handleType = () => {
        if (soundOn) {
            playTypewriterKey(volume);
        }
    };
    const exportMarkdown = () => {
        const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "draft.md";
        link.click();
        URL.revokeObjectURL(url);
    };
    const exportPdf = () => {
        const pdf = new jsPDF();
        const lines = pdf.splitTextToSize(content || "", 180);
        pdf.text(lines, 15, 20);
        pdf.save("draft.pdf");
    };
    return (_jsxs("main", { className: "mx-auto max-w-4xl px-4 py-6", children: [!focusMode && (_jsxs("header", { className: "mb-4 flex flex-wrap items-center justify-between gap-3", children: [_jsx("h1", { className: "text-xl font-semibold text-slate-100", children: "VsWrite" }), _jsx(ExportButtons, { onExportMarkdown: exportMarkdown, onExportPdf: exportPdf })] })), _jsx(Toolbar, { focusMode: focusMode, onToggleFocus: () => setFocusMode((previous) => !previous), soundOn: soundOn, onToggleSound: () => setSoundOn((previous) => !previous), volume: volume, onVolumeChange: setVolume, saveState: saveState }), _jsxs("div", { className: "grid gap-4 md:grid-cols-[1fr_220px]", children: [_jsx(Editor, { value: content, onChange: setContent, onKeyTyped: handleType, focusMode: focusMode }), _jsx(GoalTracker, { wordCount: words, wordGoal: wordGoal, onGoalChange: setWordGoal })] })] }));
}
