import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IUserProps } from '../type/user/Iuser.type';
import { BASE_API_URL, BASE_URL } from '@/constant/constant';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Metadata, SocialMedia } from '@/app/(feature)/user/update/_type/profile.types';

interface AuthState {
    user: IUserProps | null;
    isAuthenticated: boolean;
    loading?: boolean;
    error?: string | null;
    isInitialized: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    isInitialized: false,
};

axios.defaults.withCredentials = true;

export const verifyAuth = createAsyncThunk('auth/verifyAuth', async () => {
    const url = `${BASE_URL}/auth/verify`;
    const response = await axios.get(url, { withCredentials: true });
    if (response.status === 200) {
        return response.data;
    }
    throw new Error('Failed to verify auth');
});


export const handleGoogleLogin = createAsyncThunk('auth/handleGoogleLogin', async () => {
    const url = `${BASE_URL}/auth/login?role=user`;
    const { data } = await axios.get(url);
    if (data) {
        window.location.href = data.googleAuthUrl;
    }
});

export const handleLogout = createAsyncThunk(
    'auth/handleLogout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/auth/logout`, {
                withCredentials: true,
            });
            if (response.status === 200) {
                return response.data;
            }
            return rejectWithValue('Logout failed');
        } catch (error) {
            return rejectWithValue('Failed to logout');
        }
    }
);
export interface updateUserProps {
    userId: string;
    metadata?: Metadata;
    socialMedia?: SocialMedia;
}

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async ({ userId, metadata, socialMedia }: updateUserProps, { rejectWithValue }) => {
        try {
            console.log('userId', userId);
            console.log('metadata', metadata);
            console.log('socialMedia', socialMedia);
            const response = await axios.put(
                `${BASE_API_URL}/user/update/${userId}`,
                { metadata, socialMedia },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue('Error updating profile');
        }
    }
);



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
            state.error = null;
            state.loading = false;
        },
        clearError: (state) => {
            state.error = null;
        }
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


        builder.addCase(handleLogout.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(handleLogout.fulfilled, (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            Cookies.remove('access_token');
        });
        builder.addCase(handleLogout.rejected, (state) => {
            state.loading = false;
            state.error = 'Failed to logout';
        });

        builder.addCase(verifyAuth.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(verifyAuth.fulfilled, (state, action: PayloadAction<IUserProps>) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        });

        builder.addCase(verifyAuth.rejected, (state) => {
            state.loading = false;
            state.error = 'Failed to verify auth';
            state.user = null;
            state.isAuthenticated = false;
            Cookies.remove('acess_token');
            state.isInitialized = true;
        });

        builder
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action: PayloadAction<IUserProps>) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

    }
});
export const { setUser, setLoading, setError, logout, clearError } = authSlice.actions;

export const authReducer = authSlice.reducer;