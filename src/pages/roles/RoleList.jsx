import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../components/ui/DataTable';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { getRoles, deleteRole } from '../../services/role.service';
import { PermissionGuard } from '../../components/auth/PermissionGuard';

const RoleList = () => {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  // server-side pagination + search state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');

  const fetchRoles = async (pageArg = page, pageSizeArg = pageSize, searchArg = search) => {
    setLoading(true);
    try {
      const { roles, pagination } = await getRoles({
        page: pageArg,
        limit: pageSizeArg,
        search: searchArg || undefined,
      });

      // Transform roles data - only keep what the DataTable needs
      const transformedRoles = roles.map(role => ({
        role_id: role.role_id,
        role_name: role.role_name,
        role_code: role.role_code,
        description: role.description || '',
        is_system_role: role.is_system_role,
      }));

      console.log('API Response:', {
        page: pageArg,
        limit: pageSizeArg,
        receivedPage: pagination.page,
        receivedTotal: pagination.total,
        receivedTotalPages: pagination.totalPages,
        rolesCount: transformedRoles.length
      });

      setRoles(transformedRoles);
      // DO NOT set page here - it's already set by the user interaction
      // setPage(pagination.page); // REMOVE THIS LINE
      setPageSize(pagination.limit);
      setTotalPages(pagination.totalPages);
      setTotal(pagination.total);
    } catch (error) {
      console.error('Failed to fetch roles', error);
    } finally {
      setLoading(false);
    }
  };

  // initial load & reload on page / pageSize / search change
  React.useEffect(() => {
    fetchRoles(page, pageSize, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, search]);

  const handleDelete = async (items) => {
    if (confirm(`Are you sure you want to delete ${items.length} roles?`)) {
      try {
        await Promise.all(items.map((r) => deleteRole(r.role_id)));
        // stay on same page after delete
        fetchRoles(page, pageSize, search);
      } catch (error) {
        console.error('Delete failed', error);
      }
    }
  };

  const handleSearch = useCallback((value) => {
    // Avoid resetting page if the search string hasn't changed (prevents flicker/reset)
    if (value === search) return;
    setPage(1);
    setSearch(value);
  }, [search]);

  const columns = useMemo(
    () => [
      { key: 'role_name', header: 'Role Name', sortable: true },
      { key: 'role_code', header: 'Code', sortable: true },
      { key: 'description', header: 'Description' },
      {
        key: 'role_id',
        header: 'Actions',
        className: 'text-center',
        render: (_, role) => (
          <div className="flex items-center justify-center gap-2">
            <PermissionGuard permissions="roles.edit">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/roles/edit/${role.role_id}`)}
                className="text-blue-600 hover:text-blue-900"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </PermissionGuard>
            <PermissionGuard permissions="roles.delete">
              {!role.is_system_role && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete([role])}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </PermissionGuard>
          </div>
        ),
      },
    ],
    [navigate]
  );

  // Add a debug log to see what's happening
  console.log('Component state:', { page, pageSize, totalPages, total, rolesCount: roles.length });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Role Management"
        description="Manage roles and permissions"
        actionLabel="Add Role"
        onAction={() => navigate('/roles/add')}
        permission="roles.create"
      />

      <DataTable
        columns={columns}
        data={roles}
        isLoading={loading}
        // search from DataTable -> update our search state (DataTable already debounces)
        onSearch={handleSearch}
        onDelete={handleDelete}
        pagination={{
          currentPage: page,
          totalPages,
          pageSize,
          total,
          pageSizeOptions: [10, 20, 50],
          onPageChange: (newPage) => {
            console.log('Page changed to:', newPage);
            setPage(newPage);
          },
          onPageSizeChange: (newSize) => {
            console.log('Page size changed to:', newSize);
            setPageSize(newSize);
            setPage(1); // reset to first page when page size changes
          },
        }}
        rowKey="role_id"
        headerClassName="bg-slate-900 text-white"
        showRowNumbers={true}
      />
    </div>
  );
};

export default RoleList;