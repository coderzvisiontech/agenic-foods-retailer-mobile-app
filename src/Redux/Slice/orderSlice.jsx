import { createSlice } from "@reduxjs/toolkit";
import { orderList } from "../Action/Order";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: [],
        orderLoading: false,
        orderError: null,
    },
    reducers: {
        clearOrderError: (state) => {
            state.orderError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(orderList.pending, (state) => {
                state.orderLoading = true;
                state.orderError = null;
            })
            .addCase(orderList.fulfilled, (state, action) => {
                state.orderLoading = false;
                state.order = action.payload?.data || [];
            })
            .addCase(orderList.rejected, (state, action) => {
                state.orderLoading = false;
                state.orderError = action?.payload?.message || 'Something went wrong';
            });
    },
});

export const { clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;
