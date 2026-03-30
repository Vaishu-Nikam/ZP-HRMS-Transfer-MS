import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../../components/ui/DataTable';
import { PageHeader } from '../../../components/common/PageHeader';
import { TableActions } from '../../../components/common/TableActions';
import toast from 'react-hot-toast';

const DepartmentList = () => {
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // LOAD
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("departments")) || [];
        setDepartments(data);
    }, []);

    // SEARCH
    const filteredData = useMemo(() => {
        return departments.filter(d =>
            d.department_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [departments, searchQuery]);

    // DELETE
    const handleDelete = (items) => {
        const ids = items.map(item => item.department_id);

        const updated = departments.filter(d => !ids.includes(d.department_id));

        setDepartments(updated);
        localStorage.setItem("departments", JSON.stringify(updated));

        toast.success("Deleted successfully");
    };

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
                        onView={() => navigate(`/masters/departments/view/${row.department_id}`)}
                        onEdit={() => navigate(`/masters/departments/edit/${row.department_id}`)}
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
                onSearch={setSearchQuery}
                onDelete={handleDelete}
                rowKey="department_id"
                showRowNumbers={true}
            />
        </div>
    );
};

export default DepartmentList;