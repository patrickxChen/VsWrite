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
  const typingTimeoutRef = useRef<number | null>(null);
  const [content, setContent] = useState("");
  const [focusMode, setFocusMode] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [volume, setVolume] = useState(0.6);
  const [wordGoal, setWordGoal] = useState(300);
  const [saveState, setSaveState] = useState("Idle");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

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
    setIsTyping(true);
    if (typingTimeoutRef.current) {
      window.clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = window.setTimeout(() => setIsTyping(false), 180);

    if (soundOn) {
      playTypewriterKey(volume);
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        window.clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

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
    <main className="relative mx-auto max-w-5xl px-3 py-6 sm:px-4 md:py-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_18%,rgba(56,189,248,0.14),transparent_45%),radial-gradient(circle_at_86%_12%,rgba(167,139,250,0.12),transparent_44%),radial-gradient(circle_at_50%_92%,rgba(250,204,21,0.08),transparent_40%)]" />
      {!focusMode && (
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-3 shadow-[0_10px_22px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-sky-500 to-violet-500 shadow-[0_6px_16px_rgba(59,130,246,0.35)]">
              <div className="absolute inset-[6px] rounded-lg bg-white/90" />
              <div className="absolute left-[12px] top-[11px] h-[18px] w-[4px] rounded bg-sky-600" />
              <div className="absolute left-[18px] top-[11px] h-[18px] w-[4px] rounded bg-violet-600" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">VsWrite</h1>
              <p className="text-xs text-slate-600">Vscode, but for writing.</p>
            </div>
          </div>
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

      <Editor
        value={content}
        onChange={setContent}
        onKeyTyped={handleType}
        focusMode={focusMode}
        editorRef={editorRef}
        isTyping={isTyping}
      />

      <section className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-300/80 bg-white/82 p-3.5 shadow-[0_10px_22px_rgba(15,23,42,0.07)] backdrop-blur">
        <GoalTracker wordCount={words} wordGoal={wordGoal} onGoalChange={setWordGoal} />
        <div className="flex flex-wrap items-center justify-end gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
            <span>Total words:</span>
            <span>{words}</span>
          </div>
          <ExportButtons onExportMarkdown={exportMarkdown} onExportPdf={exportPdf} />
        </div>
      </section>
    </main>
  );
}
