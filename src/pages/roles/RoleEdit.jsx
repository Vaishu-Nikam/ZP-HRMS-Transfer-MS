import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RoleForm } from './RoleForm';
import { getRoleById, updateRole } from '../../services/role.service';
import toast from 'react-hot-toast'; 

const RoleEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (id) {
            fetchRole(id);
        }
    }, [id]);

    const fetchRole = async (roleId) => {
        setIsLoading(true);
        try {
            const data = await getRoleById(roleId);
            setRole(data);
        } catch (error) {
            console.error('Failed to fetch role', error);
            navigate('/roles');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (data) => {
        if (!id) return;
        setIsSaving(true);
        try {
            await updateRole(id, data);
            toast.success("Role updated successfully ✅"); 
            navigate('/roles');
        } catch (error) {
            console.error('Failed to update role', error);
            toast.error(error.message || "Failed to update role"); 
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    if (!role) return null;

    return (
        <RoleForm
            title="Edit Role & Permissions"
            initialData={role}
            onSubmit={handleSubmit}
            isLoading={isSaving}
        />
    );
};

export default RoleEdit;