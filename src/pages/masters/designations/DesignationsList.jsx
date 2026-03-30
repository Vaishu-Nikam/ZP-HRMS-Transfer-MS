import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../../components/ui/DataTable';
import { PageHeader } from '../../../components/common/PageHeader';
import { TableActions } from '../../../components/common/TableActions';
import toast from 'react-hot-toast';

const DesignationList = () => {
    const navigate = useNavigate();

    const [designations, setDesignations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // LOAD
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("designations")) || [];
        setDesignations(data);
    }, []);

    // SEARCH
    const filteredData = useMemo(() => {
        return designations.filter(d =>
            d.designation_name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [designations, searchQuery]);

    // DELETE
    const handleDelete = (items) => {
        const ids = items.map(item => item.designation_id);

        const updated = designations.filter(d => !ids.includes(d.designation_id));

        setDesignations(updated);
        localStorage.setItem("designations", JSON.stringify(updated));

        toast.success("Deleted successfully");
    };

    const columns = useMemo(
        () => [
            { key: 'designation_code', header: 'Code' },
            { key: 'designation_name', header: 'Name (EN)' },
            { key: 'designation_name_mr', header: 'Name (MR)' },
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
                        onView={() => navigate(`/masters/designation/view/${row.designation_id}`)}
                        onEdit={() => navigate(`/masters/designation/edit/${row.designation_id}`)}
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
                title="Designations"
                description="Manage designations"
                actionLabel="Add Designation"
                onAction={() => navigate('/masters/designation/add')}
            />

            <DataTable
                columns={columns}
                data={filteredData}
                onSearch={setSearchQuery}
                onDelete={handleDelete}
                rowKey="designation_id"
                showRowNumbers={true}
            />
        </div>
    );
};

export default DesignationList;