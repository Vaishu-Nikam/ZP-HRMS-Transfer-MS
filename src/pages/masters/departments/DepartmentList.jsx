import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../../components/ui/DataTable';
import { PageHeader } from '../../../components/common/PageHeader';
import { TableActions } from '../../../components/common/TableActions';
import toast from 'react-hot-toast';

// ✅ SERVICES
import {
  getDepartments,
  deleteDepartment
} from '../../../services/department.service';

const DepartmentList = () => {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH DATA
  const fetchDepartments = async () => {
    try {
      setLoading(true);

      const res = await getDepartments();
      console.log("Departments API:", res);

      // ✅ CORRECT RESPONSE HANDLING
      const data = res?.data?.data || res?.data || [];

      const mapped = data.map((item) => {
        const id = item.id || item.department_id;

        return {
          department_id: id,
          department_code: item.code,
          department_name: item.name,
          department_name_mr: item.name_mr,
          description: item.description,
          description_mr: item.description_mr,
          is_active: item.is_active,
        };
      });

      setDepartments(mapped);

    } catch (error) {
      console.error(error);
      toast.error("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 LOAD
  useEffect(() => {
    fetchDepartments();
  }, []);

  // 🔍 SEARCH
  const filteredData = useMemo(() => {
    return departments.filter(d =>
      d.department_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [departments, searchQuery]);

  // 🔥 DELETE (FINAL FIX)
  const handleDelete = async (items) => {
    try {
      if (!items || items.length === 0) {
        toast.error("No department selected");
        return;
      }

      const confirmDelete = window.confirm(
        `Are you sure you want to delete ${items.length} department(s)?`
      );

      if (!confirmDelete) return;

      const ids = items
        .map(item => item.department_id)
        .filter(id => id !== undefined && id !== null);

      console.log("Deleting IDs:", ids);

      if (ids.length === 0) {
        toast.error("Invalid ID. Cannot delete.");
        return;
      }

      // 🔥 CALL DELETE API
      await Promise.all(ids.map(id => deleteDepartment(id)));

      // ✅ REMOVE FROM UI IMMEDIATELY
      setDepartments(prev =>
        prev.filter(d => !ids.includes(d.department_id))
      );

      toast.success(`${ids.length} department(s) deleted`);

      // 🔁 OPTIONAL: REFRESH FROM SERVER (ensures sync)
      fetchDepartments();

    } catch (error) {
      console.error("DELETE ERROR:", error.response || error);

      toast.error(
        error.response?.data?.message ||
        "Delete failed"
      );
    }
  };

  // 📊 COLUMNS
  const columns = useMemo(
    () => [
      { key: 'department_code', header: 'Code' },
      { key: 'department_name', header: 'Name (EN)' },
      { key: 'department_name_mr', header: 'Name (MR)' },
      { key: 'description', header: 'Description' },
      {
        key: 'is_active',
        header: 'Status',
        render: (_, row) => (
          <span className={`px-2 py-1 text-xs rounded ${
            row.is_active
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {row.is_active ? 'Active' : 'Inactive'}
          </span>
        )
      },
      {
        key: 'actions',
        header: 'Actions',
        render: (_value, row, helpers) => (
          <TableActions
            onView={() =>
              navigate(`/masters/departments/view/${row.department_id}`)
            }
            onEdit={() =>
              navigate(`/masters/departments/edit/${row.department_id}`)
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
        title="Departments"
        description="Manage departments"
        actionLabel="Add Department"
        onAction={() => navigate('/masters/departments/add')}
      />

      <DataTable
        columns={columns}
        data={filteredData}
        loading={loading}
        onSearch={setSearchQuery}
        onDelete={handleDelete}
        rowKey="department_id"
        showRowNumbers={true}
      />
    </div>
  );
};

export default DepartmentList;