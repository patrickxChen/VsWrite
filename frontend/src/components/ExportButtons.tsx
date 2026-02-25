type ExportButtonsProps = {
  onExportMarkdown: () => void;
  onExportPdf: () => void;
};

export function ExportButtons({ onExportMarkdown, onExportPdf }: ExportButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={onExportMarkdown}
        className="rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
      >
        Export .md
      </button>
      <button
        onClick={onExportPdf}
        className="rounded-lg border border-violet-300 bg-violet-50 px-3.5 py-1.5 text-sm font-medium text-violet-700 shadow-sm transition hover:bg-violet-100"
      >
        Export PDF
      </button>
    </div>
  );
}
