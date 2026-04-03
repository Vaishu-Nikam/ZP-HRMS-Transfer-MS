import api from './api';

export const getUsers = async (params) => {
    const response = await api.get('/admin/users', { params });
    // API returns { success: true, data: [...], pagination: {...} } OR { success:true, data: { users: [...], pagination: {...} } }?
    // Spec says: { success: true, message: "...", data: [ ... ], pagination: { ... } }
    // Wait, let me check spec again.
    // Spec says for List Admin Users:
    // "data": [ ...utils... ], "pagination": { ... } wrapped in root object? 
    // Actually the spec example shows: 
    // { success: true, message: "...", data: [ ...users... ], pagination: { ... } } 
    // So response.data is the root.

    // We want to return a cleaner interface to the UI.
    return {
        users: response.data.data.users,
        pagination: response.data.data.pagination
    };
};

export const getUserById = async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data.data;
};

export const createUser = async (data) => {
    const response = await api.post('/admin/users', data);
    return response.data.data;
};

export const updateUser = async (id, data) => {
    const response = await api.put(`/admin/users/${id}`, data);
    return response.data.data;
};

export const deleteUser = async (id) => {
    await api.delete(`/admin/users/${id}`);
};
