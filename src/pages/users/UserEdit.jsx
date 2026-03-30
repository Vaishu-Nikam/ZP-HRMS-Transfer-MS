import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserForm } from './UserForm';
import { getUserById, updateUser } from '../../services/user.service';
import toast from 'react-hot-toast';

const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (id) {
            fetchUser(id);
        }
    }, [id]);

    const fetchUser = async (userId) => {
        setIsLoading(true);
        try {
            const data = await getUserById(userId);
            setUser(data);
        } catch (error) {
            console.error('Failed to fetch user', error);
            navigate('/users');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (data) => {
        if (!id) return;
        setIsSaving(true);
        try {
            await updateUser(id, data);
            toast.success('User updated successfully');
            navigate('/users');
        } catch (error) {
            console.error('Failed to update user', error);
            toast.error(error.message || 'Failed to update user');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    if (!user) return null;

    return (
        <UserForm
            title="Edit User"
            initialData={user}
            onSubmit={handleSubmit}
            isLoading={isSaving}
        />
    );
};

export default UserEdit;
