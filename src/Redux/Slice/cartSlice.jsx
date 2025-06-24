import { createSlice } from "@reduxjs/toolkit";
import { cartList } from "../Action/Cart";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        cartLoading: false,
        cartError: null,
    },
    reducers: {
        clearCartError: (state) => {
            state.cartError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(cartList.pending, (state) => {
                state.cartLoading = true;
                state.cartError = null;
            })
            .addCase(cartList.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.cart = action.payload?.data;
            })
            .addCase(cartList.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartError = action?.payload?.message || 'Something went wrong';
            });
    },
});

export const { clearCartError } = cartSlice.actions;
export default cartSlice.reducer;
