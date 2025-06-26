import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeCartProducts = async (products) => {
    try {
        const jsonValue = JSON.stringify(products);
        await AsyncStorage.setItem('@products', jsonValue);
    } catch (error) {
        console.error('❌ Error storing products:', error);
    }
};

export const getCartProducts = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@products');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
        console.error('❌ Error retrieving products:', error);
        return [];
    }
};
