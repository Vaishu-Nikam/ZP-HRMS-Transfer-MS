import React from 'react';
import { useAppSelector } from '../../redux/store';

/**
 * Check if user has permission with wildcard support
 */

const isDev = true;
const checkPermission = (userPermissions, required) => {
    if (!userPermissions || !Array.isArray(userPermissions)) return false;

    // Validating required permission
    if (!required) return false;

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
            const prefix = userPerm.slice(0, -1);
            if (required.startsWith(prefix)) {
                return true;
            }
        }

        // Action wildcard (e.g., '*.view' matches 'users.view')
        if (userPerm.startsWith('*.')) {
            const suffix = userPerm.slice(1);
            if (required.endsWith(suffix)) {
                return true;
            }
        }
    }

    return false;
};

export const PermissionGuard = ({
    permissions,
    children,
    fallback = null,
    requireAll = false  // NEW: if true, user must have ALL permissions
}) => {
    const { user } = useAppSelector((state) => state.auth);
    
if (isDev) return <>{children}</>; 
if (!user) return <>{fallback}</>;

    const userPermissions = user.permissions || [];
    const requiredPermissions = Array.isArray(permissions) ? permissions : [permissions];

    let hasPermission;

    if (requireAll) {
        // User must have ALL required permissions
        hasPermission = requiredPermissions.every((perm) =>
            checkPermission(userPermissions, perm)
        );
    } else {
        // User must have at least ONE required permission (OR logic)
        hasPermission = requiredPermissions.some((perm) =>
            checkPermission(userPermissions, perm)
        );
    }
if (isDev) return <>{children}</>; 
    if (hasPermission) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
};
