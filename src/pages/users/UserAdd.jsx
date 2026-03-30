import React, { useState } from 'react';
import { UserForm } from './UserForm';
import { createUser } from '../../services/user.service';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const UserAdd = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data) => {
        setIsLoading(true);
        try {
            await createUser({ ...data, status: 'Active' });
            toast.success('User created successfully');
            navigate('/users');
        } catch (error) {
            console.error('Failed to create user', error);
            toast.error(error.message || 'Failed to create user');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <UserForm
            title="Create New User"
            onSubmit={handleSubmit}
            isLoading={isLoading}
        />
    );
};

export default UserAdd;
