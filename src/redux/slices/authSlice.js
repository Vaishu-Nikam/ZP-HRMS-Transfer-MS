import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../../services/auth.service';
import { setTokens, clearTokens, getAccessToken, setUser } from '../../utils/auth.utils';

const initialState = {
    user: null,
    isAuthenticated: !!getAccessToken(),
    loading: false,
    error: null,
    permissions: [],
};

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await authService.login(credentials);
            setTokens(response.tokens.access_token, response.tokens.refresh_token);
            setUser(response.user); // Persist user data
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { }) => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            clearTokens();
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        restoreUser: (state, action) => {
            state.user = action.payload;
            state.permissions = action.payload.permissions;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            clearTokens();
            state.user = null;
            state.permissions = [];
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.permissions = action.payload.user.permissions;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.permissions = [];
                state.isAuthenticated = false;
            });
    },
});

export const { restoreUser, logout } = authSlice.actions;
export default authSlice.reducer;
