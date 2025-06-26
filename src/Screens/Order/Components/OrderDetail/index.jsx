import React, { useCallback, useState } from 'react'
import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

import { ColorPalatte, FontSize } from '../../../../Themes'
import { ButtonComp, OrderCard, SecondaryHeader, StatusTracking, Typo } from '../../../../Components'
import { orderDetails } from '../../../../Redux/Action/Order'
import PriceDetails from '../PriceDetails'

const OrderDetailScreen = ({ route }) => {
    const { id, data } = route.params
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [orderData, setOrderDetails] = useState({
        order: [],
        infoState: {
            loading: false
        }
    })

    useFocusEffect(useCallback(() => {
        setOrderDetails((prev) => ({
            ...prev,
            infoState: {
                loading: true
            }
        }))
        dispatch(orderDetails({ id: id })).then((res) => {
            if (res?.payload?.status === 200) {
                const data = res?.payload.data.response?.map((el) => ({
                    delivery_address: el?.delivery_address,
                    delivery_charges: el?.delivery_charges,
                    grand_total: el?.grand_total,
                    id: el?.id,
                    order_id: el?.order_id,
                    retailer: el?.retailer,
                    sub_total: el?.sub_total,
                    cartDetail: el?.cartDetail,
                }))
                setOrderDetails((prev) => ({
                    ...prev,
                    order: data,
                    infoState: {
                        loading: false
                    }
                }))
            }
        })
    }, [id]
    ));

    return (
        <SafeAreaView style={styles.container}>
            <SecondaryHeader isBack screenName={'Orders'} onPressBack={() => navigation.goBack()} />
            <ScrollView
                contentContainerStyle={{ paddingVertical: 20, gap: 10, paddingBottom: 60 }}
                showsVerticalScrollIndicator={false}
            >

                <View style={{ gap: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Typo style={[styles.header, { color: ColorPalatte.grey_300 }]} title={'Order Placed By : '} />
                        <Typo style={[styles.header, { color: ColorPalatte.secondaryTxt }]} title={orderData?.order?.[0]?.retailer} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Typo style={[styles.header, { color: ColorPalatte.grey_300 }]} title={'Order ID : '} />
                        <Typo style={[styles.header, { color: ColorPalatte.secondaryTxt }]} title={`#${orderData?.order?.[0]?.order_id}`} />
                    </View>
                    <OrderCard isOrder={false} data={orderData?.order?.[0]} />
                </View>

                <View style={{ gap: 5 }}>
                    <Typo type='h5' title={'Orders Status'} />
                    <StatusTracking currentStepName={data?.trackingStatus} />
                </View>

                <View style={{ gap: 5 }}>
                    <Typo type='h5' title={'Delivery Details'} />
                    <View style={styles.addressWrapper}>
                        <Typo style={{ fontFamily: 'Outfit-Medium' }} title={data?.name || 'Krishana Raj'} />
                        <Typo style={{ color: ColorPalatte.secondaryTxt }} title={orderData?.order?.[0]?.delivery_address || 'No:5/89 Iyyappanagar, Porur, Chennai-56 '} />
                    </View>
                </View>

                <View style={{ gap: 5 }}>
                    <Typo type='h5' title={'Price Details'} />
                    <PriceDetails
                        data={orderData?.order?.[0]?.cartDetail}
                        deliveryCharges={orderData?.order?.[0]?.delivery_charges}
                        totalPrice={orderData?.order?.[0]?.grand_total}
                    />
                </View>

            </ScrollView>
            <View style={styles.invoiceWrapper}>
                <ButtonComp type='largePrimary' title='Download Invoice' />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorPalatte.whiteClr,
        padding: 20,
    },
    header: {
        fontSize: FontSize.fontSize14,

    },
    addressWrapper: {
        backgroundColor: ColorPalatte.bgClr,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    invoiceWrapper: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        left: 20,
        right: 20,
    }
})

export default OrderDetailScreen
