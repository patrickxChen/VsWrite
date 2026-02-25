type ExportButtonsProps = {
  onExportMarkdown: () => void;
  onExportPdf: () => void;
};

export function ExportButtons({ onExportMarkdown, onExportPdf }: ExportButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={onExportMarkdown}
        className="export-btn rounded-lg border px-3.5 py-1.5 text-sm font-medium shadow-sm transition"
      >
        Export .md
      </button>
      <button
        onClick={onExportPdf}
        className="export-btn export-btn-accent rounded-lg border px-3.5 py-1.5 text-sm font-medium shadow-sm transition"
      >
        Export PDF
      </button>
    </div>
  );
}
