type ExportButtonsProps = {
  onExportMarkdown: () => void;
  onExportPdf: () => void;
};

export function ExportButtons({ onExportMarkdown, onExportPdf }: ExportButtonsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onExportMarkdown}
        className="rounded-lg border border-slate-600/80 bg-slate-800/80 px-3 py-1.5 text-sm text-slate-100 transition hover:bg-slate-700"
      >
        Export .md
      </button>
      <button
        onClick={onExportPdf}
        className="rounded-lg border border-emerald-400/60 bg-emerald-500/20 px-3 py-1.5 text-sm text-emerald-100 transition hover:bg-emerald-500/30"
      >
        Export PDF
      </button>
    </div>
  );
}
