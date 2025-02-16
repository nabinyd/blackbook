import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/constant/constant";


interface ITestimonial {
    id: number;
    name: string;
    designation: string;
    message: string;
    image: string;
}

interface ITestimonialState {
    testimonials: ITestimonial[];
    loading: boolean;
    error: string | null;
}

const initialState: ITestimonialState = {
    testimonials: [],
    loading: false,
    error: null,
};
export const fetchTestimonial = createAsyncThunk("testimonial/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/testmonials`);
        return response.data as ITestimonial[];
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to fetch testimonials");
        }
        return rejectWithValue("An unknown error occurred while fetching testimonials");
    }
})
const testimonialSlice = createSlice({
    name: "testimonial",
    initialState,
    reducers: {
        // Define additional reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTestimonial.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear any previous error
            })
            .addCase(fetchTestimonial.fulfilled, (state, action) => {
                state.loading = false;
                state.testimonials = action.payload; // Add the created project to the list
            })
            .addCase(fetchTestimonial.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || "Failed to fetch testimonials"; // Capture the error message
            });
    },
});

// Export the reducer for the Redux store
export const testimonialReducer = testimonialSlice.reducer;