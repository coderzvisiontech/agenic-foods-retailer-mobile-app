import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    View,
    Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import {
    PrimaryHeader,
    StatusBarComp,
    ProductCard,
    TextInput,
    BottomCard,
    Typo
} from '../../Components';
import { ColorPalatte } from '../../Themes';
import { productList } from '../../Redux/Action/Product';
import { showToast } from '../../Utils/Helper/toastHelper';
import { getCartProducts, storeCartProducts } from '../../Hooks/useStoreBulkData';
import { ListLoader } from '../../Loader';

const { height } = Dimensions.get('window')

const ProductList = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { products, productLoading } = useSelector(state => state.product);

    const [homeData, setHomeData] = useState({
        quantities: {},
        cartCount: 0,
        searchData: ''
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
        const allProducts = products?.response?.document || [];
        const searchLower = homeData?.searchData?.toLowerCase()?.trim();

        const filtered = allProducts.filter((item) => {
            if (!searchLower) return true;
            return (
                item?.name?.toLowerCase()?.includes(searchLower)
            );
        });

        return filtered.map((item) => ({
            ...item,
            quantity: homeData?.quantities?.[item?.id],
            items_left: item?.quantity,
        }));
    }, [products, homeData?.quantities, homeData?.searchData]);


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
            <View style={{ paddingVertical: 20, flex: (productLoading || !productLoading && mappedProducts?.length === 0) && 1 }}>
                <TextInput
                    type="search"
                    placeholder="Search"
                    value={homeData?.searchData}
                    onChangeText={(text) =>
                        setHomeData((prev) => ({
                            ...prev,
                            searchData: text,
                        }))
                    }
                />

                {!productLoading && mappedProducts?.length === 0 && (
                    <Typo
                        style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', top: height * 0.35 }}
                        title="No products match your search."
                    />
                )}

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
