import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    PrimaryHeader,
    StatusBarComp,
    ProductCard,
    TextInput,
    BottomCard
} from '../../Components';
import { ColorPalatte } from '../../Themes';
import { addCart, productList } from '../../Redux/Action/Product';
import { showToast } from '../../Utils/Helper/toastHelper';
import { getCartProducts, storeCartProducts } from '../../Hooks/useStoreBulkData';
import { ListLoader } from '../../Loader';

const ProductList = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { products, productLoading } = useSelector(state => state.product);

    const [homeData, setHomeData] = useState({
        quantities: {},
        cartCount: 0,
    })

    useFocusEffect(
        useCallback(() => {
            dispatch(productList());
        }, [])
    );

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            try {
                const existingCart = await getCartProducts();
                setHomeData(prev => ({
                    ...prev,
                    cartCount: existingCart?.length,
                }));
            } catch (err) {
                console.error('Error fetching cart data', err);
            }
        });

        return unsubscribe;
    }, []);


    const mappedProducts = useMemo(() => {
        return products?.response?.document?.map((item) => ({
            ...item,
            quantity: homeData?.quantities?.[item?.id],
            items_left: item?.quantity
        })) || [];
    }, [products, homeData?.quantities]);

    const counts = useMemo(() => ({
        cartCount: products?.cartCount,
        notificationCount: products?.notificationCount
    }), [products]);

    const handleQuantityChange = useCallback((updatedItem) => {
        setHomeData((prev) => ({
            ...prev,
            quantities: { ...prev.quantities, [updatedItem?.id]: updatedItem?.quantity }
        }))
    }, []);

    const cartItems = useMemo(() =>
        mappedProducts?.filter(item => item?.quantity > 0),
        [mappedProducts]
    );

    // const handleCheckout = () => {
    //     console.log('cartItems--->', cartItems)
    //     storeCartProducts(cartItems)
    //     showToast('success', 'Cart added successfully!');
    //     setHomeData((prev) => ({
    //         ...prev,
    //         quantities: {}
    //     }))
    //     // const cartPayload = cartItems?.map(item => ({
    //     //     product_id: item?.id,
    //     //     quantity: item?.quantity,
    //     //     price: (item?.price * item?.quantity),
    //     // }));
    //     // dispatch(addCart({ cart_add: cartPayload })).then((res) => {
    //     //     console.log('Add to Cart', res)
    //     //     if (res?.payload?.data?.rt_approved_status === 1 && res?.payload?.data?.status === 1) {
    //     //         showToast('success', 'Cart added successfully!');
    //     //         setQuantities({});
    //     //     }
    //     // })
    // };

    const handleCheckout = async () => {
        try {
            const existingCart = await getCartProducts();
            setHomeData((prev) => ({ ...prev, cartCount: existingCart }))
            const cartMap = new Map();

            existingCart?.forEach(item => {
                cartMap?.set(item?.id, { ...item });
            });

            cartItems.forEach(newItem => {
                if (cartMap?.has(newItem?.id)) {
                    const existing = cartMap.get(newItem?.id);
                    const updatedQty = existing.quantity + newItem?.quantity;
                    cartMap?.set(newItem?.id, { ...existing, quantity: updatedQty });
                } else {
                    cartMap.set(newItem?.id, { ...newItem });
                }
            });

            const updatedCart = Array?.from(cartMap?.values());
            await storeCartProducts(updatedCart);

            showToast('success', 'Cart added successfully!');
            setHomeData((prev) => ({
                ...prev,
                quantities: {}
            }));
        } catch (error) {
            console.error('Error updating cart:', error);
        }
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
            cartItems?.length > 0 && (
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
                cartCount={counts?.cartCount || homeData?.cartCount}
                notifyCount={counts?.notificationCount}
                onNotifyPress={() => navigation.navigate("BottomTab", { screen: 'Notification' })}
                onCartPress={() => navigation.navigate("BottomTab", { screen: 'Cart' })}
            />
            <View style={{ paddingVertical: 20, flex: productLoading && 1 }}>
                <TextInput
                    type="search"
                    placeholder="Search"
                />

                {productLoading ? (
                    <ListLoader />
                ) : (
                    <FlatList
                        data={mappedProducts}
                        keyExtractor={(item) => item?.id}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: cartItems?.length > 0 ? 150 : 60
                        }}
                    />
                )}

                {!productLoading && renderAddCart}
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
