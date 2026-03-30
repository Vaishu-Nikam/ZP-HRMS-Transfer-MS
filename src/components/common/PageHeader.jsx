import React from 'react';
import { Plus } from 'lucide-react';
import { PermissionGuard } from '../auth/PermissionGuard';

export const PageHeader = ({
    title,
    description,
    actionLabel,
    onAction,
    permission,
    extraActions
}) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-white border border-slate-200 rounded-xl px-6 py-4 shadow-sm">
            {/* Left — title + description */}
            <div className="flex items-center gap-3">
                {/* Blue accent bar */}
                <div className="w-1 h-7 bg-blue-700 rounded-full flex-shrink-0" />
                <div>
                    <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-sm text-slate-400 mt-0.5">{description}</p>
                    )}
                </div>
            </div>

            {/* Right — actions */}
            <div className="flex flex-wrap items-center gap-2">
                {extraActions}
                {actionLabel && onAction && (
                    <PermissionGuard permissions={permission} fallback={null}>
                        <button
                            onClick={onAction}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white text-sm font-semibold rounded-lg shadow-md shadow-blue-700/25 transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
                        >
                            <Plus size={16} strokeWidth={2.5} />
                            {actionLabel}
                        </button>
                    </PermissionGuard>
                )}
            </div>
        </div>
    );
};