import api from './api';

const getData = (response) => response.data.data || response.data;

// ==================== DASHBOARD ====================
export const getDashboardStats = async () => {
    const response = await api.get('/admin/dashboard');
    return getData(response);
};
