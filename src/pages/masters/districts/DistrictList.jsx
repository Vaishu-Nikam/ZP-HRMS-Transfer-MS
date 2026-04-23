import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../../../components/ui/DataTable";
import { PageHeader } from "../../../components/common/PageHeader";
import { TableActions } from "../../../components/common/TableActions";
import toast from "react-hot-toast";

// ✅ SERVICES
import {
  getDistricts,
  deleteDistrict,
} from "../../../services/district.service";

const DistrictList = () => {
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH DATA
  const fetchDistricts = async () => {
    try {
      setLoading(true);

      const res = await getDistricts();
      console.log("District API:", res);

      // ✅ HANDLE RESPONSE
      const data = res?.data?.data || res?.data || [];

      // ✅ MAP BACKEND → UI
      const mapped = data.map((item) => {
        const id = item.id || item.district_id;

        return {
          district_id: id,
          district_name: item.name,
          district_name_mr: item.name_mr,
          is_active: item.is_active,
        };
      });

      setDistricts(mapped);

    } catch (error) {
      console.error(error);
      toast.error("Failed to load districts");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 LOAD
  useEffect(() => {
    fetchDistricts();
  }, []);

  // 🔍 SEARCH
  const filteredData = useMemo(() => {
    return districts.filter((d) =>
      d.district_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [districts, searchQuery]);

  // 🔥 DELETE (SINGLE + MULTI)
  const handleDelete = async (items) => {
    try {
      if (!items || items.length === 0) {
        toast.error("No district selected");
        return;
      }

      const confirmDelete = window.confirm(
        `Delete ${items.length} district(s)?`
      );
      if (!confirmDelete) return;

      const ids = items
        .map((item) => item.district_id)
        .filter((id) => id !== undefined && id !== null);

      console.log("Deleting IDs:", ids);

      if (ids.length === 0) {
        toast.error("Invalid ID");
        return;
      }

      // 🔥 CALL DELETE API
      await Promise.all(ids.map((id) => deleteDistrict(id)));

      // ✅ UPDATE UI IMMEDIATELY
      setDistricts((prev) =>
        prev.filter((d) => !ids.includes(d.district_id))
      );

      toast.success("Deleted successfully");

      // 🔁 OPTIONAL REFRESH (ensures sync)
      fetchDistricts();

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Delete failed"
      );
    }
  };

  // 📊 COLUMNS
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
        loading={loading}
        onSearch={setSearchQuery}
        onDelete={handleDelete}
        rowKey="district_id"
        showRowNumbers={true}
      />
    </div>
  );
};

export default DistrictList;