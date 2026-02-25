import { useEffect, useMemo, useRef, useState } from "react";
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
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState("");
  const [focusMode, setFocusMode] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [volume, setVolume] = useState(0.6);
  const [wordGoal, setWordGoal] = useState(300);
  const [saveState, setSaveState] = useState("Idle");
  const [sessionId, setSessionId] = useState<string | null>(null);

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
        } else {
          await updateSession(sessionId, { content, wordCount: words, wordGoal });
        }
        setSaveState("Saved");
      } catch {
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

  const applyBoldFormatting = () => {
    const textarea = editorRef.current;
    if (!textarea) {
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) {
      const nextContent = `${content.slice(0, start)}****${content.slice(end)}`;
      setContent(nextContent);
      window.requestAnimationFrame(() => {
        textarea.focus();
        textarea.setSelectionRange(start + 2, start + 2);
      });
      return;
    }

    const selectedText = content.slice(start, end);
    const nextContent = `${content.slice(0, start)}**${selectedText}**${content.slice(end)}`;
    setContent(nextContent);
    window.requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 2, end + 2);
    });
  };

  return (
    <main className="relative mx-auto max-w-5xl px-4 py-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.16),transparent_40%)]" />
      {!focusMode && (
        <header className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-700/70 bg-slate-900/40 px-4 py-3 backdrop-blur">
          <div>
            <h1 className="text-xl font-semibold tracking-wide text-slate-100">VsWrite</h1>
            <p className="text-xs text-slate-400">Write with focus, keep your flow.</p>
          </div>
          <ExportButtons onExportMarkdown={exportMarkdown} onExportPdf={exportPdf} />
        </header>
      )}

      <Toolbar
        focusMode={focusMode}
        onToggleFocus={() => setFocusMode((previous) => !previous)}
        onBold={applyBoldFormatting}
        soundOn={soundOn}
        onToggleSound={() => setSoundOn((previous) => !previous)}
        volume={volume}
        onVolumeChange={setVolume}
        saveState={saveState}
      />

      <div className="grid gap-4 md:grid-cols-[1fr_240px]">
        <Editor value={content} onChange={setContent} onKeyTyped={handleType} focusMode={focusMode} editorRef={editorRef} />
        <GoalTracker wordCount={words} wordGoal={wordGoal} onGoalChange={setWordGoal} />
      </div>
    </main>
  );
}
