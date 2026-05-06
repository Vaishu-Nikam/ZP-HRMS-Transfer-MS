import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../../components/ui/DataTable';
import { PageHeader } from '../../../components/common/PageHeader';
import { TableActions } from '../../../components/common/TableActions';
import toast from 'react-hot-toast';

// ✅ IMPORT API
import {
    getOffices,
    deleteOffice
} from '../../../services/office.service';

const OfficeList = () => {
    const navigate = useNavigate();

    const [offices, setOffices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // 🔥 FETCH DATA FROM API
    useEffect(() => {
        fetchOffices();
    }, []);

    const fetchOffices = async () => {
        try {
            const data = await getOffices();
            setOffices(Array.isArray(data) ? data : data?.data || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load offices");
        }
    };

    // 🔍 SEARCH
    const filteredData = useMemo(() => {
        return offices.filter(o =>
            (o.office_name || "")
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        );
    }, [offices, searchQuery]);

    // ❌ DELETE (API)
    const handleDelete = async (items) => {
        if (!window.confirm("Delete office?")) return;

        try {
            const ids = items.map(item => item.office_id);

            // delete one by one (API supports single id)
            for (let id of ids) {
                await deleteOffice(id);
            }

            toast.success("Deleted successfully");

            fetchOffices(); // 🔥 refresh list

        } catch (error) {
            console.error(error);
            toast.error("Delete failed");
        }
    };

    const columns = useMemo(() => [
        { key: 'office_code', header: 'Code' },
        { key: 'office_name', header: 'Name (EN)' },
        { key: 'office_name_marathi', header: 'Name (MR)' }, // ✅ FIXED KEY
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
                    onView={() => navigate(`/masters/office/view/${row.office_id}`)}
                    onEdit={() => navigate(`/masters/office/edit/${row.office_id}`)}
                    onDelete={() => helpers?.onDelete?.([row])}
                />
            ),
        },
    ], [navigate]);

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <PageHeader
                title="Offices"
                description="Manage offices"
                actionLabel="Add Office"
                onAction={() => navigate('/masters/office/add')}
            />

            {/* TABLE */}
            <DataTable
                columns={columns}
                data={filteredData}
                onSearch={setSearchQuery}
                onDelete={handleDelete}
                rowKey="office_id"   // ✅ IMPORTANT
                showRowNumbers={true}
            />

        </div>
    );
};

export default OfficeList;