type LeftSidebarProps = {
  onOpenExtensions: () => void;
  onExportMarkdown: () => void;
  onExportPdf: () => void;
};

export function LeftSidebar({ onOpenExtensions, onExportMarkdown, onExportPdf }: LeftSidebarProps) {
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
      </div>
    </aside>
  );
}
