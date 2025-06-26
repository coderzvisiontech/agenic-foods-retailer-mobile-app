import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { ButtonComp, OrderCard, SecondaryHeader, TextInput, Typo } from '../../Components'
import { ColorPalatte, FontSize } from '../../Themes'
import { NoOrder } from '../../Config/ImgConfig'
import { orderList } from '../../Redux/Action/Order'

const OrderDeatils = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { order } = useSelector(state => state.order);

    useFocusEffect(useCallback(() => {
        dispatch(orderList())
    }, [dispatch]));

    const renderItem = useCallback(({ item }) => {
        return (
            <OrderCard
                data={item}
                onOrderPress={() => navigation.navigate('OrderDetailScreen', { id: item?.id })}
            />
        );
    }, []);

    const orderData = useMemo(() => {
        return order?.response?.document?.map((item) => ({
            ...item,
            id: item?.id,
            cartCount: item?.cart,
        })) || [];
    }, [order]);

    return (
        <SafeAreaView style={styles.container}>
            <SecondaryHeader isBack screenName={'Orders'} onPressBack={() => navigation.goBack()} />
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <TextInput
                    placeholder={'Search'}
                    type='search'
                />

                {orderData?.length > 0 ? (
                    <FlatList
                        data={orderData}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
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
