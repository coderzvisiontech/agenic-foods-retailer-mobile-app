import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUserData = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        token: '',
        user_id: '',
        phone_number: '',
        address: {},
        location: {},
        availability_address: ''
    });

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const name = await AsyncStorage.getItem('full_name');
                const email = await AsyncStorage.getItem('email');
                const token = await AsyncStorage.getItem('token');
                const user_id = await AsyncStorage.getItem('user_id');
                const phone_number = await AsyncStorage.getItem('phone_number');
                const location = JSON.parse(await AsyncStorage.getItem('location'));
                const address = JSON.parse(await AsyncStorage.getItem('address'));
                const availability_address = await AsyncStorage.getItem('available_address');

                setUser({
                    name,
                    email,
                    token,
                    user_id,
                    phone_number,
                    address,
                    location,
                    availability_address
                });
            } catch (error) {
                console.error('Failed to load user data:', error);
            }
        };

        loadUserData();
    }, []);

    return { user };
};

export default useUserData;
