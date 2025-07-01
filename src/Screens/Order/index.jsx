import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { ButtonComp, OrderCard, SecondaryHeader, TextInput, Typo } from '../../Components';
import { ColorPalatte, FontSize } from '../../Themes';
import { NoOrder } from '../../Config/ImgConfig';
import { orderList } from '../../Redux/Action/Order';
import { ListLoader } from '../../Loader';

const OrderDeatils = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { order, orderLoading } = useSelector(state => state.order);
    const { is_from } = route.params || {};

    const [pagination, setPagination] = useState({ start: 0, limit: 10 });
    const [pageData, setPageData] = useState({
        canLoadMore: true,
        orderListData: [],
        isInitialLoad: true,
        searchData: ''
    })
    const fetchOrders = useCallback((pagination) => {
        dispatch(orderList({ start: pagination.start, limit: pagination.limit }));
    }, [dispatch]);

    useFocusEffect(
        useCallback(() => {
            setPageData((prev) => ({
                ...prev,
                orderListData: []
            }))
            const initial = { start: 0, limit: 10 };
            setPagination(initial);
            fetchOrders(initial);
        }, [fetchOrders])
    );

    useEffect(() => {
        if (order?.response?.documentData) {
            const newItems = order.response.documentData;
            setPageData(prev => {
                const allItems = [...prev.orderListData, ...newItems];
                const uniqueItems = Array?.from(new Map(allItems?.map(item => [item?.id, item])).values());

                return {
                    ...prev,
                    isInitialLoad: false,
                    orderListData: uniqueItems,
                };
            });

            if (newItems?.length < pagination?.limit) {
                setPageData((prev) => ({
                    ...prev,
                    canLoadMore: false
                }))
            }
        }
    }, [order]);


    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            if (is_from === 'checkout') {
                e.preventDefault();
                navigation.navigate('BottomTab', { screen: 'Home' });
            }
        });
        return unsubscribe;
    }, [navigation, is_from]);

    const orderData = useMemo(() => {
        const filtered = pageData?.orderListData?.filter((item) => {
            if (!pageData?.searchData?.trim()) return true;
            const searchLower = pageData?.searchData?.toLowerCase();
            return (
                item?.productDetail?.some((prod) =>
                    prod?.toLowerCase().includes(searchLower)
                )
            );
        });

        return filtered?.map((item) => ({
            ...item,
            id: item?.id,
            cartCount: item?.cartCount,
        }));
    }, [pageData?.orderListData, pageData?.searchData]);

    const renderItem = useCallback(({ item }) => {
        const deliveryStatus = {
            order_status: item?.order_status,
            outofDelivery: item?.outofDelivery
        };
        return (
            <OrderCard
                data={item}
                onOrderPress={() => navigation.navigate('OrderDetailScreen', { id: item?.id, deliveryStatus })}
            />
        );
    }, [navigation]);

    const handleLoadMore = useCallback(() => {
        setPagination(prev => {
            const updated = { ...prev, start: prev?.start + prev?.limit };
            fetchOrders(updated);
            return updated;
        });
    }, [fetchOrders]);

    return (
        <SafeAreaView style={styles.container}>
            <SecondaryHeader isBack screenName={'Orders'} onPressBack={() => navigation.goBack()} />
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <TextInput
                    placeholder={'Search'}
                    type='search'
                    value={pageData?.searchData}
                    onChangeText={(text) =>
                        setPageData((prev) => ({
                            ...prev,
                            searchData: text,
                        }))
                    }
                />

                {orderLoading && pageData?.isInitialLoad ? (
                    <ListLoader />
                ) : orderData?.length > 0 ? (
                    <FlatList
                        data={orderData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => {
                            if (pageData?.canLoadMore) {
                                handleLoadMore();
                                setPageData((prev) => ({
                                    ...prev,
                                    canLoadMore: false,
                                }));
                            }
                        }}
                        onMomentumScrollBegin={() =>
                            setPageData((prev) => ({
                                ...prev,
                                canLoadMore: true,
                            }))
                        }
                    />
                ) : pageData?.searchData?.trim() ? (
                    <View style={styles.emptyContainer}>
                        <Typo
                            style={styles.emptyTitle}
                            title={'No orders match your search.'}
                        />
                    </View>
                ) : (
                    <View style={styles.emptyContainer}>
                        <NoOrder />
                        <View style={styles.emptyTextWrapper}>
                            <Typo
                                style={styles.emptyTitle}
                                title={'Your order history is empty.'}
                            />
                            <Typo
                                style={styles.emptySubtitle}
                                title={'Check back after your first purchase!'}
                            />
                        </View>
                        <ButtonComp
                            type="mediumPrimary"
                            title="Back to Home"
                            onPress={() =>
                                navigation.navigate('BottomTab', { screen: 'Home' })
                            }
                        />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorPalatte.whiteClr,
        padding: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    emptyTextWrapper: {
        alignItems: 'center',
        gap: 5,
    },
    emptyTitle: {
        fontSize: FontSize.fontSize16,
        fontFamily: 'Outfit-Medium',
    },
    emptySubtitle: {
        fontSize: FontSize.fontSize14,
        fontFamily: 'Outfit-Medium',
        color: ColorPalatte.grey_400,
    },
});

export default OrderDeatils;
