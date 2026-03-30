import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../../components/ui/DataTable';
import { PageHeader } from '../../../components/common/PageHeader';
import { TableActions } from '../../../components/common/TableActions';
import toast from 'react-hot-toast';

const OfficeList = () => {
    const navigate = useNavigate();

    const [offices, setOffices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("offices")) || [];
        setOffices(data);
    }, []);

    const filteredData = useMemo(() => {
        return offices.filter(o =>
            o.office_name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [offices, searchQuery]);

    const handleDelete = (items) => {
        const ids = items.map(item => item.office_id);

        const updated = offices.filter(o => !ids.includes(o.office_id));

        setOffices(updated);
        localStorage.setItem("offices", JSON.stringify(updated));

        toast.success("Deleted successfully");
    };

    const columns = useMemo(() => [
        { key: 'office_code', header: 'Code' },
        { key: 'office_name', header: 'Name (EN)' },
        { key: 'office_name_mr', header: 'Name (MR)' },
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
                    onView={() => navigate(`/masters/office/view/${row.office_id}`)}
                    onEdit={() => navigate(`/masters/office/edit/${row.office_id}`)}
                    onDelete={() => helpers?.onDelete?.()}
                />
            ),
        },
    ], [navigate]);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Offices"
                description="Manage offices"
                actionLabel="Add Office"
                onAction={() => navigate('/masters/office/add')}
            />

            <DataTable
                columns={columns}
                data={filteredData}
                onSearch={setSearchQuery}
                onDelete={handleDelete}
                rowKey="office_id"
                showRowNumbers={true}
            />
        </div>
    );
};

export default OfficeList;