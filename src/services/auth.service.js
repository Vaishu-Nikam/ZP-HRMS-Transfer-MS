import api from "./api";

// ✅ LOGIN
export const login = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

// ✅ LOGOUT
export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

// ✅ CHANGE PASSWORD
export const changePassword = async (payload) => {
  const response = await api.post("/auth/change_password", payload);
  return response.data;
};