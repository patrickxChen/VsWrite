import { useEffect, useMemo, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { Editor } from "./components/Editor";
import { ExtensionsMarketplace } from "./components/ExtensionsMarketplace";
import { LeftSidebar } from "./components/LeftSidebar";
import { PetOverlay } from "./components/PetOverlay";
import { Toolbar } from "./components/Toolbar";
import { createSession, getSession, updateSession } from "./lib/api";
import { playTypewriterKey } from "./lib/typewriterSound";
import { countWords } from "./lib/wordCount";

const SESSION_KEY = "vswrite.session.id";
const THEME_KEY = "vswrite.theme";
const PETS_INSTALLED_KEY = "vswrite.extension.pets.installed";
const PETS_ENABLED_KEY = "vswrite.extension.pets.enabled";
const DEFAULT_WORD_GOAL = 300;

const THEME_OPTIONS = [
  { id: "dark-plus", label: "Dark+" },
  { id: "light-plus", label: "Light+" },
  { id: "monokai", label: "Monokai" },
  { id: "quiet-light", label: "Quiet Light" }
];

export default function App() {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<number | null>(null);
  const [content, setContent] = useState("");
  const [focusMode, setFocusMode] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [volume, setVolume] = useState(0.6);
  const [saveState, setSaveState] = useState("Idle");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem(THEME_KEY) ?? "dark-plus");
  const [isMarketplaceOpen, setIsMarketplaceOpen] = useState(false);
  const [petsInstalled, setPetsInstalled] = useState(localStorage.getItem(PETS_INSTALLED_KEY) === "true");
  const [petsEnabled, setPetsEnabled] = useState(localStorage.getItem(PETS_ENABLED_KEY) === "true");

  const words = useMemo(() => countWords(content), [content]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(PETS_INSTALLED_KEY, String(petsInstalled));
  }, [petsInstalled]);

  useEffect(() => {
    localStorage.setItem(PETS_ENABLED_KEY, String(petsEnabled));
  }, [petsEnabled]);

  useEffect(() => {
    const id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      return;
    }

    getSession(id)
      .then((session) => {
        setSessionId(session.id);
        setContent(session.content);
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
          const created = await createSession({ content, wordCount: words, wordGoal: DEFAULT_WORD_GOAL });
          localStorage.setItem(SESSION_KEY, created.id);
          setSessionId(created.id);
        } else {
          await updateSession(sessionId, { content, wordCount: words, wordGoal: DEFAULT_WORD_GOAL });
        }
        setSaveState("Saved");
      } catch {
        setSaveState("Save failed");
      }
    }, 900);

    return () => window.clearTimeout(timeout);
  }, [content, sessionId, words]);

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

  const installPetsExtension = () => {
    setPetsInstalled(true);
    setPetsEnabled(true);
  };

  const togglePetsExtension = () => {
    setPetsEnabled((previous) => !previous);
  };

  const uninstallPetsExtension = () => {
    setPetsInstalled(false);
    setPetsEnabled(false);
  };

  return (
    <main className="app-shell relative min-h-screen">
      <div className="workspace-shell">
        {!focusMode && (
          <LeftSidebar
            onOpenExtensions={() => setIsMarketplaceOpen(true)}
            onExportMarkdown={exportMarkdown}
            onExportPdf={exportPdf}
            theme={theme}
            themeOptions={THEME_OPTIONS}
            onThemeChange={setTheme}
          />
        )}

        <section className="workspace-main">
          <header className="app-header mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-4 py-3 shadow-[0_10px_22px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="logo-mark relative h-10 w-10 rounded-xl bg-gradient-to-br from-sky-500 to-violet-500 shadow-[0_6px_16px_rgba(59,130,246,0.35)]">
                <div className="logo-mark-inner absolute inset-[6px] rounded-lg bg-white/90" />
                <div className="logo-bar-a absolute left-[12px] top-[11px] h-[18px] w-[4px] rounded bg-sky-600" />
                <div className="logo-bar-b absolute left-[18px] top-[11px] h-[18px] w-[4px] rounded bg-violet-600" />
              </div>
              <div>
                <h1 className="app-title text-2xl font-semibold tracking-tight">VsWrite</h1>
                <p className="app-subtitle text-xs">Vscode, but for writing.</p>
              </div>
            </div>
          </header>

          <ExtensionsMarketplace
            isOpen={isMarketplaceOpen}
            onClose={() => setIsMarketplaceOpen(false)}
            petsInstalled={petsInstalled}
            petsEnabled={petsEnabled}
            onInstallPets={installPetsExtension}
            onTogglePets={togglePetsExtension}
            onUninstallPets={uninstallPetsExtension}
          />

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

          <div className="editor-board">
            {petsInstalled && petsEnabled && <PetOverlay />}
            <Editor
              value={content}
              onChange={setContent}
              onKeyTyped={handleType}
              focusMode={focusMode}
              editorRef={editorRef}
              isTyping={isTyping}
            />
          </div>

          <section className="status-strip mt-4 flex items-center justify-end rounded-xl border px-3 py-2 text-sm">
            <span className="font-medium">Words: {words}</span>
          </section>
        </section>
      </div>
    </main>
  );
}
