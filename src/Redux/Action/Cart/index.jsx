import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VITE_API_URL } from "@env"

export const cartList = createAsyncThunk(
    "getfresh/cart/list",
    async (_, { rejectWithValue }) => {
        const token = await AsyncStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            }
        }

        try {
            const response = await axios.get(`${VITE_API_URL}/cart`, config);
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

export const cartDelete = createAsyncThunk(
    "getfresh/cart/delete",
    async (dataObject, { rejectWithValue }) => {
        const token = await AsyncStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            }
        }

        try {
            const response = await axios.delete(`${VITE_API_URL}/cart`, dataObject, config);
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

