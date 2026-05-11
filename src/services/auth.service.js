import api from "./api";

// ✅ LOGIN
export const loginUser = async (data) => {
  const response = await api.post(
    "/auth/login/pune_zp",
    data
  );

  return response.data;
};

// ✅ LOGOUT
export const logoutUser = async () => {
  const response = await api.post(
    "/auth/logout"
  );

  return response.data;
};

// ✅ CHANGE PASSWORD
export const changePassword = async (data) => {
  const response = await api.post(
    "/auth/change_password",
    data
  );

  return response.data;
};