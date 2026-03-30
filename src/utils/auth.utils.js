// import Cookies from 'js-cookie';

// const ACCESS_TOKEN_KEY = 'access_token';
// const REFRESH_TOKEN_KEY = 'refresh_token';
// const USER_DATA_KEY = 'user_data';

// // Helper to safely parse JSON
// const safeJsonParse = (value) => {
//     if (!value) return null;
//     try {
//         return JSON.parse(value);
//     } catch (e) {
//         return null;
//     }
// };

// export const setTokens = (accessToken, refreshToken) => {
//     const isSecure = window.location.protocol === 'https:';
//     Cookies.set(ACCESS_TOKEN_KEY, accessToken, { secure: isSecure, sameSite: 'Lax' });
//     Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { secure: isSecure, sameSite: 'Lax' });
// };

// export const getAccessToken = () => {
//     return Cookies.get(ACCESS_TOKEN_KEY);
// };

// export const getRefreshToken = () => {
//     return Cookies.get(REFRESH_TOKEN_KEY);
// };

// export const setUser = (user) => {
//     localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
// };

// export const getUser = () => {
//     return safeJsonParse(localStorage.getItem(USER_DATA_KEY));
// };

// export const clearTokens = () => {
//     Cookies.remove(ACCESS_TOKEN_KEY);
//     Cookies.remove(REFRESH_TOKEN_KEY);
//     localStorage.removeItem(USER_DATA_KEY);
// };

// export const isAuthenticated = () => {
//     return !!getAccessToken();
// };


export const isAuthenticated = () => {
  return !!localStorage.getItem("user");
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const logout = () => {
  localStorage.removeItem("user");
};


export const getAccessToken = () => {
  return null;
};

export const getRefreshToken = () => {
  return null;
};

export const setTokens = () => {
};

export const clearTokens = () => {
  localStorage.removeItem("user");
};

export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};