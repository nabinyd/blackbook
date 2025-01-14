import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProjectCardProps } from "../type/IProjectCardProps";
import { BASE_URL } from "@/constant/constant";



interface ProjectState {
    projects: IProjectCardProps[];
    loading: boolean;
    error: string | null;
}

const initialState: ProjectState = {
    projects: [],
    loading: false,
    error: null,
};



export const fetchProjectsFromAPI = createAsyncThunk<IProjectCardProps[], void, { rejectValue: string }>(
    "project/fetchProjects",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/project`);
            console.log(response.data);
            return response.data as IProjectCardProps[];
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data.message || "Failed to fetch projects");
            }
            return rejectWithValue("An unknown error occurred while fetching projects");
        }
    }
);

// Create a slice for project state
const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        // Define reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectsFromAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjectsFromAPI.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(fetchProjectsFromAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch projects";
            });
    },
});

export const projectReducer = projectSlice.reducer;
