import { useAppSelector } from '../redux/store';

/**
 * Permission hook with wildcard support
 * Supports:
 *   - Exact match: 'users.view'
 *   - Wildcard patterns in user permissions: 'users.*', '*.view', '*'
 */
export const usePermission = () => {
    const { user } = useAppSelector((state) => state.auth);

    /**
     * Check if user has a specific permission
     * Supports wildcard matching
     */
    const hasPermission = (permission) => {
        if (!user || !user.permissions) return false;

        const requiredPermissions = Array.isArray(permission) ? permission : [permission];
        const userPermissions = user.permissions || [];

        // Check if user has any of the required permissions
        return requiredPermissions.some((required) => {
            // Direct match
            if (userPermissions.includes(required)) {
                return true;
            }

            // Check wildcard permissions
            for (const userPerm of userPermissions) {
                // Full wildcard (superadmin)
                if (userPerm === '*') {
                    return true;
                }

                // Module wildcard (e.g., 'users.*' matches 'users.view')
                if (userPerm.endsWith('.*')) {
                    const prefix = userPerm.slice(0, -1); // Remove '*'
                    if (required.startsWith(prefix)) {
                        return true;
                    }
                }

                // Action wildcard (e.g., '*.view' matches 'users.view')
                if (userPerm.startsWith('*.')) {
                    const suffix = userPerm.slice(1); // Remove '*'
                    if (required.endsWith(suffix)) {
                        return true;
                    }
                }
            }

            return false;
        });
    };

    /**
     * Check if user has ALL of the required permissions
     */
    const hasAllPermissions = (permissions) => {
        if (!user || !user.permissions) return false;
        const requiredPermissions = Array.isArray(permissions) ? permissions : [permissions];
        return requiredPermissions.every((perm) => hasPermission(perm));
    };

    /**
     * Get all user permissions (including wildcards)
     */
    const getPermissions = () => {
        return user?.permissions || [];
    };

    /**
     * Check if user has a wildcard that covers a module
     */
    const hasModuleAccess = (module) => {
        return hasPermission(`${module}.*`) || hasPermission('*');
    };

    return {
        hasPermission,
        hasAllPermissions,
        getPermissions,
        hasModuleAccess
    };
};
