import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../../components/ui/DataTable';
import { PageHeader } from '../../../components/common/PageHeader';
import { TableActions } from '../../../components/common/TableActions';
import toast from 'react-hot-toast';

const CadreList = () => {
    const navigate = useNavigate();

    const [cadres, setCadres] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // LOAD
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("cadres")) || [];
        setCadres(data);
    }, []);

    // SEARCH
    const filteredData = useMemo(() => {
        return cadres.filter(c =>
            c.cadre_name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [cadres, searchQuery]);

    // DELETE
    const handleDelete = (items) => {
        const ids = items.map(item => item.cadre_id);

        const updated = cadres.filter(c => !ids.includes(c.cadre_id));

        setCadres(updated);
        localStorage.setItem("cadres", JSON.stringify(updated));

        toast.success("Deleted successfully");
    };

    const columns = useMemo(
        () => [
            { key: 'cadre_code', header: 'Code' },
            { key: 'cadre_name', header: 'Name (EN)' },
            { key: 'cadre_name_mr', header: 'Name (MR)' },
            { key: 'description', header: 'Description' },
            {
                key: 'is_active',
                header: 'Status',
                render: (_, row) => (
                    <span className={`px-2 py-1 text-xs rounded ${
                        row.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
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
                onSearch={setSearchQuery}
                onDelete={handleDelete}
                rowKey="cadre_id"
                showRowNumbers={true}
            />
        </div>
    );
};

export default CadreList;