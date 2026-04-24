import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../../components/ui/DataTable";
import { PageHeader } from "../../components/common/PageHeader";
import { TableActions } from "../../components/common/TableActions";
import toast from "react-hot-toast";
import EmployeeRegisterForm from "./components/forms/EmployeeRegisterForm";
import SendEmailModal from "./components/modals/SendEmailModal";

// ✅ ONLY THESE 2 IMPORTS
import {
  downloadEmployeeTemplate,
  uploadEmployeeExcel
} from "../../services/employeeService";

const EmployeeList = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);

  // 🔷 LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(data);
  }, []);

  // 🔍 SEARCH (IMPROVED)
  const filteredData = useMemo(() => {
    return employees.filter((emp) =>
      (emp.first_name + " " + emp.last_name)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (emp.phone || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [employees, searchQuery]);

  // ❌ DELETE
  const handleDelete = (items) => {
    if (!window.confirm("Delete employee?")) return;

    const ids = items.map((item) => item.id);
    const updated = employees.filter((emp) => !ids.includes(emp.id));

    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));

    toast.success("Deleted successfully");
  };

  // 📥 DOWNLOAD EXCEL
  const handleDownloadTemplate = async () => {
    try {
      const blob = await downloadEmployeeTemplate();

      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "employee_template.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Template downloaded");
    } catch (error) {
      console.error(error);
      toast.error("Download failed");
    }
  };

  // 📤 UPLOAD EXCEL
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await uploadEmployeeExcel(file);

      toast.success("Excel uploaded successfully");

      // ⚠️ TEMP FIX (since no GET API)
      window.location.reload();

    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    }
  };

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: "नाव",
        render: (_, row) => (
          <span className="font-medium text-gray-800">
            {row.first_name || "-"} {row.last_name || ""}
          </span>
        ),
      },
      {
        key: "phone",
        header: "मोबाईल",
        render: (_, row) => (
          <span className="text-gray-700">
            {row.phone || <span className="text-gray-400 italic">N/A</span>}
          </span>
        ),
      },
      {
        key: "designation",
        header: "पद",
        render: (_, row) => (
          <span className="text-gray-700">
            {row.designation || <span className="text-gray-400 italic">N/A</span>}
          </span>
        ),
      },
      {
        key: "formCompleted",
        header: "STATUS",
        render: (_, row) => (
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${
              row.formCompleted
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {row.formCompleted ? "Completed" : "Pending"}
          </span>
        ),
      },
      {
        key: "actions",
        header: "ACTIONS",
        render: (_value, row, helpers) => (
          <div className="flex items-center gap-2">

            {/* ✅ FIXED NAVIGATION */}
            <TableActions
              onView={() => navigate(`/masters/employees/view/${row.id}`)}
              onDelete={() => helpers?.onDelete?.([row])}
            />

            {!row.formCompleted && (
              <button
                onClick={() => navigate(`/masters/employees/edit/${row.id}`)}
                className="px-3 py-1 text-xs rounded-full border border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100 transition"
              >
                Complete
              </button>
            )}

            <button
              onClick={() => {
                setSelectedEmployee(row);
                setShowEmailModal(true);
              }}
              className="px-3 py-1 text-xs rounded-full border border-purple-200 text-purple-600 bg-purple-50 hover:bg-purple-100 transition"
            >
              Email
            </button>

          </div>
        ),
      },
    ],
    [navigate]
  );

  return (
    <div className="space-y-6">

      {/* 🔷 HEADER + BUTTONS */}
      <div className="flex justify-between items-center">
        <PageHeader
          title="कर्मचारी यादी"
          description="कर्मचारी व्यवस्थापन"
          actionLabel="नवीन कर्मचारी जोडा"
          onAction={() => setShowRegister(true)}
        />

        <div className="flex gap-2">
          <button
            onClick={handleDownloadTemplate}
            className="px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Download Excel
          </button>

          <label className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
            Import Excel
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* 🔷 TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <DataTable
          columns={columns}
          data={filteredData}
          onSearch={setSearchQuery}
          onDelete={handleDelete}
          rowKey="id"
          showRowNumbers={true}
        />
      </div>

      {/* 🔥 REGISTER MODAL */}
      {showRegister && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowRegister(false)}
        >
          <div
            className="bg-white p-6 rounded-xl w-[600px] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">
              कर्मचारी नोंदणी
            </h2>

            <EmployeeRegisterForm
              onClose={() => setShowRegister(false)}
              onSuccess={() => {
                setShowRegister(false);
                const data = JSON.parse(localStorage.getItem("employees")) || [];
                setEmployees(data);
              }}
            />
          </div>
        </div>
      )}

      {/* 🔥 EMAIL MODAL */}
      {showEmailModal && (
        <SendEmailModal
          employee={selectedEmployee}
          onClose={() => setShowEmailModal(false)}
        />
      )}
    </div>
  );
};

export default EmployeeList;