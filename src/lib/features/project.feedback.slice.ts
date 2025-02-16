import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProjectFeedbackResponseProps, ICreateProjectFeedbackDto } from "../type/project/IProjectFeedback.types";
import axios from "axios";
import { BASE_API_URL, BASE_URL } from "@/constant/constant";

interface IProjectFeedbackState {
    feedbacks: IProjectFeedbackResponseProps[];
    loading: boolean;
    error: string | null;
}

const initialState: IProjectFeedbackState = {
    feedbacks: [],
    loading: false,
    error: null,
};

export const fetchFeedbacks = createAsyncThunk("feedback/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/feedback`);
        return response.data as IProjectFeedbackResponseProps[];
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to fetch feedbacks");
        }
        return rejectWithValue("An unknown error occurred while fetching feedbacks");
    }
});

export const createFeedback = createAsyncThunk<IProjectFeedbackResponseProps, ICreateProjectFeedbackDto, { rejectValue: string }>("feedback/createFeedback", async (feedbackData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/feedback/create`, feedbackData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data as IProjectFeedbackResponseProps;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to create feedback");
        }
        return rejectWithValue("An unknown error occurred while creating feedback");
    }
});

export const fetchFeedbackByProjectId = createAsyncThunk("feedback/fetchByProjectId", async (projectId: string, { rejectWithValue }) => {
    try {

        const response = await axios.get(`${BASE_URL}/api/v1/feedback/project/${projectId}`);
        return response.data as IProjectFeedbackResponseProps[];
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to fetch feedbacks");
        }
        return rejectWithValue("An unknown error occurred while fetching feedbacks");
    }
});

const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeedbacks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFeedbacks.fulfilled, (state, action) => {
                state.loading = false;
                state.feedbacks = action.payload;
            })
            .addCase(fetchFeedbacks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to fetch feedbacks";
            });
        builder.addCase(createFeedback.fulfilled, (state, action) => {
            state.feedbacks.push(action.payload);
            })
            .addCase(createFeedback.rejected, (state, action) => {
                state.error = action.payload as string || "Failed to create feedback";
            })
        builder.addCase(fetchFeedbackByProjectId.fulfilled, (state, action) => {
            state.loading = false;
            state.feedbacks = action.payload;
            })
            .addCase(fetchFeedbackByProjectId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to fetch feedbacks";
            })
            .addCase(fetchFeedbackByProjectId.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
    },
});

export const feedbackReducer = feedbackSlice.reducer;