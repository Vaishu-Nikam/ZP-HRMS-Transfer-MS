import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../../components/ui/DataTable';
import { PageHeader } from '../../../components/common/PageHeader';
import { TableActions } from '../../../components/common/TableActions';
import toast from 'react-hot-toast';

// ✅ API
import {
  getCadres,
  deleteCadre
} from '../../../services/cadre.service';

const CadreList = () => {
  const navigate = useNavigate();

  const [cadres, setCadres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔥 LOAD DATA FROM API
  const fetchCadres = async () => {
    try {
      setLoading(true);

      const res = await getCadres();
      console.log("CADRE API RESPONSE:", res);

      // ✅ CORRECT DATA EXTRACTION
      const data = res?.cadre || [];

      setCadres(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error(error);
      toast.error("Failed to load cadres");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCadres();
  }, []);

  // 🔍 SEARCH
  const filteredData = useMemo(() => {
    if (!Array.isArray(cadres)) return [];

    return cadres.filter(c =>
      (c?.cadre_name || '')
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [cadres, searchQuery]);

  // 🗑 DELETE
  const handleDelete = async (items) => {
    try {
      const ids = items.map(item => item.cadre_id);

      for (let id of ids) {
        await deleteCadre(id);
      }

      toast.success("Deleted successfully");
      fetchCadres(); // refresh list

    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  const columns = useMemo(
    () => [
      { key: 'department_id', header: 'Department ID' },
      { key: 'cadre_name', header: 'Name (EN)' },
      { key: 'cadre_name_mr', header: 'Name (MR)' },
      { key: 'cadre_group', header: 'Group' },
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
            onView={() => navigate(`/masters/cadre/view/${row.cadre_id}`)}
            onEdit={() => navigate(`/masters/cadre/edit/${row.cadre_id}`)}
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
        title="Cadres"
        description="Manage cadres"
        actionLabel="Add Cadre"
        onAction={() => navigate('/masters/cadre/add')}
      />

      <DataTable
        columns={columns}
        data={filteredData}
        loading={loading}
        onSearch={setSearchQuery}
        onDelete={handleDelete}
        rowKey="cadre_id"   // ✅ IMPORTANT
        showRowNumbers={true}
      />
    </div>
  );
};

export default CadreList;