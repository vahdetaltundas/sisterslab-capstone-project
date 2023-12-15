import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  categories: [],
  category:{},
  loadingCategories: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`
    );
    return response.data;
  }
);
export const fetchCategory = createAsyncThunk(
  'categories/fetchCategory',
  async (id) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`
    );
    return response.data;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loadingCategories = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loadingCategories = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loadingCategories = false;
        state.error = action.error.message;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      ;
  },
});

export default categoriesSlice.reducer;