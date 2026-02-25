type ExportButtonsProps = {
  onExportMarkdown: () => void;
  onSaveAs: () => void;
};

export function ExportButtons({ onExportMarkdown, onSaveAs }: ExportButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={onExportMarkdown}
        className="export-btn rounded-lg border px-3.5 py-1.5 text-sm font-medium shadow-sm transition"
      >
        Export .md
      </button>
      <button
        onClick={onSaveAs}
        className="export-btn export-btn-accent rounded-lg border px-3.5 py-1.5 text-sm font-medium shadow-sm transition"
      >
        Save As
      </button>
    </div>
  );
}
