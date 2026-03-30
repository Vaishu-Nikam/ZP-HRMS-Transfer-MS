import api from './api';

export const login = async (credentials) => {
    const response = await api.post('/auth/admin/login', credentials);
    // Response: { success: true, message: "...", data: { user: ..., tokens: ... } }
    return response.data.data;
};

export const refreshToken = async (token) => {
    const response = await api.post('/auth/refresh', { refresh_token: token });
    return response.data.data.tokens;
};

export const logout = async () => {
    // Current implementation often sends refresh token body for secure invalidation
    const rToken = document.cookie.split('; ').find(row => row.startsWith('refresh_token='))?.split('=')[1];
    return api.post('/auth/logout', { refresh_token: rToken });
};

export const changePassword = async (data) => {
    return api.post('/auth/admin/change-password', data);
};
