// src/pages/employees/EmployeeList.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../components/ui/DataTable';
import { PageHeader } from '../../components/common/PageHeader';
import { TableActions } from '../../components/common/TableActions';
import toast from 'react-hot-toast';

const EmployeeList = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(data);
  }, []);

  const filteredData = useMemo(() => {
    return employees.filter(e => {
      const fullName = `${e.first_name || ''} ${e.middle_name || ''} ${e.last_name || ''}`.toLowerCase();
      return (
        fullName.includes(searchQuery.toLowerCase()) ||
        e.employee_code?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [employees, searchQuery]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleDelete = (items) => {
    const ids = items.map(i => i.employee_id);
    const updated = employees.filter(e => !ids.includes(e.employee_id));
    setEmployees(updated);
    localStorage.setItem('employees', JSON.stringify(updated));
    toast.success('कर्मचारी यशस्वीरीत्या हटवला!');
  };

  const columns = useMemo(() => [
    {
      key: 'employee_code',
      header: 'कर्मचारी कोड',
      sortable: true,
    },
    {
      key: 'full_name',
      header: 'पूर्ण नाव',
      render: (_v, row) => {
        const name = `${row.first_name || ''} ${row.middle_name || ''} ${row.last_name || ''}`.trim();
        return name || '-';
      },
    },
    {
      key: 'full_name_mr',
      header: 'पूर्ण नाव (मराठी)',
      render: (_v, row) => row.full_name_mr || '-',
    },
    {
      key: 'gender',
      header: 'लिंग',
      render: (v) => v || '-',
    },
    {
      key: 'mobile',
      header: 'मोबाईल',
      render: (v) => v ? `+91 ${v}` : '-',
    },
    {
      key: 'category',
      header: 'प्रवर्ग',
      render: (v) => v ? (
        <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
          {v}
        </span>
      ) : '-',
    },
    {
      key: 'govt_joining_date',
      header: 'सेवेत रुजू दिनांक',
      render: (v) => v ? new Date(v).toLocaleDateString('mr-IN') : '-',
    },
    {
      key: 'retirement_date',
      header: 'सेवानिवृत्ती दिनांक',
      render: (v) => v ? new Date(v).toLocaleDateString('mr-IN') : '-',
    },
    {
      key: 'actions',
      header: 'कृती',
      render: (_v, row, helpers) => (
        <TableActions
          onView={() => navigate(`view/${row.employee_id}`)}
          onEdit={() => navigate(`edit/${row.employee_id}`)}
          onDelete={() => helpers?.onDelete?.()}
        />
      ),
    },
  ], [navigate]);

  return (
    <div className="space-y-6">

      <PageHeader
        title="कर्मचारी"
        description="सर्व कर्मचाऱ्यांची माहिती व्यवस्थापित करा"
        actionLabel="नवीन कर्मचारी"
        onAction={() => navigate('add')}
        permission="employees.create"
      />

      <DataTable
        columns={columns}
        data={paginatedData}
        onSearch={(val) => {
          setSearchQuery(val);
          setCurrentPage(1);
        }}
        onDelete={handleDelete}
        rowKey="employee_id"
        showRowNumbers={true}
        pagination={{
          currentPage,
          totalPages,
          totalItems,
          pageSize,
          pageSizeOptions: [5, 10, 20],
          onPageChange: setCurrentPage,
          onPageSizeChange: (size) => {
            setPageSize(size);
            setCurrentPage(1);
          },
        }}
      />

    </div>
  );
};

export default EmployeeList;