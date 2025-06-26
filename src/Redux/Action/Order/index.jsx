import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VITE_API_URL } from "@env"

export const orderList = createAsyncThunk(
    "getfresh/order/list",
    async (_, { rejectWithValue }) => {
        const token = await AsyncStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            }
        }

        try {
            const response = await axios.get(`${VITE_API_URL}/order`, config);
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

export const orderDetails = createAsyncThunk(
    "getfresh/order/details",
    async (dataObject, { rejectWithValue }) => {
        const token = await AsyncStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            }
        }

        try {
            const response = await axios.get(`${VITE_API_URL}/order/${dataObject?.id}`, config);
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

export const placeOrder = createAsyncThunk(
    "getfresh/order/place",
    async (dataObject, { rejectWithValue }) => {
        const token = await AsyncStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            }
        }

        try {
            const response = await axios.post(`${VITE_API_URL}/order`, dataObject, config);
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
