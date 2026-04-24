import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../../components/ui/DataTable";
import { PageHeader } from "../../components/common/PageHeader";
import { TableActions } from "../../components/common/TableActions";
import toast from "react-hot-toast";
import EmployeeRegisterForm from "./components/forms/EmployeeRegisterForm";
import SendEmailModal from "./components/modals/SendEmailModal";
import { getEmployees } from "../../services/employeeService";

const EmployeeList = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(Array.isArray(data) ? data : data.employees || []);
    } catch (error) {
      toast.error("Failed to load employees");
    }
  };

  const filteredData = useMemo(() => {
    return employees.filter((emp) =>
      (emp.first_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (emp.phone || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [employees, searchQuery]);

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
        key: "status",
        header: "STATUS",
        render: (_, row) => (
          <span className={`px-3 py-1 text-xs rounded-full ${
            row.current_step > 1
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}>
            {row.current_step > 1 ? "Completed" : "Pending"}
          </span>
        ),
      },
      {
        key: "actions",
        header: "ACTIONS",
        render: (_, row) => (
          <div className="flex gap-2">

            <TableActions
              onView={() => navigate(`view/${row.user_id}`)}
            />

            {row.current_step === 1 && (
              <button
                onClick={() => navigate(`edit/${row.user_id}`)}
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

      <PageHeader
        title="कर्मचारी यादी"
        actionLabel="नवीन कर्मचारी जोडा"
        onAction={() => setShowRegister(true)}
      />

      <DataTable
        columns={columns}
        data={filteredData}
        onSearch={setSearchQuery}
        rowKey="user_id"
      />

      {/* REGISTER MODAL */}
      {showRegister && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-[600px]">

            <EmployeeRegisterForm
              onClose={() => setShowRegister(false)}
              onSuccess={(empId) => {
                setShowRegister(false);

                // 🔥 STEP1 ला redirect
                navigate(`/employee/edit/${empId}`);
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