type ExportButtonsProps = {
  onExportMarkdown: () => void;
  onExportPdf: () => void;
};

export function ExportButtons({ onExportMarkdown, onExportPdf }: ExportButtonsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onExportMarkdown}
        className="rounded border border-slate-600 bg-slate-800 px-3 py-1.5 text-sm text-slate-100"
      >
        Export .md
      </button>
      <button
        onClick={onExportPdf}
        className="rounded border border-slate-600 bg-slate-800 px-3 py-1.5 text-sm text-slate-100"
      >
        Export PDF
      </button>
    </div>
  );
}
