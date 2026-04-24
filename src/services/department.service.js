import api from './api';

// ✅ ALWAYS RETURN ARRAY / OBJECT CLEANLY
export const getDepartments = async () => {
  const res = await api.get('/departments');
  return res.data.data; // 🔥 ONLY THIS
};

export const getDepartmentById = async (id) => {
  const res = await api.get(`/departments/${id}`);
  return res.data.data;
};

export const createDepartment = async (payload) => {
  const res = await api.post('/departments', payload);
  return res.data;
};

export const updateDepartment = async (id, payload) => {
  const res = await api.put(`/departments/${id}`, payload);
  return res.data;
};

export const deleteDepartment = async (id) => {
  const res = await api.delete(`/departments/${id}`);
  return res.data;
};