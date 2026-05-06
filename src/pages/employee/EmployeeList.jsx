import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../../components/ui/DataTable";
import { PageHeader } from "../../components/common/PageHeader";
import { TableActions } from "../../components/common/TableActions";
import toast from "react-hot-toast";
import EmployeeRegisterForm from "./components/forms/EmployeeRegisterForm";
import SendEmailModal from "./components/modals/SendEmailModal";

import {
  downloadEmployeeTemplate,
  uploadEmployeeExcel,
  getEmployees
} from "../../services/employeeService";

const EmployeeList = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);

  // 🔥 LOAD DATA
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(Array.isArray(data) ? data : data.employees || []);
    } catch {
      toast.error("Failed to load employees");
    }
  };

  // 🔍 SEARCH
  const filteredData = useMemo(() => {
    return employees.filter((emp) =>
      `${emp.first_name || ""} ${emp.last_name || ""}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (emp.phone || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [employees, searchQuery]);

  // ❌ DELETE (FIXED user_id)
  const handleDelete = (items) => {
    if (!window.confirm("Delete employee?")) return;

    const ids = items.map((item) => item.user_id);
    const updated = employees.filter((emp) => !ids.includes(emp.user_id));

    setEmployees(updated);
    toast.success("Deleted successfully");
  };

  // 📥 DOWNLOAD
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
    } catch {
      toast.error("Download failed");
    }
  };

  // 📤 UPLOAD
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await uploadEmployeeExcel(file);
      toast.success("Excel uploaded successfully");

      fetchEmployees(); // refresh data
    } catch {
      toast.error("Upload failed");
    }
  };

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: "नाव",
        render: (_, row) => `${row.first_name} ${row.last_name}`,
      },
      {
        key: "phone",
        header: "मोबाईल",
        render: (_, row) => row.phone || "N/A",
      },
      {
        key: "designation",
        header: "पद",
        render: (_, row) => row.designation || "N/A",
      },
      {
        key: "status",
        header: "STATUS",
        render: (_, row) => (
          <span
            className={`px-3 py-1 text-xs rounded-full ${row.current_step > 1
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
              }`}
          >
            {row.current_step > 1 ? "Completed" : "Pending"}
          </span>
        ),
      },
      {
        key: "actions",
        header: "ACTIONS",
        render: (_, row, helpers) => (
          <div className="flex gap-2">

            {/* ✅ FIXED user_id */}
            <TableActions
              onView={() => {
                console.log("✅ VIEW CLICKED", row.user_id);

                navigate(`/employees/view/${row.user_id}`)
              }}
              onDelete={() => helpers?.onDelete?.([row])}
            />

            {row.current_step === 1 && (
              <button
                onClick={() => navigate(`/employees/edit/${row.user_id}`)}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded"
              >
                Complete
              </button>
            )}

            <button
              onClick={() => {
                setSelectedEmployee(row);
                setShowEmailModal(true);
              }}
              className="px-3 py-1 text-xs bg-purple-100 text-purple-600 rounded"
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

      {/* HEADER */}
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
            className="px-3 py-2 bg-green-600 text-white rounded"
          >
            Sampel Excel
          </button>

          <label className="px-3 py-2 bg-blue-600 text-white rounded cursor-pointer">
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

      {/* TABLE */}
      <DataTable
        columns={columns}
        data={filteredData}
        onSearch={setSearchQuery}
        onDelete={handleDelete}
        rowKey="user_id"   // ✅ FIXED
      />

      {/* REGISTER MODAL */}
      {showRegister && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-center items-center"
          onClick={() => setShowRegister(false)}
        >
          <div
            className="bg-white p-6 rounded-xl w-[600px]"
            onClick={(e) => e.stopPropagation()}
          >
            <EmployeeRegisterForm
              onClose={() => setShowRegister(false)}
              onSuccess={(id) => {
                setShowRegister(false);
                navigate(`/masters/employees/edit/${id}`);
              }}
            />
          </div>
        </div>
      )}

      {/* EMAIL MODAL */}
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