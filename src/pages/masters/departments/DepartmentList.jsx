import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../../components/ui/DataTable';
import { PageHeader } from '../../../components/common/PageHeader';
import { TableActions } from '../../../components/common/TableActions';
import toast from 'react-hot-toast';

import {
  getDepartments,
  deleteDepartment
} from '../../../services/department.service';

const DepartmentList = () => {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // ================= FETCH =================
  const fetchDepartments = async () => {
    try {
      setLoading(true);

      const data = await getDepartments(); // ✅ already array
      console.log("Departments:", data);

      const mapped = (data || []).map((item) => ({
        department_id: item.id || item.department_id,
        department_code: item.code || '',
        department_name: item.name || '',
        department_name_mr: item.name_mr || '',
        description: item.description || '',
        description_mr: item.description_mr || '',
        is_active: item.is_active ?? true
      }));

      setDepartments(mapped);

    } catch (error) {
      console.error(error);
      toast.error("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // ================= SEARCH =================
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return departments;

    return departments.filter((d) =>
      d.department_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [departments, searchQuery]);

  // ================= DELETE =================
  const handleDelete = async (items) => {
    try {
      if (!items?.length) {
        toast.error("No department selected");
        return;
      }

      const confirmDelete = window.confirm(
        `Delete ${items.length} department(s)?`
      );
      if (!confirmDelete) return;

      const ids = items.map(i => i.department_id).filter(Boolean);

      await Promise.all(ids.map(id => deleteDepartment(id)));

      setDepartments(prev =>
        prev.filter(d => !ids.includes(d.department_id))
      );

      toast.success("Deleted successfully");

    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  // ================= COLUMNS =================
  const columns = useMemo(() => [
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
      render: (_v, row, helpers) => (
        <TableActions
          onView={() => navigate(`/masters/departments/view/${row.department_id}`)}
          onEdit={() => navigate(`/masters/departments/edit/${row.department_id}`)}
          onDelete={() => helpers?.onDelete?.()}
        />
      )
    }
  ], [navigate]);

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
        showRowNumbers
      />
    </div>
  );
};

export default DepartmentList;