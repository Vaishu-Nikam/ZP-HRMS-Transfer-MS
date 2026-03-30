import api from './api';

// Get wildcard permissions for a role
export const getRoleWildcards = async (roleId) => {
    const response = await api.get(`/admin/roles/${roleId}/wildcards`);
    return response.data.data;
};

// Assign wildcard permission to role
export const assignWildcardToRole = async (roleId, wildcardPattern, description) => {
    const response = await api.post(`/admin/roles/${roleId}/wildcards`, {
        wildcard_pattern: wildcardPattern,
        description
    });
    return response.data.data;
};

// Remove wildcard permission from role
export const removeWildcardFromRole = async (roleId, pattern) => {
    await api.delete(`/admin/roles/${roleId}/wildcards/${encodeURIComponent(pattern)}`);
};

// Get effective permissions for a role (expanded wildcards)
export const getRoleEffectivePermissions = async (roleId) => {
    const response = await api.get(`/admin/roles/${roleId}/effective-permissions`);
    return response.data.data;
};

// Get available wildcard patterns
export const getAvailableWildcardPatterns = async () => {
    const response = await api.get('/admin/wildcard-patterns');
    return response.data.data;
};

// Get current user's permissions
export const getMyPermissions = async () => {
    const response = await api.get('/admin/my-permissions');
    return response.data.data;
};

// Sync permissions from registry (admin only)
export const syncPermissions = async () => {
    const response = await api.post('/admin/permissions/sync');
    return response.data.data;
};

export const getRoles = async (params) => {
    const response = await api.get('/admin/roles', { params });
    return response.data.data;
};

export const getRoleById = async (id) => {
    const response = await api.get(`/admin/roles/${id}`);
    return response.data.data;
};

export const createRole = async (data) => {
    const { permission_ids, wildcards, ...rest } = data;

    // Create the role first
    const response = await api.post('/admin/roles', rest);
    const role = response.data.data;

    // Assign permissions
    if (permission_ids && permission_ids.length > 0) {
        await api.post(`/admin/roles/${role.role_id}/permissions`, { permission_ids });
    }

    // Assign wildcards
    if (wildcards && wildcards.length > 0) {
        for (const pattern of wildcards) {
            await assignWildcardToRole(role.role_id, pattern, 'Assigned on creation');
        }
    }

    return role;
};

export const updateRole = async (id, data) => {
    const { permission_ids, wildcards, ...rest } = data;

    // Update direct permissions if provided (NOTE: uses POST not PUT)
    if (permission_ids !== undefined) {
        await api.post(`/admin/roles/${id}/permissions`, { permission_ids });
    }

    // Handle wildcard permissions
    if (wildcards !== undefined) {
        // Get current wildcards
        const currentWildcards = await getRoleWildcards(id).catch(() => []);
        const currentPatterns = currentWildcards.map(w => w.wildcard_pattern);

        // Remove wildcards that are no longer selected
        for (const pattern of currentPatterns) {
            if (!wildcards.includes(pattern)) {
                await removeWildcardFromRole(id, pattern);
            }
        }

        // Add new wildcards
        for (const pattern of wildcards) {
            if (!currentPatterns.includes(pattern)) {
                await assignWildcardToRole(id, pattern, `Assigned via role form`);
            }
        }
    }

    // Update other role details if there are any
    if (Object.keys(rest).length > 0) {
        // Did not see explicit Update Role endpoint in spec for non-permissions?
        // Spec has "Update Role Permissions". Does it have generic "Update Role"?
        // Spec 3.3 is "Update Role Permissions". 
        // Spec 2.4 is "Update Admin User".
        // Use existing logic but unwrap if needed.
        await api.put(`/admin/roles/${id}`, rest); // Assuming this endpoint exists/works similar to others
    }

    return getRoleById(id);
};

export const deleteRole = async (id) => {
    await api.delete(`/admin/roles/${id}`);
};

export const getAllPermissions = async (module) => {
    const response = await api.get('/admin/permissions', { params: { module } });
    return response.data.data;
};
