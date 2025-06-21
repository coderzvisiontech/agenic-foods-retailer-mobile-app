import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { VITE_API_URL } from "@env"

export const authLogin = createAsyncThunk(
    "getfresh/login",
    async (dataObject, { rejectWithValue }) => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        try {
            const response = await axios.post(`${VITE_API_URL}/auth/login`, dataObject, config);
            return response;
        } catch (error) {
            console.log('error', error)
            if (error?.response && error?.response?.data) {
                return rejectWithValue(error?.response?.data);
            } else {
                return rejectWithValue({
                    message: error,
                });
            }
        }
    }
);

export const authSignup = createAsyncThunk(
    "getfresh/signup",
    async (dataObject, { rejectWithValue }) => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        try {
            const response = await axios.post(`${VITE_API_URL}/auth/register`, dataObject, config);
            return response;
        } catch (error) {
            console.log('error', error)
            if (error?.response && error?.response?.data) {
                return rejectWithValue(error?.response?.data);
            } else {
                return rejectWithValue({
                    message: error,
                });
            }
        }
    }
);