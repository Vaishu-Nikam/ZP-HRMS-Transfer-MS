import { useNavigate } from "react-router-dom";
import { StepBar } from "./ExcelUpload";

const deptColors = {
  IT:      "bg-blue-50 text-blue-700",
  HR:      "bg-purple-50 text-purple-700",
  Finance: "bg-green-50 text-green-700",
};

function validateRow(row) {
  const errors = [];
  const warnings = [];
  if (!row.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email))
    errors.push("Invalid email");
  if (!row.phone)
    warnings.push("Missing phone");
  return { errors, warnings };
}

export default function ExcelValidation() {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("excelData")) || [];

  const rows = data.map((row) => ({ ...row, ...validateRow(row) }));
  const validCount = rows.filter((r) => r.errors.length === 0 && r.warnings.length === 0).length;
  const warnCount  = rows.filter((r) => r.warnings.length > 0 && r.errors.length === 0).length;
  const errCount   = rows.filter((r) => r.errors.length > 0).length;

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

        <StepBar current={2} />

        <div className="px-10 py-9">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Validation results</h1>
          <p className="text-sm text-gray-500 mb-6">
            employees_import.xlsx · {data.length} rows detected
          </p>

          {/* Summary Badges */}
          <div className="flex gap-3 mb-6 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {validCount} valid
            </span>
            <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              {warnCount} warning
            </span>
            <span className="inline-flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-full">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6M9 9l6 6" />
              </svg>
              {errCount} error
            </span>
          </div>

          {/* Table */}
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="w-1 p-0"></th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Dept</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const hasErr  = row.errors.length > 0;
                  const hasWarn = row.warnings.length > 0;
                  const accent  = hasErr ? "bg-red-500" : hasWarn ? "bg-amber-400" : "bg-emerald-500";
                  const dc      = deptColors[row.dept] || "bg-gray-100 text-gray-600";

                  return (
                    <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
                      <td className="p-0 w-1">
                        <div className={`${accent} w-1 h-full min-h-[52px]`} />
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-800">{row.name}</td>
                      <td className="px-4 py-3">
                        <span className={`${dc} text-xs font-semibold px-2.5 py-1 rounded-full`}>
                          {row.dept}
                        </span>
                      </td>
                      <td className={`px-4 py-3 ${hasErr ? "text-red-500 text-xs" : "text-gray-600 text-sm"}`}>
                        {row.email || "—"}
                      </td>
                      <td className="px-4 py-3">
                        {hasErr ? (
                          <span className="flex items-center gap-1.5 text-red-500 text-xs font-medium">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6M9 9l6 6" />
                            </svg>
                            {row.errors[0]}
                          </span>
                        ) : hasWarn ? (
                          <span className="flex items-center gap-1.5 text-amber-600 text-xs font-medium">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round"
                                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                            </svg>
                            {row.warnings[0]}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Valid
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/excel-import")}
              className="px-5 py-2.5 text-sm font-medium text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <div className="flex-1" />
            <button
              onClick={() => navigate("/excel-import/preview")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              Continue with {rows.length - errCount} rows
              <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}