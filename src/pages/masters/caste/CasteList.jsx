import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../../components/ui/DataTable';
import { PageHeader } from '../../../components/common/PageHeader';
import { TableActions } from '../../../components/common/TableActions';
import toast from 'react-hot-toast';

const CasteList = () => {
    const navigate = useNavigate();

    const [castes, setCastes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // LOAD
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("castes")) || [];
        setCastes(data);
    }, []);

    // SEARCH
    const filteredData = useMemo(() => {
        return castes.filter(c =>
            c.caste_name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [castes, searchQuery]);

    // DELETE
    const handleDelete = (items) => {
        const ids = items.map(item => item.caste_id);

        const updated = castes.filter(c => !ids.includes(c.caste_id));

        setCastes(updated);
        localStorage.setItem("castes", JSON.stringify(updated));

        toast.success("Deleted successfully");
    };

    const columns = useMemo(
        () => [
            { key: 'caste_code', header: 'Code' },
            { key: 'caste_name', header: 'Name (EN)' },
            { key: 'caste_name_mr', header: 'Name (MR)' },
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
                        onView={() => navigate(`/masters/caste/view/${row.caste_id}`)}
                        onEdit={() => navigate(`/masters/caste/edit/${row.caste_id}`)}
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
                title="Castes"
                description="Manage castes"
                actionLabel="Add Caste"
                onAction={() => navigate('/masters/caste/add')}
            />

            <DataTable
                columns={columns}
                data={filteredData}
                onSearch={setSearchQuery}
                onDelete={handleDelete}
                rowKey="caste_id"
                showRowNumbers={true}
            />
        </div>
    );
};

export default CasteList;