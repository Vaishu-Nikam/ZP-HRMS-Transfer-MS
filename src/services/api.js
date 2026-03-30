import axios from 'axios';
import { getAccessToken, getRefreshToken, setTokens, clearTokens, setUser } from '../utils/auth.utils';
import toast from 'react-hot-toast';
import { API_BASE_PATH } from '../config/appConfig';

// Define the base URL
const API_BASE_URL = API_BASE_PATH || '/api';

// Create a centralized Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
    // Allow CSRF cookie when backend CSRF is enabled; harmless when disabled
    withCredentials: true,
});

let store = null;
let csrfToken = null;
const forceLogout = (reason) => {
    clearTokens();
    if (store) {
        store.dispatch({ type: 'auth/logout/fulfilled', payload: { reason } });
    }
    window.location.href = '/admin/login';
};

export const injectStore = (_store) => {
    store = _store;
};

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Optional CSRF: only add if backend provided a token
        const method = (config.method || 'get').toUpperCase();
        if (csrfToken && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
            config.headers['X-CSRF-TOKEN'] = csrfToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor for Token Refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.response.use(
    (response) => {
        const token = response.headers['x-csrf-token'];
        if (token) {
            csrfToken = token;
        }
        // Standardize response: if success is true, return response (services will unwrap data)
        // If the API returns { success: true, data: ... }, we pass the whole response object 
        // but services should expect response.data to have this structure.
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        const requestUrl = originalRequest?.url || '';
        const isAuthLoginRequest = requestUrl.includes('/auth/admin/login') || requestUrl.includes('/auth/applicant/login');

        // Handle 403 CSRF invalid -> force logout
        if (error.response?.status === 403 && error.response?.data?.message === 'Invalid CSRF token') {
            forceLogout('csrf');
            return Promise.reject(error);
        }

        // Handle 401 Unauthorized (Token Expired)
        if (error.response?.status === 401 && !originalRequest._retry && !isAuthLoginRequest) {
            console.log(' UNAUTHORIZED! 401 detected. Checking if we can refresh...');

            if (isRefreshing) {
                console.log(' Refresh already in progress, queuing this request...');
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        console.log(' Queued request processing with new token.');
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = getRefreshToken();
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                console.log(' Initiating Token Refresh...');
                toast.loading('Refreshing Session...', { id: 'refresh-token' });

                // Call refresh token API using base axios to bypass interceptors
                // Using exact URL from specification match
                const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                    refresh_token: refreshToken,
                });

                console.log('REFRESH SUCCESS! API responded with new tokens.');
                console.log('Refresh Response Data:', response.data);
                toast.success('Session Refreshed', { id: 'refresh-token' });

                // Flexible parsing: API might return { data: { tokens: ... } } (Spec) or { data: { access_token: ... } } or { tokens: ... }
                // We know login returns data.data.tokens. Let's look for tokens recursively or directly.
                const responseBody = response.data;
                const dataNode = responseBody.data || responseBody; // data.data or just data

                // Try to find tokens object or use the data node itself if it contains access_token
                const tokens = dataNode.tokens || (dataNode.access_token ? dataNode : null);

                if (!tokens || !tokens.access_token) {
                    console.error('Structure mismatch. Received:', responseBody);
                    throw new Error('Invalid token response structure');
                }

                const { access_token, refresh_token: new_refresh_token } = tokens;
                // User might be in dataNode.user
                const user = dataNode.user;

                // Update cookies
                setTokens(access_token, new_refresh_token);
                if (user) {
                    setUser(user);
                    // Optionally dispatch to store if we had store reference
                    if (store) {
                        store.dispatch({ type: 'auth/restoreUser', payload: user });
                    }
                }

                // Update default header for future requests
                api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

                // Process queued requests with new token
                processQueue(null, access_token);

                console.log(' Retrying original request with NEW access token...');
                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return api(originalRequest);
            } catch (err) {
                console.error(' REFRESH FAILED:', err);
                toast.error('Session Expired: Please login again', { id: 'refresh-token' });

                processQueue(err, null);
                forceLogout('token_expired');
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        // Global Error Handling
        if (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
            error.message = error.response.data.message;
        }

        return Promise.reject(error);
    }
);

export default api;
