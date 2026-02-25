type LeftSidebarProps = {
  onOpenExtensions: () => void;
  onExportMarkdown: () => void;
  onExportPdf: () => void;
  onImportFile: () => void;
  onToggleAccount: () => void;
  isAccountOpen: boolean;
  onToggleSettings: () => void;
  isSettingsOpen: boolean;
};

export function LeftSidebar({
  onOpenExtensions,
  onExportMarkdown,
  onExportPdf,
  onImportFile,
  onToggleAccount,
  isAccountOpen,
  onToggleSettings,
  isSettingsOpen
}: LeftSidebarProps) {
  return (
    <aside className="left-sidebar">
      <div className="left-sidebar-top">
        <button className="sidebar-action" onClick={onOpenExtensions} title="Extensions Marketplace" aria-label="Extensions Marketplace">
          <svg className="sidebar-icon-svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
            <rect x="2.2" y="2.2" width="4.1" height="4.1" rx="0.6" />
            <rect x="9.7" y="2.2" width="4.1" height="4.1" rx="0.6" />
            <rect x="2.2" y="9.7" width="4.1" height="4.1" rx="0.6" />
            <path d="M10 8.2h2.1c1 0 1.7.7 1.7 1.7v2.3c0 1-.7 1.7-1.7 1.7H10c-1 0-1.7-.7-1.7-1.7V9.9c0-1 .7-1.7 1.7-1.7z" />
            <path d="M9.9 6.4c-.6 0-1-.4-1-1 0-.5.4-.9 1-.9h.5c.6 0 1-.5 1-1v-.3" />
          </svg>
        </button>
        <button className="sidebar-action" onClick={onExportMarkdown} title="Export Markdown" aria-label="Export Markdown">
          <svg className="sidebar-icon-svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M3 10.5v2.2c0 .6.5 1.1 1.1 1.1h7.8c.6 0 1.1-.5 1.1-1.1v-2.2" />
            <path d="M8 2.3v7.2" />
            <path d="m5.3 6.8 2.7 2.7 2.7-2.7" />
          </svg>
        </button>
        <button className="sidebar-action" onClick={onExportPdf} title="Export PDF" aria-label="Export PDF">
          <svg className="sidebar-icon-svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden="true">
            <path d="M4 1.9h5.2L12.8 5v9.1H4z" />
            <path d="M9.2 1.9V5h3.6" />
            <path d="M5.4 11.2h5.2" />
          </svg>
        </button>
        <button className="sidebar-action" onClick={onImportFile} title="Import File" aria-label="Import File">
          <svg className="sidebar-icon-svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden="true">
            <path d="M4 1.9h5.2L12.8 5v9.1H4z" />
            <path d="M9.2 1.9V5h3.6" />
            <path d="M8 12.6V7.8" />
            <path d="m5.8 9.8 2.2-2.2 2.2 2.2" />
          </svg>
        </button>
      </div>

      <div className="left-sidebar-bottom">
        <button
          className="sidebar-action"
          onClick={onToggleAccount}
          title="Account"
          aria-label="Account"
          aria-pressed={isAccountOpen}
        >
          <svg className="sidebar-icon-svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden="true">
            <circle cx="8" cy="5.2" r="2.3" />
            <path d="M3 13.4c.6-2 2.7-3.2 5-3.2s4.4 1.2 5 3.2" />
          </svg>
        </button>
        <button
          className="sidebar-action"
          onClick={onToggleSettings}
          title="Settings"
          aria-label="Settings"
          aria-pressed={isSettingsOpen}
        >
          <svg className="sidebar-icon-svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
            <path d="M8 5.1a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Z" />
            <path d="M13.7 8a5.8 5.8 0 0 0-.1-1.1l1.4-1-1.2-2.2-1.7.5a6 6 0 0 0-1.9-1.1l-.3-1.8H7.1l-.3 1.8c-.7.2-1.3.5-1.9 1.1l-1.7-.5-1.2 2.2 1.4 1a5.8 5.8 0 0 0 0 2.2l-1.4 1 1.2 2.2 1.7-.5c.6.5 1.2.9 1.9 1.1l.3 1.8h2.8l.3-1.8c.7-.2 1.3-.6 1.9-1.1l1.7.5 1.2-2.2-1.4-1c.1-.4.1-.8.1-1.1Z" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
