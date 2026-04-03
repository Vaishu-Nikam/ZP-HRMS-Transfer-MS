import { useNavigate } from "react-router-dom";

export default function ExcelUpload() {
  const navigate = useNavigate();

  const handleUpload = () => {
    const data = [
      { name: "Rahul", dept: "IT" },
      { name: "Priya", dept: "HR" }
    ];

    localStorage.setItem("excelData", JSON.stringify(data));

    navigate("/excel-import/validation");
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Excel</h2>

      <input type="file" className="mb-4" />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload & Next
      </button>
    </div>
  );
}