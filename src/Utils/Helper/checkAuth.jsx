import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            return {
                token: token || null,
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching user data from AsyncStorage:', error);
        return null;
    }
};
