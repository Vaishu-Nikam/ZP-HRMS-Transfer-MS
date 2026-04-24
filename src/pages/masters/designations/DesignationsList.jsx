import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../../components/ui/DataTable';
import { PageHeader } from '../../../components/common/PageHeader';
import { TableActions } from '../../../components/common/TableActions';
import toast from 'react-hot-toast';

// ✅ SERVICES
import {
  getPosts,
  deletePost
} from '../../../services/post.service';

const DesignationList = () => {
  const navigate = useNavigate();

  const [designations, setDesignations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // ================= FETCH =================
  const fetchDesignations = async () => {
    try {
      setLoading(true);

      const data = await getPosts(); // ✅ already array
      console.log("Posts:", data);

      const mapped = (data || []).map((item) => ({
        designation_id: item.id || item.post_id,
        department_id: item.department_id,
        designation: item.designation,
        total_positions: item.total_positions
      }));

      setDesignations(mapped);

    } catch (error) {
      console.error(error);
      toast.error("Failed to load designations");
    } finally {
      setLoading(false);
    }
  };

  // ================= LOAD =================
  useEffect(() => {
    fetchDesignations();
  }, []);

  // ================= SEARCH =================
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return designations;

    return designations.filter((d) =>
      d.designation?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [designations, searchQuery]);

  // ================= DELETE =================
  const handleDelete = async (items) => {
    try {
      if (!items?.length) {
        toast.error("No designation selected");
        return;
      }

      const confirmDelete = window.confirm(
        `Delete ${items.length} designation(s)?`
      );
      if (!confirmDelete) return;

      const ids = items.map(i => i.designation_id).filter(Boolean);

      await Promise.all(ids.map(id => deletePost(id)));

      // ✅ Optimistic UI update
      setDesignations(prev =>
        prev.filter(d => !ids.includes(d.designation_id))
      );

      toast.success("Deleted successfully");

    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  // ================= COLUMNS =================
  const columns = useMemo(() => [
    { key: 'designation_id', header: 'ID' },
    { key: 'department_id', header: 'Department ID' },
    { key: 'designation', header: 'Designation' },
    { key: 'total_positions', header: 'Total Positions' },
    {
      key: 'actions',
      header: 'Actions',
      render: (_value, row, helpers) => (
        <TableActions
          onView={() =>
            navigate(`/masters/designation/view/${row.designation_id}`)
          }
          onEdit={() =>
            navigate(`/masters/designation/edit/${row.designation_id}`)
          }
          onDelete={() => helpers?.onDelete?.()}
        />
      ),
    },
  ], [navigate]);

  // ================= UI =================
  return (
    <div className="space-y-6">
      <PageHeader
        title="Designations"
        description="Manage designations"
        actionLabel="Add Designation"
        onAction={() => navigate('/masters/designation/add')}
      />

      <DataTable
        columns={columns}
        data={filteredData}
        loading={loading}
        onSearch={setSearchQuery}
        onDelete={handleDelete}
        rowKey="designation_id"
        showRowNumbers
      />
    </div>
  );
};

export default DesignationList;