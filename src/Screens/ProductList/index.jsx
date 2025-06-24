import React, { useState, useCallback, useMemo } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import {
    PrimaryHeader,
    StatusBarComp,
    ProductCard,
    TextInput,
    BottomCard
} from '../../Components';
import { ColorPalatte } from '../../Themes';
import { addCart, productList } from '../../Redux/Action/Product';
import useUserData from '../../Hooks/useFetchUser';
import { showToast } from '../../Utils/Helper/toastHelper';

const ProductList = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.product);
    const { user } = useUserData();

    const [quantities, setQuantities] = useState({});

    useFocusEffect(
        useCallback(() => {
            dispatch(productList());
        }, [])
    );

    const mappedProducts = useMemo(() => {
        return products?.response?.document?.map((item) => ({
            ...item,
            quantity: quantities[item?.id],
            items_left: item?.quantity
        })) || [];
    }, [products, quantities]);

    const counts = useMemo(() => ({
        cartCount: products?.cartCount,
        notificationCount: products?.notificationCount
    }), [products]);

    const handleQuantityChange = useCallback((updatedItem) => {
        setQuantities(prev => ({
            ...prev,
            [updatedItem?.id]: updatedItem?.quantity
        }));
    }, []);

    const cartItems = useMemo(() =>
        mappedProducts?.filter(item => item?.quantity > 0),
        [mappedProducts]
    );

    const handleCheckout = () => {
        const cartPayload = cartItems?.map(item => ({
            product_id: item?.id,
            quantity: item?.quantity,
            price: (item?.price * item?.quantity),
        }));
        dispatch(addCart({ cart_add: cartPayload })).then((res) => {
            console.log('Add to Cart', res)
            if (res?.payload?.data?.rt_approved_status === 1 && res?.payload?.data?.status === 1) {
                showToast('success', 'Cart added successfully!');
                setQuantities({});
            }
        })
    };

    const renderItem = useCallback(({ item }) => (
        <>
            <ProductCard
                data={item}
                onQuantityChange={handleQuantityChange}
            />
        </>
    ), [handleQuantityChange]);

    const renderAddCart = useMemo(() => {
        return (
            cartItems.length > 0 && (
                <BottomCard
                    items={cartItems}
                    onPress={handleCheckout}
                    bottom={75}
                />
            )
        );
    }, [cartItems, handleCheckout]);


    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComp backgroundColor={ColorPalatte.whiteClr} visible={true} />
            <PrimaryHeader
                isNotification
                isCart
                cartCount={counts?.cartCount}
                notifyCount={counts?.notificationCount}
                onNotifyPress={() => navigation.navigate("BottomTab", { screen: 'Notification' })}
                onCartPress={() => navigation.navigate("BottomTab", { screen: 'Cart' })}
            />
            <View style={{ paddingVertical: 20 }}>
                <TextInput
                    type="search"
                    placeholder="Search"
                />
                <FlatList
                    data={mappedProducts}
                    keyExtractor={(item) => item?.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: cartItems?.length > 0 ? 150 : 60
                    }}
                />
                {renderAddCart}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: ColorPalatte.whiteClr,
    }
});

export default ProductList;
