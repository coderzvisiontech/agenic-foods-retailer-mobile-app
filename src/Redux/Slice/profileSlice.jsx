import { createSlice } from "@reduxjs/toolkit";
import { userProfile } from "../Action/Profile";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        data: [],
        profileLoading: false,
        profileError: null,
    },
    reducers: {
        clearProfileError: (state) => {
            state.profileError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userProfile.pending, (state) => {
                state.profileLoading = true;
                state.profileError = null;
            })
            .addCase(userProfile.fulfilled, (state, action) => {
                state.profileLoading = false;
                state.data = action.payload?.data || [];
            })
            .addCase(userProfile.rejected, (state, action) => {
                state.profileLoading = false;
                state.profileError = action?.payload?.message || 'Something went wrong';
            });
    },
});

export const { clearProfileError } = profileSlice.actions;
export default profileSlice.reducer;