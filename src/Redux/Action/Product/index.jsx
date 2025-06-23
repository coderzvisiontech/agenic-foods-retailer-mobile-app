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
            }
        }

        try {
            const response = await axios.get(`${VITE_API_URL}/product`, config);
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