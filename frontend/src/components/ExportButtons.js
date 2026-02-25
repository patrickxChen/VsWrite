import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function ExportButtons({ onExportMarkdown, onExportPdf }) {
    return (_jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: onExportMarkdown, className: "rounded border border-slate-600 bg-slate-800 px-3 py-1.5 text-sm text-slate-100", children: "Export .md" }), _jsx("button", { onClick: onExportPdf, className: "rounded border border-slate-600 bg-slate-800 px-3 py-1.5 text-sm text-slate-100", children: "Export PDF" })] }));
}
