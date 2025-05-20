import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../config";
import axios from "axios";

export const createSubject = createAsyncThunk(
    '/subject/create',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/subject`, data);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { error: "Failed to create subject" });
        }
    }
);

export const getAllSubjects = createAsyncThunk(
    '/subject/all',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/subject`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { error: "Failed to fetch subjects" });
        }
    }
);

export const getSubjectWithTrainers = createAsyncThunk(
    '/subject/trainer',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/subject/trainer`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { error: "Failed to fetch subjects with trainers" });
        }
    }
);

const subjectSlice = createSlice({
    name: "subject",
    initialState: {
        subject: {},
        subjects: [],
        trainers: [],
        loading: false,
        error: null,
        message: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        const pending = (state) => {
            state.loading = true;
            state.error = null;
        };

        const rejected = (state, action) => {
            state.loading = false;
            state.error = action.payload?.error || "Something went wrong";
        };

        builder
            .addCase(createSubject.pending, pending)
            .addCase(createSubject.rejected, rejected)
            .addCase(createSubject.fulfilled, (state, action) => {
                state.loading = false;
                state.subject = action.payload.subject || {};
                state.message = action.payload.message || null;
            })

            .addCase(getAllSubjects.pending, pending)
            .addCase(getAllSubjects.rejected, rejected)
            .addCase(getAllSubjects.fulfilled, (state, action) => {
                state.loading = false;
                state.subjects = action.payload.subjects || [];
                state.message = action.payload.message || null;
            })

            .addCase(getSubjectWithTrainers.pending, pending)
            .addCase(getSubjectWithTrainers.rejected, rejected)
            .addCase(getSubjectWithTrainers.fulfilled, (state, action) => {
                state.loading = false;
                state.subjects = action.payload.subjects || [];
                state.trainers = action.payload.trainers || [];
                state.message = action.payload.message || null;
            });
    }
});

export const { clearError, clearMessage } = subjectSlice.actions;
export const subjectReducer = subjectSlice.reducer;