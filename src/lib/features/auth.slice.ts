import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IUserProps } from '../type/user/Iuser.type';
import { BASE_URL } from '@/constant/constant';
import axios from 'axios';
import Cookies from 'js-cookie';

interface AuthState {
    user: IUserProps | null;
    isAuthenticated: boolean;
    loading?: boolean;
    error?: string;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: '',
};


const handleGoogleLogin = createAsyncThunk('auth/handleGoogleLogin', async () => {
    const url = `${BASE_URL}/auth/login?role=user`;
    console.log("url", url);
    const { data } = await axios.get(url);
    if (data) {
        window.location.href = data.googleAuthUrl;
    }
});


const fetchUserFromSession = createAsyncThunk('auth/fetchUserFromSession', async () => {
    // Fetch the session token from the cookies
    const sessionToken = Cookies.get('session_token');
    console.log("sessionToken", sessionToken);
    if (sessionToken) {
        const { data } = await axios.post('http://localhost:3000/auth/verify-session', { sessionToken });
        return data.user; // Assuming the API returns the user object
    }
    return null;
});


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUserProps>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
extraReducers: (builder) => {
        builder.addCase(handleGoogleLogin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(handleGoogleLogin.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(handleGoogleLogin.rejected, (state) => {
            state.loading = false;
            state.error = 'Failed to login';
        });

        builder.addCase(fetchUserFromSession.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUserFromSession.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        });
        builder.addCase(fetchUserFromSession.rejected, (state) => {
            state.loading = false;
            state.error = 'Failed to fetch user';
        });
    }
});
export const { setUser, setLoading, setError, logout,  } = authSlice.actions;

export { authSlice, handleGoogleLogin , fetchUserFromSession};