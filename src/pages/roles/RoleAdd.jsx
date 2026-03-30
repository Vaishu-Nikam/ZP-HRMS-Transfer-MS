import React, { useState } from 'react';
import { RoleForm } from './RoleForm';
import { createRole } from '../../services/role.service';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const RoleAdd = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data) => {
        setIsLoading(true);
        try {
            await createRole(data);

            toast.success("Role created successfully ✅"); 

            navigate('/roles');
        } catch (error) {
            console.error('Failed to create role', error);
            toast.error(error.message || "Failed to create role");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <RoleForm
            title="Create New Role"
            onSubmit={handleSubmit}
            isLoading={isLoading}
        />
    );
};

export default RoleAdd;