import api from "./api";

// ✅ GET ALL
export const getDistricts = async () => {
  const res = await api.get("/districts");
  return res.data;
};

// ✅ GET BY ID
export const getDistrictById = async (id) => {
  const res = await api.get(`/districts/${id}`);
  return res.data;
};

// ✅ CREATE
export const createDistrict = async (data) => {
  const res = await api.post("/districts", data);
  return res.data;
};

// ✅ UPDATE
export const updateDistrict = async (id, data) => {
  const res = await api.put(`/districts/${id}`, data);
  return res.data;
};

// ✅ DELETE
export const deleteDistrict = async (id) => {
  const res = await api.delete(`/districts/${id}`);
  return res.data;
};