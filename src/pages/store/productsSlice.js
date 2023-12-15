import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  products: [],
  product:{},
  loadingProducts: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products`
    );
    return response.data;
  }
);
export const fetchProduct = createAsyncThunk(
    'products/fetchProduct',
  async (id) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
    );
    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loadingProducts = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loadingProducts = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loadingProducts = false;
        state.error = action.error.message;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      ;
  },
});

export default productsSlice.reducer;