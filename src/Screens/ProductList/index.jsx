import React, { useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, FlatList, View } from 'react-native';
import { PrimaryHeader, ProductCard, StatusBarComp, TextInput } from '../../Components';
import { ColorPalatte } from '../../Themes';
import { useNavigation } from '@react-navigation/native';

const initialData = [
    {
        id: '1',
        name: "Onions",
        price: 30,
        unit: "kg",
        items_left: 10,
        image: "https://placehold.co/600x400?text=Onions",
        quantity: 0,
    },
    {
        id: '2',
        name: "Tomatoes",
        price: 40,
        unit: "kg",
        items_left: 210,
        image: "https://placehold.co/600x400?text=Tomatoes",
        quantity: 2,
    },
    {
        id: '3',
        name: "Oranges",
        price: 50,
        unit: "kg",
        items_left: 15,
        image: "https://placehold.co/600x400?text=Oranges",
        quantity: 2,
    },
    {
        id: '4',
        name: "Potatoes",
        price: 25,
        unit: "kg",
        items_left: 50,
        image: "https://placehold.co/600x400?text=Potatoes",
        quantity: 1,
    },
    {
        id: '5',
        name: "Carrots",
        price: 45,
        unit: "kg",
        items_left: 30,
        image: "https://placehold.co/600x400?text=Carrots",
        quantity: 1,
    },
    {
        id: '6',
        name: "Cabbage",
        price: 20,
        unit: "kg",
        items_left: 18,
        image: "https://placehold.co/600x400?text=Cabbage",
        quantity: 1,
    },
    {
        id: '7',
        name: "Spinach",
        price: 35,
        unit: "kg",
        items_left: 25,
        image: "https://placehold.co/600x400?text=Spinach",
        quantity: 1,
    },
    {
        id: '8',
        name: "Beetroot",
        price: 38,
        unit: "kg",
        items_left: 14,
        image: "https://placehold.co/600x400?text=Beetroot",
        quantity: 1,
    },
    {
        id: '9',
        name: "Pumpkin",
        price: 22,
        unit: "kg",
        items_left: 8,
        image: "https://placehold.co/600x400?text=Pumpkin",
        quantity: 1,
    },
    {
        id: '10',
        name: "Brinjal",
        price: 28,
        unit: "kg",
        items_left: 19,
        image: "https://placehold.co/600x400?text=Brinjal",
        quantity: 1,
    },
    {
        id: '11',
        name: "Cucumber",
        price: 32,
        unit: "kg",
        items_left: 22,
        image: "https://placehold.co/600x400?text=Cucumber",
        quantity: 1,
    },
    {
        id: '12',
        name: "Cauliflower",
        price: 36,
        unit: "kg",
        items_left: 16,
        image: "https://placehold.co/600x400?text=Cauliflower",
        quantity: 1,
    },
    {
        id: '13',
        name: "Capsicum",
        price: 42,
        unit: "kg",
        items_left: 12,
        image: "https://placehold.co/600x400?text=Capsicum",
        quantity: 1,
    },
    {
        id: '14',
        name: "Green Beans",
        price: 34,
        unit: "kg",
        items_left: 20,
        image: "https://placehold.co/600x400?text=Green+Beans",
        quantity: 1,
    },
    {
        id: '15',
        name: "Mushrooms",
        price: 55,
        unit: "kg",
        items_left: 7,
        image: "https://placehold.co/600x400?text=Mushrooms",
        quantity: 1,
    },
];

const ProductList = () => {
    const navigation = useNavigation()
    const [products, setProducts] = useState(initialData);

    const handleQuantityChange = useCallback((updatedItem) => {
        setProducts((prevProducts) =>
            prevProducts.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
            )
        );
    }, []);

    const renderItem = useCallback(({ item }) => (
        <ProductCard data={item} onQuantityChange={handleQuantityChange} />
    ), [handleQuantityChange]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComp
                backgroundColor={ColorPalatte.whiteClr}
                visible={true}
            />
            <PrimaryHeader
                isNotification={true}
                isCart={true}
                cartCount={3}
                notifyCount={4}
                onNotifyPress={() => navigation.navigate("BottomTab", { screen: 'Notification' })}
                onCartPress={() => navigation.navigate("BottomTab", { screen: 'Cart' })}
            />

            <View style={{ paddingVertical: 20 }} >
                <TextInput
                    type='search'
                    placeholder='Search'
                />
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 60 }}

                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: ColorPalatte.whiteClr,
    },
});

export default ProductList;
