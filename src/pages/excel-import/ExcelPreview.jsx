import { useNavigate } from "react-router-dom";

export default function ExcelPreview() {
  const navigate = useNavigate();

  const data = JSON.parse(localStorage.getItem("excelData")) || [];

  const handleImport = () => {
    localStorage.setItem("employees", JSON.stringify(data));
    alert("Data Imported!");
    navigate("/employees");
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Preview Data</h2>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Dept</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td className="border p-2">{d.name}</td>
              <td className="border p-2">{d.dept}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleImport}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Import Data
      </button>
    </div>
  );
}