import { createSlice } from "@reduxjs/toolkit";
import { productList } from "../Action/Product";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        productLoading: false,
        productError: null,
    },
    reducers: {
        clearProductError: (state) => {
            state.productError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(productList.pending, (state) => {
                state.productLoading = true;
                state.productError = null;
            })
            .addCase(productList.fulfilled, (state, action) => {
                state.productLoading = false;
                state.products = action.payload?.data || [];
            })
            .addCase(productList.rejected, (state, action) => {
                state.productLoading = false;
                state.productError = action?.payload?.message || 'Something went wrong';
            });
    },
});

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;
