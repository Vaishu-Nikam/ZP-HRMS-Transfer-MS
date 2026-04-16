import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function StepBar({ current }) {
  const steps = [
    { id: 1, label: "Upload file" },
    { id: 2, label: "Validate" },
    { id: 3, label: "Review & Import" },
  ];

  return (
    <div className="flex items-center px-10 py-5 border-b border-gray-100 bg-white">
      {steps.map((step, i) => {
        const done = step.id < current;
        const active = step.id === current;

        return (
          <div key={step.id} className={`flex items-center ${i < steps.length - 1 ? "flex-1" : ""}`}>
            <div className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                ${done ? "bg-emerald-500 text-white"
                : active ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-400 border border-gray-200"}`}>
                {done ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="white" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : step.id}
              </div>
              <span className={`text-sm font-medium whitespace-nowrap
                ${done ? "text-emerald-600" : active ? "text-gray-900" : "text-gray-400"}`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-px mx-4 ${done ? "bg-emerald-400" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ExcelUpload() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (file) => {
    if (file) setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = () => {
    const data = [
      { name: "Rahul Sharma",   dept: "IT",      email: "rahul@acme.com", phone: "9876543210" },
      { name: "Priya Mehta",    dept: "HR",       email: "priya@acme.com", phone: "9123456789" },
      { name: "Ankit Joshi",    dept: "Finance",  email: "ankit@acme.com", phone: ""           },
      { name: "Sneha Kulkarni", dept: "HR",       email: "sneha@acme.com", phone: "9988776655" },
      { name: "Vikram Patil",   dept: "IT",       email: "vikram@@bad",    phone: "9001122334" },
    ];
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("excelData", JSON.stringify(data));
      navigate("/excel-import/validation");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

        <StepBar current={1} />

        <div className="px-10 py-9">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Import employee data</h1>
          <p className="text-sm text-gray-500 mb-8">
            Upload an Excel or CSV file to bulk-import records into the system.
          </p>

          {/* Drop Zone */}
          <div
            onClick={() => fileInputRef.current.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl py-14 px-6 flex flex-col items-center gap-3 cursor-pointer transition-all duration-200
              ${dragOver
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/50"}`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />

            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6H16a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v8" />
              </svg>
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-gray-800">Drag & drop your file here</p>
              {selectedFile ? (
                <span className="inline-flex items-center gap-2 mt-3 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M9 12h6m-3-3v6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {selectedFile.name} · {(selectedFile.size / 1024).toFixed(0)} KB
                </span>
              ) : (
                <p className="text-sm text-gray-400 mt-1">
                  <span className="text-blue-600 font-medium">Browse to upload</span> — .xlsx, .xls, .csv supported
                </p>
              )}
            </div>
          </div>

          {/* Helper Chips */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            {[
              { label: "Max file size",    value: "10 MB per upload"  },
              { label: "Required columns", value: "Name, Dept, Email" },
              { label: "Encoding",         value: "UTF-8 recommended" },
            ].map((h) => (
              <div key={h.label} className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <p className="text-xs font-semibold text-gray-700">{h.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{h.value}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center mt-8 gap-4">
            <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download template
            </button>
            <div className="flex-1" />
            <button
              onClick={handleUpload}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              {loading ? "Uploading…" : "Upload & Validate"}
              {!loading && (
                <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}