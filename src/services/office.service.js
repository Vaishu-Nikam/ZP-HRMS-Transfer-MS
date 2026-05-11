import api from "./api";

// ➕ CREATE
export const createOffice = async (data) => {
  const response = await api.post("/zp/add_zp_under_office", data);
  return response.data;
};

// 📄 GET ALL
export const getOffices = async () => {
  const response = await api.get("/zp/get_zp_under_office");
  return response.data.data || response.data;
};

// 🔍 GET BY ID
export const getOfficeById = async (id) => {
  const response = await api.get(`/zp/get_zp_under_office/${id}`);
  return response.data.data || response.data;
};

// ✏️ UPDATE
export const updateOffice = async (id, data) => {
  const response = await api.put(`/zp/update_zp_under_office/${id}`, data);
  return response.data;
};

// ❌ DELETE
export const deleteOffice = async (id) => {
  const response = await api.delete(`/zp/delete_p_under_office/${id}`);
  return response.data;
};