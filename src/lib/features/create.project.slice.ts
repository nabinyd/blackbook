import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProjectCardProps } from "../type/project/IProjectCardProps";
import axios from "axios";
import { BASE_URL } from "@/constant/constant";

// Create project action with FormData support
export const createProject = createAsyncThunk<
    IProjectCardProps,
    FormData,
    { rejectValue: string }>("createProject/createProject",
        async (formData, { rejectWithValue }) => {
            try {
                console.log("FormData being sent", formData);
                const response = await axios.post(`${BASE_URL}/api/v1/project/create`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data", // Ensure proper handling of FormData
                    },
                });
                console.log(response.status, response.data);
                return response.data as IProjectCardProps;
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    return rejectWithValue(error.response.data.message || "Failed to create project");
                }
                return rejectWithValue("An unknown error occurred while creating project");
            }
        }
    );

const createProjectslice = createSlice({
    name: "createProject",
    initialState: {
        projects: [] as IProjectCardProps[], // Type-safe array of projects
        loading: false,
        error: null as string | null,
    },
    reducers: {
        // Define additional reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProject.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear any previous error
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.loading = false;
                state.projects.push(action.payload); // Add the created project to the list
            })
            .addCase(createProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create project"; // Capture the error message
            });
    },
});

// Export the reducer for the Redux store
export const createProjectReducer = createProjectslice.reducer;

export default createProjectReducer;
