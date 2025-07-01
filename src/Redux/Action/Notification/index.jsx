import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VITE_API_URL } from "@env"

export const notificationList = createAsyncThunk(
    "getfresh/notification/list",
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
            const response = await axios.get(`${VITE_API_URL}/notification`, config);
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

export const notificationDetail = createAsyncThunk(
    "getfresh/notification/detail",
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
            const response = await axios.put(`${VITE_API_URL}/notification`, dataObject, config);
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

export const notifySingleDel = createAsyncThunk(
    "getfresh/notification/single_del",
    async (dataObject, { rejectWithValue }) => {
        const token = await AsyncStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
                'Cache-Control': 'no-store'
            },
            data: dataObject,
        }

        try {
            console.log('dataObject', dataObject);

            const response = await axios.delete(`${VITE_API_URL}/notification`, config);
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


export const notifyDelAll = createAsyncThunk(
    "getfresh/notification/del_all",
    async (dataObject, { rejectWithValue }) => {
        const token = await AsyncStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
                'Cache-Control': 'no-store'
            },
            data: dataObject,
        }

        try {
            const response = await axios.delete(`${VITE_API_URL}/notification`, config);
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