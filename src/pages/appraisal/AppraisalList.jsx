// src/pages/appraisal/AppraisalList.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { TableActions } from '../../components/common/TableActions';
import { DataTable } from '../../components/ui/DataTable';
import toast from 'react-hot-toast';

const GRADE_STYLE = {
  'Outstanding': 'bg-green-100 text-green-700 border-green-200',
  'Very Good':   'bg-blue-100 text-blue-700 border-blue-200',
  'Good':        'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Average':     'bg-orange-100 text-orange-700 border-orange-200',
  'Poor':        'bg-red-100 text-red-700 border-red-200',
  'Pending':     'bg-gray-100 text-gray-600 border-gray-200',
};

const AppraisalList = () => {
  const navigate = useNavigate();
  const [appraisals, setAppraisals] = useState([]);
  const [employees,  setEmployees]  = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter,  setYearFilter]  = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize,    setPageSize]    = useState(10);

  useEffect(() => {
    setAppraisals(JSON.parse(localStorage.getItem('appraisals')) || []);
    setEmployees(JSON.parse(localStorage.getItem('employees'))   || []);
  }, []);

  const getEmployeeName = (id) => {
    const emp = employees.find(e => String(e.employee_id) === String(id));
    return emp ? `${emp.first_name || ''} ${emp.last_name || ''}`.trim() : '-';
  };

  const years = useMemo(() => {
    const y = [...new Set(appraisals.map(a => a.appraisal_year))].filter(Boolean);
    return y.sort((a, b) => b - a);
  }, [appraisals]);

  const filteredData = useMemo(() => {
    return appraisals.filter(a => {
      const name = getEmployeeName(a.employee_id).toLowerCase();
      const matchSearch = !searchQuery || name.includes(searchQuery.toLowerCase());
      const matchYear   = !yearFilter  || String(a.appraisal_year) === yearFilter;
      return matchSearch && matchYear;
    });
  }, [appraisals, searchQuery, yearFilter, employees]);

  const totalPages  = Math.ceil(filteredData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleDelete = (items) => {
    const ids = items.map(i => i.appraisal_id);
    const updated = appraisals.filter(a => !ids.includes(a.appraisal_id));
    setAppraisals(updated);
    localStorage.setItem('appraisals', JSON.stringify(updated));
    toast.success('हटवले!');
  };

  const columns = useMemo(() => [
    {
      key: 'employee_id',
      header: 'कर्मचारी नाव',
      render: (v) => getEmployeeName(v),
    },
    {
      key: 'appraisal_year',
      header: 'वर्ष',
      render: (v) => `${v}-${Number(v) + 1}`,
    },
    {
      key: 'self_score',
      header: 'Self Score',
      render: (v) => v ? `${v}/100` : '-',
    },
    {
      key: 'reporting_score',
      header: 'Reporting Score',
      render: (v) => v ? `${v}/100` : '-',
    },
    {
      key: 'final_grade',
      header: 'Grade',
      render: (v) => (
        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border
          ${GRADE_STYLE[v || 'Pending']}`}>
          {v || 'Pending'}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'स्थिती',
      render: (v) => (
        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border
          ${v === 'Completed'
            ? 'bg-green-50 text-green-700 border-green-200'
            : v === 'In Progress'
            ? 'bg-blue-50 text-blue-700 border-blue-200'
            : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
          {v || 'Draft'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'कृती',
      render: (_v, row, helpers) => (
        <TableActions
          onView={() => navigate(`view/${row.appraisal_id}`)}
          onEdit={() => navigate(`edit/${row.appraisal_id}`)}
          onDelete={() => helpers?.onDelete?.()}
        />
      ),
    },
  ], [navigate, employees]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="कार्यमूल्यमापन"
        description="वार्षिक कार्यमूल्यमापन अहवाल"
        actionLabel="नवीन APR"
        onAction={() => navigate('add')}
        permission="appraisal.create"
      />

      {/* Year Filter */}
      <div className="flex items-center gap-3">
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          {years.map(y => (
            <button
              key={y}
              onClick={() => setYearFilter(String(y))}
              className={`px-3 py-1.5 text-xs font-medium border-r border-gray-200 last:border-0 transition-all
                ${yearFilter === String(y)
                  ? 'bg-slate-800 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              {y}-{Number(y) + 1}
            </button>
          ))}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={paginatedData}
        onSearch={(val) => { setSearchQuery(val); setCurrentPage(1); }}
        onDelete={handleDelete}
        rowKey="appraisal_id"
        showRowNumbers={true}
        pagination={{
          currentPage,
          totalPages,
          totalItems: filteredData.length,
          pageSize,
          pageSizeOptions: [10, 20, 50],
          onPageChange: setCurrentPage,
          onPageSizeChange: (size) => { setPageSize(size); setCurrentPage(1); },
        }}
      />
    </div>
  );
};

export default AppraisalList;