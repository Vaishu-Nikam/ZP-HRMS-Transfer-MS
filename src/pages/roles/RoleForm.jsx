import React, { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Card } from '../../components/common/Card';
import { Plus, X, Zap, ArrowLeft } from 'lucide-react';
import {
    getAllPermissions,
    getAvailableWildcardPatterns,
    getRoleWildcards
} from '../../services/role.service';

const roleSchema = z.object({
    role_name: z.string().min(2, 'Role Name must be at least 2 characters'),
    role_code: z.string().min(2, 'Role Code must be at least 2 characters').regex(/^[A-Z_]+$/, 'Code must be uppercase with underscores (e.g., ADMIN_USER)'),
    description: z.string().optional(),
    permission_ids: z.array(z.number()),
});

export const RoleForm = ({
    initialData,
    onSubmit,
    isLoading,
    title
}) => {
    const navigate = useNavigate();
    const [permissions, setPermissions] = useState([]);
    const [permsLoading, setPermsLoading] = useState(true);
    const [wildcardPatterns, setWildcardPatterns] = useState([]);
    const [selectedWildcards, setSelectedWildcards] = useState([]);
    const [showWildcardSelector, setShowWildcardSelector] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            role_name: '',
            role_code: '',
            description: '',
            ...initialData,
            permission_ids: initialData?.permissions?.map(p => p.permission_id) || []
        },
    });

    const selectedPermIds = watch('permission_ids');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [permsData, patternsData] = await Promise.all([
                    getAllPermissions(),
                    getAvailableWildcardPatterns().catch(() => [])
                ]);
                setPermissions(permsData);
                setWildcardPatterns(patternsData);

                // If editing, fetch existing wildcards
                if (initialData?.role_id) {
                    const wildcards = await getRoleWildcards(initialData.role_id).catch(() => []);
                    setSelectedWildcards(wildcards.map(w => w.wildcard_pattern));
                }
            } catch (e) {
                console.error("Failed to fetch data", e);
            } finally {
                setPermsLoading(false);
            }
        };
        fetchData();
    }, [initialData?.role_id]);

    // Group permissions by module
    const groupedPermissions = useMemo(() => {
        const groups = {};
        permissions.forEach(p => {
            if (!groups[p.module]) groups[p.module] = [];
            groups[p.module].push(p);
        });
        return groups;
    }, [permissions]);

    const togglePermission = (id) => {
        const current = selectedPermIds || [];
        if (current.includes(id)) {
            setValue('permission_ids', current.filter(pid => pid !== id));
        } else {
            setValue('permission_ids', [...current, id]);
        }
    };

    const handleSelectAllModule = (module, select) => {
        const modulePermIds = groupedPermissions[module].map(p => p.permission_id);
        const current = new Set(selectedPermIds);

        if (select) {
            modulePermIds.forEach(id => current.add(id));
        } else {
            modulePermIds.forEach(id => current.delete(id));
        }
        setValue('permission_ids', Array.from(current));
    };

    const toggleWildcard = (pattern) => {
        if (selectedWildcards.includes(pattern)) {
            setSelectedWildcards(selectedWildcards.filter(p => p !== pattern));
        } else {
            setSelectedWildcards([...selectedWildcards, pattern]);
        }
    };

    const handleFormSubmit = (data) => {
        // Include wildcards in submission
        onSubmit({
            ...data,
            wildcards: selectedWildcards
        });
    };

    // Check if a module is covered by a wildcard
    const isModuleCoveredByWildcard = (module) => {
        return selectedWildcards.includes('*') ||
            selectedWildcards.includes(`${module}.*`);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header with Back Button */}
            <div className="flex items-center gap-4 ml-[-10px]">
                <Button
                    onClick={() => navigate('/roles')}
                    variant="ghost"
                    leftIcon={<ArrowLeft className="h-5 w-5" />}
                />
                <div>
                    <h1 className="text-xl font-bold text-slate-900">{title}</h1>
                </div>
            </div>

            <Card>
                <form onSubmit={handleSubmit(data => onSubmit(data, selectedWildcards))} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Role Name"
                        placeholder="District Administrator"
                        error={errors.role_name?.message}
                        {...register('role_name')}
                        disabled={initialData?.is_system_role}
                    />

                    <Input
                        label="Role Code"
                        placeholder="DISTRICT_ADMIN"
                        error={errors.role_code?.message}
                        {...register('role_code')}
                        disabled={initialData?.is_system_role}
                    />

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <textarea
                            {...register('description')}
                            className="flex min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Description of the role..."
                        />
                    </div>
                </div>

                {/* Wildcard Permissions Section */}
                <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="text-lg font-medium text-slate-900 flex items-center gap-2">
                                <Zap className="h-5 w-5 text-yellow-500" />
                                Wildcard Permissions
                            </h3>
                            <p className="text-sm text-slate-500">
                                Assign broad access patterns instead of individual permissions
                            </p>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setShowWildcardSelector(!showWildcardSelector)}
                        >
                            {showWildcardSelector ? 'Hide' : 'Add Wildcard'}
                        </Button>
                    </div>

                    {/* Selected Wildcards */}
                    {selectedWildcards.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {selectedWildcards.map(pattern => (
                                <span
                                    key={pattern}
                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"
                                >
                                    {pattern}
                                    <button
                                        type="button"
                                        onClick={() => toggleWildcard(pattern)}
                                        className="hover:text-yellow-900"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Wildcard Selector */}
                    {showWildcardSelector && (
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                            <h4 className="font-medium text-slate-700 mb-3">Available Patterns</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                {wildcardPatterns.map(wp => (
                                    <label
                                        key={wp.pattern}
                                        className={`flex items-start gap-2 p-2 rounded cursor-pointer hover:bg-yellow-100 ${selectedWildcards.includes(wp.pattern) ? 'bg-yellow-100' : ''
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedWildcards.includes(wp.pattern)}
                                            onChange={() => toggleWildcard(wp.pattern)}
                                            className="mt-1 rounded border-slate-300 text-yellow-600 focus:ring-yellow-500"
                                        />
                                        <div>
                                            <span className="text-sm font-mono font-medium text-slate-900">{wp.pattern}</span>
                                            <span className="text-xs text-slate-500 block">{wp.description}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Individual Permissions Section */}
                <div className="border-t pt-4">
                    <h3 className="text-lg font-medium text-slate-900 mb-4">Individual Permissions</h3>
                    <p className="text-sm text-slate-500 mb-4">
                        Select specific permissions. Modules covered by wildcards are highlighted.
                    </p>

                    {permsLoading ? (
                        <p>Loading permissions...</p>
                    ) : (
                        <div className="space-y-6">
                            {Object.entries(groupedPermissions).map(([module, perms]) => {
                                const isCovered = isModuleCoveredByWildcard(module);
                                return (
                                    <div
                                        key={module}
                                        className={`p-4 rounded-lg border ${isCovered
                                                ? 'bg-green-50 border-green-200'
                                                : 'bg-slate-50 border-slate-200'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold text-slate-700 capitalize">
                                                    {module} Management
                                                </h4>
                                                {isCovered && (
                                                    <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded">
                                                        Covered by wildcard
                                                    </span>
                                                )}
                                            </div>
                                            {!isCovered && (
                                                <div className="text-xs space-x-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSelectAllModule(module, true)}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        Select All
                                                    </button>
                                                    <span className="text-slate-300">|</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSelectAllModule(module, false)}
                                                        className="text-slate-500 hover:underline"
                                                    >
                                                        Clear
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {perms.map(perm => (
                                                <label
                                                    key={perm.permission_id}
                                                    className={`flex items-start gap-2 cursor-pointer ${isCovered ? 'opacity-50' : ''
                                                        }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={isCovered || selectedPermIds?.includes(perm.permission_id)}
                                                        onChange={() => !isCovered && togglePermission(perm.permission_id)}
                                                        disabled={isCovered}
                                                        className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <div>
                                                        <span className="text-sm font-medium text-slate-900 block">
                                                            {perm.permission_name}
                                                        </span>
                                                        <span className="text-xs text-slate-500 font-mono">
                                                            {perm.permission_code}
                                                        </span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/roles')}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={isLoading}>
                        Save Role
                    </Button>
                </div>
            </form>
        </Card>
        </div>
    );
};
