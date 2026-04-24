import api from './api';

// GET all cadres
export const getCadres = async () => {
  const res = await api.get('/zp/get_cadre');
  return res.data;
};

// GET cadre by ID
export const getCadreById = async (id) => {
  const res = await api.get(`/zp/get_cadre/${id}`);
  return res.data;
};

// CREATE cadre
export const createCadre = async (payload) => {
  const res = await api.post('/zp/add_cadre', payload);
  return res.data;
};

// UPDATE cadre
export const updateCadre = async (id, payload) => {
  const res = await api.post(`/zp/update_cadre/${id}`, payload);
  return res.data;
};

// DELETE cadre
export const deleteCadre = async (id) => {
  const res = await api.delete(`/zp/delete_cadre/${id}`);
  return res.data;
};