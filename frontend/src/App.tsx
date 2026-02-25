import { useEffect, useMemo, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { Editor } from "./components/Editor";
import { ExtensionsMarketplace } from "./components/ExtensionsMarketplace";
import { GoogleAuth, type GoogleUser } from "./components/GoogleAuth";
import { LeftSidebar } from "./components/LeftSidebar";
import { PetOverlay } from "./components/PetOverlay";
import { SidebarSettings } from "./components/SidebarSettings";
import { Toolbar } from "./components/Toolbar";
import { createSession, getSession, updateSession } from "./lib/api";
import { playTypewriterKey } from "./lib/typewriterSound";
import { countWords } from "./lib/wordCount";

const SESSION_KEY = "vswrite.session.id";
const THEME_KEY = "vswrite.theme";
const ACCOUNT_KEY = "vswrite.account";
const SESSION_MAP_KEY = "vswrite.session.map";
const LAST_TEXT_KEY = "vswrite.last.text.map";
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
  const importInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<number | null>(null);
  const [content, setContent] = useState("");
  const [focusMode, setFocusMode] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [volume, setVolume] = useState(0.6);
  const [saveState, setSaveState] = useState("Idle");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem(THEME_KEY) ?? "dark-plus");
  const [account, setAccount] = useState<GoogleUser | null>(() => {
    const raw = localStorage.getItem(ACCOUNT_KEY);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as GoogleUser;
    } catch {
      return null;
    }
  });
  const [isMarketplaceOpen, setIsMarketplaceOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [petsInstalled, setPetsInstalled] = useState(localStorage.getItem(PETS_INSTALLED_KEY) === "true");
  const [petsEnabled, setPetsEnabled] = useState(localStorage.getItem(PETS_ENABLED_KEY) === "true");

  const words = useMemo(() => countWords(content), [content]);
  const accountScope = account?.sub ?? "guest";

  function readMap(key: string): Record<string, string> {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return {};
    }
    try {
      return JSON.parse(raw) as Record<string, string>;
    } catch {
      return {};
    }
  }

  function writeMap(key: string, value: Record<string, string>) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (!account) {
      localStorage.removeItem(ACCOUNT_KEY);
      return;
    }
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
  }, [account]);

  useEffect(() => {
    localStorage.setItem(PETS_INSTALLED_KEY, String(petsInstalled));
  }, [petsInstalled]);

  useEffect(() => {
    localStorage.setItem(PETS_ENABLED_KEY, String(petsEnabled));
  }, [petsEnabled]);

  useEffect(() => {
    const map = readMap(SESSION_MAP_KEY);
    const lastTextMap = readMap(LAST_TEXT_KEY);

    if (lastTextMap[accountScope]) {
      setContent(lastTextMap[accountScope]);
    } else {
      setContent("");
    }

    const id = map[accountScope] ?? localStorage.getItem(SESSION_KEY);
    if (!id) {
      setSessionId(null);
      return;
    }

    getSession(id)
      .then((session) => {
        setSessionId(session.id);
        setContent(session.content);
      })
      .catch(() => {
        const next = readMap(SESSION_MAP_KEY);
        delete next[accountScope];
        writeMap(SESSION_MAP_KEY, next);
        setSessionId(null);
      });
  }, [accountScope]);

  useEffect(() => {
    const map = readMap(LAST_TEXT_KEY);
    map[accountScope] = content;
    writeMap(LAST_TEXT_KEY, map);
  }, [accountScope, content]);

  useEffect(() => {
    const timeout = window.setTimeout(async () => {
      if (!content.trim()) {
        return;
      }

      setSaveState("Saving...");
      try {
        if (!sessionId) {
          const created = await createSession({ content, wordCount: words, wordGoal: DEFAULT_WORD_GOAL });
          const sessionMap = readMap(SESSION_MAP_KEY);
          sessionMap[accountScope] = created.id;
          writeMap(SESSION_MAP_KEY, sessionMap);
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
  }, [accountScope, content, sessionId, words]);

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

  const onImportFile = () => {
    importInputRef.current?.click();
  };

  const handleImportChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const text = await file.text();
    setContent(text);
    setSaveState(`Imported ${file.name}`);
    event.target.value = "";
  };

  const onSignOut = () => {
    setAccount(null);
  };

  return (
    <main className="app-shell relative min-h-screen">
      <input
        ref={importInputRef}
        type="file"
        accept=".txt,.md,.markdown,text/plain,text/markdown"
        className="hidden"
        onChange={handleImportChange}
      />

      <div className="workspace-shell">
        <LeftSidebar
          onOpenExtensions={() => setIsMarketplaceOpen(true)}
          onExportMarkdown={exportMarkdown}
          onExportPdf={exportPdf}
          onImportFile={onImportFile}
          onToggleAccount={() => {
            setIsSettingsOpen(false);
            setIsAccountOpen((previous) => !previous);
          }}
          isAccountOpen={isAccountOpen}
          onToggleSettings={() => {
            setIsAccountOpen(false);
            setIsSettingsOpen((previous) => !previous);
          }}
          isSettingsOpen={isSettingsOpen}
        />

        <div className="sidebar-account-popover" data-open={isAccountOpen}>
          <GoogleAuth user={account} onSignIn={setAccount} onSignOut={onSignOut} />
        </div>

        <SidebarSettings
          isOpen={isSettingsOpen}
          theme={theme}
          themeOptions={THEME_OPTIONS}
          onThemeChange={setTheme}
        />

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
