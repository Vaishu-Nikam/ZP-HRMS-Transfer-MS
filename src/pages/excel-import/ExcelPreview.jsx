import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepBar } from "./ExcelUpload";

const COLUMN_MAP = [
  { src: "Name",  dst: "Full name"     },
  { src: "Dept",  dst: "Department"    },
  { src: "Email", dst: "Work email"    },
  { src: "Phone", dst: "Mobile number" },
];

function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export default function ExcelPreview() {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("excelData")) || [];

  const validRows   = data.filter((r) => isValidEmail(r.email));
  const skippedRows = data.length - validRows.length;

  const [imported, setImported] = useState(false);
  const [loading,  setLoading]  = useState(false);

  const handleImport = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("employees", JSON.stringify(validRows));
      setLoading(false);
      setImported(true);
    }, 900);
  };

  /* ── Success screen ── */
  if (imported) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-6">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <StepBar current={4} />
          <div className="px-10 py-16 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="white" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Import successful!</h1>
            <p className="text-sm text-gray-500 mb-8">
              {validRows.length} employee records have been added to the system.
            </p>
            <button
              onClick={() => navigate("/employees")}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-7 py-2.5 rounded-xl transition-colors"
            >
              Go to Employees
              <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Main Review screen ── */
  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

        <StepBar current={3} />

        <div className="px-10 py-9">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Review & confirm import</h1>
          <p className="text-sm text-gray-500 mb-7">
            Check the column mapping and summary before importing.
          </p>

          {/* Stat Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Total rows</p>
              <p className="text-3xl font-semibold text-gray-800">{data.length}</p>
              <p className="text-xs text-gray-400 mt-1">from file</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-xs text-green-600 mb-1">Will be imported</p>
              <p className="text-3xl font-semibold text-green-600">{validRows.length}</p>
              <p className="text-xs text-green-500 mt-1">valid rows</p>
            </div>
            <div className={`rounded-xl p-4 ${skippedRows > 0 ? "bg-red-50" : "bg-gray-50"}`}>
              <p className={`text-xs mb-1 ${skippedRows > 0 ? "text-red-500" : "text-gray-400"}`}>Skipped</p>
              <p className={`text-3xl font-semibold ${skippedRows > 0 ? "text-red-500" : "text-gray-800"}`}>
                {skippedRows}
              </p>
              <p className={`text-xs mt-1 ${skippedRows > 0 ? "text-red-400" : "text-gray-400"}`}>with errors</p>
            </div>
          </div>

          {/* Info Banner */}
          <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-6">
            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-green-700">Column mapping auto-detected</p>
              <p className="text-xs text-green-600 mt-0.5">Review the mapping below and adjust if needed before importing.</p>
            </div>
          </div>

          {/* Column Mapping */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Column mapping</p>
            <div className="space-y-2.5">
              {COLUMN_MAP.map((m) => (
                <div key={m.src} className="flex items-center gap-3">
                  <div className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-400">
                    {m.src}
                  </div>
                  <span className="text-gray-300 text-lg font-light">→</span>
                  <div className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs font-medium text-gray-700">
                    {m.dst}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Table */}
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-7">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Full name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Department</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Work email</th>
                </tr>
              </thead>
              <tbody>
                {validRows.map((r, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-800">{r.name}</td>
                    <td className="px-4 py-3 text-gray-600">{r.dept}</td>
                    <td className="px-4 py-3 text-blue-600 text-xs">{r.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/excel-import/validation")}
              className="px-5 py-2.5 text-sm font-medium text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <div className="flex-1" />
            <button
              onClick={handleImport}
              disabled={loading}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {loading ? "Importing…" : `Import ${validRows.length} records`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}