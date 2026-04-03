import { useNavigate } from "react-router-dom";

export default function ExcelValidation() {
  const navigate = useNavigate();

  const data = JSON.parse(localStorage.getItem("excelData")) || [];

  const hasError = false; // demo साठी

  return (
    <div className="p-6 bg-white rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Validation</h2>

      {hasError ? (
        <div className="text-red-500">
          ❌ Errors found in file
        </div>
      ) : (
        <div className="text-green-600">
          ✅ No Errors Found
        </div>
      )}

      <button
        onClick={() => navigate("/excel-import/preview")}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  );
}