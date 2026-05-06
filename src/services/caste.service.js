import api from "./api";

// ➕ CREATE
export const createCaste = async (data) => {
  const response = await api.post("/castes", data);
  return response.data;
};

// 📄 GET ALL
export const getCastes = async () => {
  const response = await api.get("/castes");
  return response.data.data || response.data;
};

// 🔍 GET BY ID (optional)
export const getCasteById = async (id) => {
  const response = await api.get(`/castes/${id}`);
  return response.data.data || response.data;
};

// ✏️ UPDATE
export const updateCaste = async (id, data) => {
  const response = await api.put(`/castes/${id}`, data);
  return response.data;
};

// ❌ DELETE
export const deleteCaste = async (id) => {
  const response = await api.delete(`/castes/${id}`);
  return response.data;
};