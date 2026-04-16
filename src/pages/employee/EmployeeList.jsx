import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../../components/ui/DataTable";
import { PageHeader } from "../../components/common/PageHeader";
import { TableActions } from "../../components/common/TableActions";
import toast from "react-hot-toast";

const EmployeeList = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(data);
  }, []);

  // 🔍 SEARCH
  const filteredData = useMemo(() => {
    return employees.filter((emp) =>
      (emp.name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [employees, searchQuery]);

  // ❌ DELETE
  const handleDelete = (items) => {
    const ids = items.map((item) => item.id);

    const updated = employees.filter((emp) => !ids.includes(emp.id));

    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));

    toast.success("Deleted successfully");
  };

  // 📊 COLUMNS
  const columns = useMemo(
    () => [
      { key: "name", header: "नाव" },
      { key: "mobile", header: "मोबाईल" },
      { key: "designation", header: "पद" },

      {
        key: "actions",
        header: "Actions",
        render: (_value, row, helpers) => (
          <TableActions
            onView={() => navigate(`view/${row.id}`)}   // ✅ FIXED
            onEdit={() => navigate(`edit/${row.id}`)}   // ✅ FIXED
            onDelete={() => helpers?.onDelete?.()}
          />
        ),
      },
    ],
    [navigate]
  );

  return (
    <div className="space-y-6">

      {/* 🔷 Header */}
      <PageHeader
        title="कर्मचारी यादी"
        description="कर्मचारी व्यवस्थापन"
        actionLabel="नवीन कर्मचारी जोडा"
        onAction={() => navigate("add")}   // ✅ FIXED
      />


      <DataTable
        columns={columns}
        data={filteredData}
        onSearch={setSearchQuery}
        onDelete={handleDelete}
        rowKey="id"
        showRowNumbers={true}
      />
    </div>
  );
};

export default EmployeeList;