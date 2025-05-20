import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../config';
export const fetchTrainers = createAsyncThunk(
  'trainer/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/trainer/all`);
      // Ensure trainers is always an array
      if (Array.isArray(response.data.trainers)) {
        return response.data.trainers;
      }
      // fallback: if trainers is not an array, return empty array
      return [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createTrainer = createAsyncThunk(
  'trainer/create',
  async (trainerData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/trainer/create`, trainerData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteTrainer = createAsyncThunk(
  'trainer/delete',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_URL}/trainer/${id}`);
      return { id, ...response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getTrainerById = createAsyncThunk(
  '/trainer/getById',
  async(id, thunkAPI)=>{
      try{
        const response = await axios.get(`${API_URL}/trainer/${id}`);
      return response.data;
      }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
      }
  }
)

const trainerSlice = createSlice({
  name: 'trainer',
  initialState: {
    trainer : null,
    trainers: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearTrainerState: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainers.fulfilled, (state, action) => {
        state.loading = false;
        state.trainers = action.payload;
        state.success = null;
      })
      .addCase(fetchTrainers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTrainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTrainer.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.trainer) {
          state.trainers.push(action.payload.trainer);
        }
        state.success = action.payload?.message || null;
      })
      .addCase(createTrainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTrainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTrainer.fulfilled, (state, action) => {
        state.loading = false;
        state.trainers = state.trainers.filter(
          (trainer) => trainer.id !== action.payload.id
        );
        state.success = action.payload?.message || null;
      })
      .addCase(deleteTrainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTrainerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrainerById.fulfilled, (state, action) => {
        state.loading = false;
        state.trainer = action.payload?.trainer || null;
        state.success = action.payload?.message || null;
      })
      .addCase(getTrainerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTrainerState } = trainerSlice.actions;
export default trainerSlice.reducer;
