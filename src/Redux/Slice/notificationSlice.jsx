import { createSlice } from "@reduxjs/toolkit";
import { notificationList } from "../Action/Notification";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notification: [],
        notificationLoading: false,
        notificationError: null,
    },
    reducers: {
        clearNotifyError: (state) => {
            state.notificationError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(notificationList.pending, (state) => {
                state.notificationLoading = true;
                state.notificationError = null;
            })
            .addCase(notificationList.fulfilled, (state, action) => {
                state.notificationLoading = false;
                state.notification = action.payload?.data;
            })
            .addCase(notificationList.rejected, (state, action) => {
                state.notificationLoading = false;
                state.notificationError = action?.payload?.message || 'Something went wrong';
            });
    },
});

export const { clearNotifyError } = notificationSlice.actions;
export default notificationSlice.reducer;
