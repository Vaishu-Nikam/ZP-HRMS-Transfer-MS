import React, { useState } from "react";
import { FileDown, FileSpreadsheet, Loader2 } from "lucide-react";

/**
 * ExportButtons — Reusable Excel + PDF export component
 *
 * Props:
 *   filename   — base filename (e.g. "attendance-records")
 *   columns    — [{ key, header }] — which columns to export
 *   data       — array of row objects
 *   pdfTitle   — title shown at top of PDF (optional)
 *   onExcelExport — override function (optional)
 *   onPdfExport   — override function (optional)
 */

// ── Helpers ───────────────────────────────────────────────────────────────────

const toCSV = (columns, data) => {
  const headers = columns.map((c) => `"${c.header}"`).join(",");
  const rows = data.map((row) =>
    columns.map((c) => {
      const val = row[c.key] ?? "";
      return `"${String(val).replace(/"/g, '""')}"`;
    }).join(",")
  );
  return [headers, ...rows].join("\n");
};

const downloadFile = (content, filename, mime) => {
  const blob = new Blob([content], { type: mime });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const generatePDFHTML = (title, columns, data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; font-size: 12px; color: #1e293b; padding: 32px; }
    .header { margin-bottom: 24px; border-bottom: 2px solid #1e293b; padding-bottom: 12px; }
    .title  { font-size: 20px; font-weight: 700; color: #0f172a; }
    .meta   { font-size: 11px; color: #64748b; margin-top: 4px; }
    table   { width: 100%; border-collapse: collapse; margin-top: 16px; }
    thead tr{ background: #0f172a; color: #fff; }
    th      { padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
    td      { padding: 9px 12px; border-bottom: 1px solid #f1f5f9; font-size: 12px; }
    tr:nth-child(even) td { background: #f8fafc; }
    .footer { margin-top: 24px; font-size: 10px; color: #94a3b8; text-align: right; }
  </style>
</head>
<body>
  <div class="header">
    <div class="title">${title}</div>
    <div class="meta">Generated on ${new Date().toLocaleString("en-IN")}</div>
  </div>
  <table>
    <thead>
      <tr>${columns.map((c) => `<th>${c.header}</th>`).join("")}</tr>
    </thead>
    <tbody>
      ${data.map((row) => `
        <tr>${columns.map((c) => `<td>${row[c.key] ?? "—"}</td>`).join("")}</tr>
      `).join("")}
    </tbody>
  </table>
  <div class="footer">Total ${data.length} record${data.length !== 1 ? "s" : ""}</div>
</body>
</html>`;

// ── Component ─────────────────────────────────────────────────────────────────
const ExportButtons = ({
  filename   = "export",
  columns    = [],
  data       = [],
  pdfTitle   = "Report",
  onExcelExport,
  onPdfExport,
}) => {
  const [excelLoading, setExcelLoading] = useState(false);
  const [pdfLoading,   setPdfLoading]   = useState(false);

  const handleExcel = async () => {
    if (onExcelExport) { onExcelExport(); return; }
    setExcelLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const csv = toCSV(columns, data);
    downloadFile("\uFEFF" + csv, `${filename}.csv`, "text/csv;charset=utf-8;");
    setExcelLoading(false);
  };

  const handlePDF = async () => {
    if (onPdfExport) { onPdfExport(); return; }
    setPdfLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const html = generatePDFHTML(pdfTitle, columns, data);
    const win  = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
      win.focus();
      setTimeout(() => { win.print(); }, 600);
    }
    setPdfLoading(false);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Excel */}
      <button
        onClick={handleExcel}
        disabled={excelLoading || data.length === 0}
        title="Export to Excel"
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {excelLoading
          ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
          : <FileSpreadsheet className="h-3.5 w-3.5" />
        }
        Excel
      </button>

      {/* PDF */}
      <button
        onClick={handlePDF}
        disabled={pdfLoading || data.length === 0}
        title="Export to PDF"
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {pdfLoading
          ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
          : <FileDown className="h-3.5 w-3.5" />
        }
        PDF
      </button>
    </div>
  );
};

export default ExportButtons;