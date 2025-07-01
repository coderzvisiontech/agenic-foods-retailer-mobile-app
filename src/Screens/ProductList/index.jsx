import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    View,
    Dimensions,
    ActivityIndicator,
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
import { ColorPalatte, FontSize } from '../../Themes';
import { productList } from '../../Redux/Action/Product';
import { showToast } from '../../Utils/Helper/toastHelper';
import { getCartProducts, storeCartProducts } from '../../Hooks/useStoreBulkData';
import { ListLoader } from '../../Loader';
import useDoubleBackExit from '../../Hooks/useDoubleBackExit';

const { height } = Dimensions.get('window')

const ProductList = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { products, productLoading } = useSelector(state => state.product);
    useDoubleBackExit();

    const [homeData, setHomeData] = useState({
        quantities: {},
        cartCount: 0,
        searchData: '',
        canLoadMore: true,
        productListData: [],
        isInitialLoad: true,
    })

    const [paginationData, setPaginationData] = useState({
        limit: 10,
        start: 0
    })

    const fetchProduct = useCallback((pagination) => {
        dispatch(productList({ start: pagination?.start, limit: pagination?.limit }))
    }, [dispatch])

    useFocusEffect(
        useCallback(() => {
            const initializeScreen = async () => {
                setHomeData((prev) => ({
                    ...prev,
                    productListData: [],
                    isInitialLoad: true,
                    canLoadMore: true
                }))

                const initial = { start: 0, limit: 10 };
                setPaginationData(initial);

                try {
                    const existingCart = await getCartProducts();
                    setHomeData(prev => ({
                        ...prev,
                        cartCount: existingCart?.length,
                    }));
                } catch (err) {
                    console.error('Error fetching cart data', err);
                }
                fetchProduct(initial);
            };

            initializeScreen();
        }, [fetchProduct])
    );

    useEffect(() => {
        if (products?.response?.document) {
            const newItems = products?.response?.document;

            setHomeData(prev => {
                const allItems = [...prev.productListData, ...newItems];
                const uniqueItems = Array?.from(new Map(allItems?.map(item => [item?.id, item])).values());
                console.log('uniqueItems', uniqueItems)

                return {
                    ...prev,
                    isInitialLoad: false,
                    productListData: uniqueItems,
                    canLoadMore: newItems?.length >= paginationData?.limit,
                };
            });
        }
    }, [products, paginationData?.limit]);

    const mappedProducts = useMemo(() => {
        const allProducts = homeData.productListData;
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
    }, [homeData?.productListData, homeData?.quantities, homeData?.searchData]);


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
            setHomeData((prev) => ({ ...prev, cartCount: existingCart?.length }))
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
        <ProductCard
            data={item}
            onQuantityChange={handleQuantityChange}
        />
    ), [handleQuantityChange]);

    const renderAddCart = useMemo(() => {
        return (
            cartItems?.length > 0 && (
                <BottomCard
                    items={cartItems}
                    onPress={handleCheckout}
                    bottom={75}
                    isAlign
                />
            )
        );
    }, [cartItems, handleCheckout]);

    const handleLoadMore = useCallback(() => {
        if (!homeData.canLoadMore || productLoading) {
            return;
        }

        const newStart = paginationData.start + paginationData.limit;
        const newPaginationData = { ...paginationData, start: newStart };

        setPaginationData(newPaginationData);
        setHomeData(prev => ({ ...prev, canLoadMore: false }));
        fetchProduct(newPaginationData);
    }, [fetchProduct, paginationData, homeData.canLoadMore, productLoading]);

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

                {productLoading && homeData?.isInitialLoad ? (
                    <ListLoader />
                ) : (
                    <FlatList
                        data={mappedProducts}
                        keyExtractor={(item) => item?.id}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: cartItems?.length > 0 ? 150 : !homeData?.isInitialLoad && productLoading ? 100 : 60
                        }}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => {
                            if (!homeData.isInitialLoad && homeData.canLoadMore && !productLoading) {
                                handleLoadMore();
                            }
                        }}
                        ListFooterComponent={
                            !homeData.isInitialLoad && productLoading ? (
                                <View style={{ alignItems: 'center', paddingVertical: 20, gap: 10 }}>
                                    <Typo style={{ fontSize: FontSize.fontSize12, color: ColorPalatte.grey_400 }} title={'Loading...'} />
                                    <ActivityIndicator color={{ color: ColorPalatte.grey_400 }} />
                                </View>
                            ) : null
                        }
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