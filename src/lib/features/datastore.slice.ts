import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IDatastoreResponseProps } from "../type/datastore/Idatastore.props";
import axios from "axios";
import { BASE_URL } from "@/constant/constant";


interface IDatastoreState {
    datastores: IDatastoreResponseProps[];
    loading: boolean;
    error: string | null;
}

const initialState: IDatastoreState = {
    datastores: [],
    loading: false,
    error: null,
};


export const getDatastore = createAsyncThunk<IDatastoreResponseProps[], void, { rejectValue: string }>(
    "datastore/getDatastore",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/datastore`);
            return response.data as IDatastoreResponseProps[];
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data.message || "Failed to fetch datastore");
            }
            return rejectWithValue("An unknown error occurred while fetching datastore");
        }
    }
);

const datastoreSlice = createSlice({
    name: "datastore",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getDatastore.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDatastore.fulfilled, (state, action) => {
                state.loading = false;
                state.datastores = action.payload;
            })
            .addCase(getDatastore.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch datastore";
            });
    },
});

export const datastoreReducer = datastoreSlice.reducer;


