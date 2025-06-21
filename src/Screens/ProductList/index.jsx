import React, { useState, useCallback, useMemo } from 'react';
import { SafeAreaView, StyleSheet, FlatList, View, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomSheet, ButtonComp, PrimaryHeader, ProductCard, StatusBarComp, TextInput, Typo } from '../../Components';
import { ColorPalatte } from '../../Themes';
import AddCart from './Components/AddCart';
import { showToast } from '../../Utils/Helper/toastHelper';

const initialData = [
    {
        id: '1',
        name: "Onions",
        price: 30,
        unit: "kg",
        items_left: 10,
        image: "https://placehold.co/600x400?text=Onions",
    },
    {
        id: '2',
        name: "Tomatoes",
        price: 40,
        unit: "kg",
        items_left: 210,
        image: "https://placehold.co/600x400?text=Tomatoes",

    },
    {
        id: '3',
        name: "Oranges",
        price: 50,
        unit: "kg",
        items_left: 15,
        image: "https://placehold.co/600x400?text=Oranges",
    },
    {
        id: '4',
        name: "Potatoes",
        price: 25,
        unit: "kg",
        items_left: 50,
        image: "https://placehold.co/600x400?text=Potatoes",
    },
    {
        id: '5',
        name: "Carrots",
        price: 45,
        unit: "kg",
        items_left: 30,
        image: "https://placehold.co/600x400?text=Carrots",

    },
    {
        id: '6',
        name: "Cabbage",
        price: 20,
        unit: "kg",
        items_left: 18,
        image: "https://placehold.co/600x400?text=Cabbage",
    },
    {
        id: '7',
        name: "Spinach",
        price: 35,
        unit: "kg",
        items_left: 25,
        image: "https://placehold.co/600x400?text=Spinach",
    },
    {
        id: '8',
        name: "Beetroot",
        price: 38,
        unit: "kg",
        items_left: 14,
        image: "https://placehold.co/600x400?text=Beetroot",
    },
    {
        id: '9',
        name: "Pumpkin",
        price: 22,
        unit: "kg",
        items_left: 8,
        image: "https://placehold.co/600x400?text=Pumpkin",
    },
    {
        id: '10',
        name: "Brinjal",
        price: 28,
        unit: "kg",
        items_left: 19,
        image: "https://placehold.co/600x400?text=Brinjal",
    },
    {
        id: '11',
        name: "Cucumber",
        price: 32,
        unit: "kg",
        items_left: 22,
        image: "https://placehold.co/600x400?text=Cucumber",
    },
    {
        id: '12',
        name: "Cauliflower",
        price: 36,
        unit: "kg",
        items_left: 16,
        image: "https://placehold.co/600x400?text=Cauliflower",
    },
    {
        id: '13',
        name: "Capsicum",
        price: 42,
        unit: "kg",
        items_left: 12,
        image: "https://placehold.co/600x400?text=Capsicum",
    },
    {
        id: '14',
        name: "Green Beans",
        price: 34,
        unit: "kg",
        items_left: 20,
        image: "https://placehold.co/600x400?text=Green+Beans",
    },
    {
        id: '15',
        name: "Mushrooms",
        price: 55,
        unit: "kg",
        items_left: 7,
        image: "https://placehold.co/600x400?text=Mushrooms",
    },
];

const { height } = Dimensions.get('window')

const ProductList = () => {
    const navigation = useNavigation();
    const [productHome, setProductHome] = useState({
        products: initialData,
        pageInfo: {
            loading: false,
            bottomSheet: false
        }
    });

    const handleQuantityChange = useCallback((updatedItem) => {
        setProductHome(prev => ({
            ...prev,
            products: prev.products.map(item =>
                item.id === updatedItem.id ? updatedItem : item
            )
        }));
    }, []);

    const cartItems = useMemo(
        () => productHome.products.filter(item => item.quantity > 0),
        [productHome.products]
    );

    const handleDeleteItem = useCallback((itemToDelete) => {
        setProductHome(prev => ({
            ...prev,
            pageInfo: {
                ...prev.pageInfo,
                bottomSheet: true
            }
        }));
    }, []);

    const renderItem = useCallback(({ item }) => (
        <ProductCard
            data={item}
            isDelete
            onQuantityChange={handleQuantityChange}
            onDelete={handleDeleteItem}
        />
    ), [handleQuantityChange, handleDeleteItem]);

    const handleCheckout = useCallback(() => {
        const cartPayload = cartItems.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
        }));

        if (cartPayload.length === 0) {
            Alert.alert("Cart is empty", "Please add items before checkout.");
            return;
        }

        console.log('cartPayload', cartPayload);
        Alert.alert("Success", "Order placed successfully!");
        navigation.navigate('BottomTab', { screen: 'Cart' });
    }, [cartItems, navigation]);

    const renderAddCart = useCallback(() => {
        if (cartItems.length === 0) return null;

        return (
            <AddCart
                items={cartItems}
                onViewCart={handleCheckout}
            />
        );
    }, [cartItems, handleCheckout]);

    const handleDelete = () => {
        setProductHome((prev) => ({
            ...prev,
            pageInfo: { ...prev.pageInfo, bottomSheet: false }
        }))
        showToast('error', 'Data saved successfully!');
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComp
                backgroundColor={ColorPalatte.whiteClr}
                visible={true}
            />
            <PrimaryHeader
                isNotification={true}
                isCart={true}
                cartCount={cartItems.length}
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
                    data={productHome.products}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 60 }}
                />
            </View>

            {renderAddCart()}

            {productHome?.pageInfo?.bottomSheet && (
                <BottomSheet
                    visible={productHome?.pageInfo?.bottomSheet}
                    onClose={() => setProductHome((prev) => ({
                        ...prev,
                        pageInfo: { ...prev.pageInfo, bottomSheet: false }
                    }))}
                    height={height * 0.3}
                >
                    <Typo type='h3' title='Delete' />
                    <View style={{ gap: 15 }}>
                        <Typo type='p' title='Are you sure you want to delete Onion from cart?' />
                        <ButtonComp
                            type='largePrimary'
                            title='Delete'
                            onPress={handleDelete}
                        />
                        <ButtonComp
                            type='largeSecondary'
                            title='Cancel'
                            onPress={() => Alert.alert('Cancelled')}
                        />
                    </View>
                </BottomSheet>
            )}
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
