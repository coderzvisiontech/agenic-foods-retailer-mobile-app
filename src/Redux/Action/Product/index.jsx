import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VITE_API_URL } from "@env"

export const productList = createAsyncThunk(
    "getfresh/product/list",
    async (_, { rejectWithValue }) => {
        const token = await AsyncStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
                'Cache-Control': 'no-store'
            }
        }

        try {
            const response = await axios.get(`${VITE_API_URL}/product`, config);
            return response;
        } catch (error) {

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

export const addCart = createAsyncThunk(
    "getfresh/product/addCart",
    async (dataObject, { rejectWithValue }) => {
        const token = await AsyncStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
                'Cache-Control': 'no-store'
            }
        }

        try {
            const response = await axios.post(`${VITE_API_URL}/cart`, dataObject, config);
            return response;
        } catch (error) {

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