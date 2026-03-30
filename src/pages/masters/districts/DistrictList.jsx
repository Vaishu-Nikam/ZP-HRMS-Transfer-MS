import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../../../components/ui/DataTable";
import { PageHeader } from "../../../components/common/PageHeader";
import { TableActions } from "../../../components/common/TableActions";
import toast from "react-hot-toast";

const DistrictList = () => {
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // 🔥 Load from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("districts")) || [];
    setDistricts(data);
  }, []);

  // 🔥 Search
  const filteredData = useMemo(() => {
    return districts.filter((d) =>
      d.district_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [districts, searchQuery]);

  // 🔥 Delete
  const handleDelete = (items) => {
    const ids = items.map((item) => item.district_id);

    const updated = districts.filter((d) => !ids.includes(d.district_id));

    setDistricts(updated);
    localStorage.setItem("districts", JSON.stringify(updated));

    toast.success("Deleted successfully");
  };

  // 🔥 Columns
  const columns = useMemo(
    () => [
      { key: "district_name", header: "Name (EN)" },
      { key: "district_name_mr", header: "Name (MR)" },
      {
        key: "is_active",
        header: "Status",
        render: (_, row) => (
          <span
            className={`px-2 py-1 text-xs rounded ${
              row.is_active
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {row.is_active ? "Active" : "Inactive"}
          </span>
        ),
      },
      {
        key: "actions",
        header: "Actions",
        render: (_value, row, helpers) => (
          <TableActions
            onView={() =>
              navigate(`/masters/districts/view/${row.district_id}`)
            }
            onEdit={() =>
              navigate(`/masters/districts/edit/${row.district_id}`)
            }
            onDelete={() => helpers?.onDelete?.()}
          />
        ),
      },
    ],
    [navigate]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Districts"
        description="Manage districts"
        actionLabel="Add District"
        onAction={() => navigate("/masters/districts/add")}
      />

      <DataTable
        columns={columns}
        data={filteredData}
        onSearch={setSearchQuery}
        onDelete={handleDelete}
        rowKey="district_id"
        showRowNumbers={true}
      />
    </div>
  );
};

export default DistrictList;