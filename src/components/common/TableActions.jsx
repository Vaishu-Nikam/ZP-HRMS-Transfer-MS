import React from 'react';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { Button } from './Button';
import { PermissionGuard } from '../auth/PermissionGuard';

export const TableActions = ({
    onView,
    onEdit,
    onDelete,
    viewPermission,
    editPermission,
    deletePermission,
    customActions
}) => {
    return (
        <div className="flex items-center gap-2">
            {customActions}

            {onView && (
                <PermissionGuard permissions={viewPermission} fallback={null}>
                    <Button
                        onClick={onView}
                        title="View"
                        className="w-9 h-9 p-0 rounded-xl bg-white border border-slate-200 text-slate-500 
                        hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 
                        active:scale-95 transition-all duration-150 shadow-sm"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                </PermissionGuard>
            )}

            {onEdit && (
                <PermissionGuard permissions={editPermission} fallback={null}>
                    <Button
                        onClick={onEdit}
                        title="Edit"
                        className="w-9 h-9 p-0 rounded-xl bg-white border border-slate-200 text-slate-500 
                        hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 
                        active:scale-95 transition-all duration-150 shadow-sm"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                </PermissionGuard>
            )}

            {onDelete && (
                <PermissionGuard permissions={deletePermission} fallback={null}>
                    <Button
                        onClick={onDelete}
                        title="Delete"
                        className="w-9 h-9 p-0 rounded-xl bg-white border border-slate-200 text-slate-500 
                        hover:bg-red-50 hover:text-red-600 hover:border-red-200 
                        active:scale-95 transition-all duration-150 shadow-sm"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </PermissionGuard>
            )}
        </div>
    );
};