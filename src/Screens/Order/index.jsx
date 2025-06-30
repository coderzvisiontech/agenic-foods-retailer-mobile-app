import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { ButtonComp, OrderCard, SecondaryHeader, TextInput, Typo } from '../../Components'
import { ColorPalatte, FontSize } from '../../Themes'
import { NoOrder } from '../../Config/ImgConfig'
import { orderList } from '../../Redux/Action/Order'
import { ListLoader } from '../../Loader'

const OrderDeatils = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { order, orderLoading } = useSelector(state => state.order);
    const { is_from } = route.params || {};

    const [pagination, setPagination] = useState({
        start: 0,
        limit: 10,
    })

    const [canLoadMore, setCanLoadMore] = useState(true);

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            if (is_from === 'checkout') {
                e.preventDefault();
                navigation.navigate('BottomTab', { screen: 'Home' });
            }
        });
        return unsubscribe;
    }, [navigation, is_from]);

    useFocusEffect(useCallback(() => {
        dispatch(orderList(pagination))
    }, []));

    const renderItem = useCallback(({ item }) => {
        const deliveryStatus = {
            order_status: item?.order_status,
            outofDelivery: item?.outofDelivery
        }
        return (
            <OrderCard
                data={item}
                onOrderPress={() => navigation.navigate('OrderDetailScreen', { id: item?.id, deliveryStatus: deliveryStatus })}
            />
        );
    }, []);

    const orderData = useMemo(() => {
        return order?.response?.documentData?.map((item) => ({
            ...item,
            id: item?.id,
            cartCount: item?.cartCount,
        })) || [];
    }, [order]);

    const fetchOrders = useCallback((pagination) => {
        dispatch(orderList({ start: pagination?.start, limit: pagination?.limit }));
    }, [dispatch]);


    const handleLoadMore = useCallback(() => {
        setPagination((prev) => {
            console.log('prev', prev)
            const updated = { ...prev, start: prev?.start + prev?.limit };
            fetchOrders(updated);
            return updated;
        });
    }, [fetchOrders]);

    const handleLoadBack = useCallback(() => {
        setPagination((prev) => {
            if (prev.start === 0) return prev; // No more previous items
            const newStart = Math.max(prev.start - prev.limit, 0);
            const updated = { ...prev, start: newStart };
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
                />

                {orderLoading ? (
                    <ListLoader />
                ) : (
                    orderData?.length > 0 ? (
                        <FlatList
                            data={orderData}
                            keyExtractor={(item) => item?.id}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                            onEndReachedThreshold={0.5}
                            onEndReached={() => {
                                if (canLoadMore) {
                                    handleLoadMore();
                                    setCanLoadMore(false);
                                }
                            }}
                            onMomentumScrollBegin={() => setCanLoadMore(true)}
                        />
                    ) : (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                            <NoOrder />
                            <View style={{ alignItems: 'center', gap: 5 }}>
                                <Typo style={{ fontSize: FontSize.fontSize16, fontFamily: 'Outfit-Medium' }} title={'Your order history is empty.'} />
                                <Typo style={{ fontSize: FontSize.fontSize14, fontFamily: 'Outfit-Medium', color: ColorPalatte.grey_400 }} title={'Check back after your first purchase!'} />
                            </View>
                            <ButtonComp type='mediumPrimary' title='Back to Home' onPress={() => navigation.navigate('BottomTab', { screen: 'Home' })} />
                        </View>
                    )
                )}


            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorPalatte.whiteClr,
        padding: 20
    }
})

export default OrderDeatils
