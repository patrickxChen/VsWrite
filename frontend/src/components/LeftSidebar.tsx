import { ThemeSwitcher, type ThemeOption } from "./ThemeSwitcher";

type LeftSidebarProps = {
  onOpenExtensions: () => void;
  onExportMarkdown: () => void;
  onExportPdf: () => void;
  theme: string;
  themeOptions: ThemeOption[];
  onThemeChange: (theme: string) => void;
};

export function LeftSidebar({
  onOpenExtensions,
  onExportMarkdown,
  onExportPdf,
  theme,
  themeOptions,
  onThemeChange
}: LeftSidebarProps) {
  return (
    <aside className="left-sidebar">
      <div className="left-sidebar-top">
        <button className="sidebar-action" onClick={onOpenExtensions} title="Extensions Marketplace">
          <span className="sidebar-icon">🧩</span>
          <span>Extensions</span>
        </button>
        <button className="sidebar-action" onClick={onExportMarkdown} title="Export Markdown">
          <span className="sidebar-icon">⬇</span>
          <span>Export .md</span>
        </button>
        <button className="sidebar-action" onClick={onExportPdf} title="Export PDF">
          <span className="sidebar-icon">📄</span>
          <span>Export PDF</span>
        </button>
      </div>

      <div className="left-sidebar-bottom">
        <ThemeSwitcher value={theme} options={themeOptions} onChange={onThemeChange} />
      </div>
    </aside>
  );
}
