import React, { useCallback, useMemo, useState } from 'react'
import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { BottomCard, SecondaryHeader, Typo } from '../../Components'
import { ColorPalatte } from '../../Themes'
import { AddressCard, TimeSlotCart } from './Components'
import { cartList, cartTimeslot } from '../../Redux/Action/Cart'
import { PriceDetails } from '../Order/Components'
import { getISTFullDate } from '../../Utils/CommonFunctions'
import { orderList, placeOrder } from '../../Redux/Action/Order'
import { showToast } from '../../Utils/Helper/toastHelper'

const CheckoutScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state.cart);
    const { order } = useSelector(state => state.order);

    const [checkoutData, setCheckoutData] = useState({
        timeSlot: [],
        selectedSlot: [],
        sheduledate: ''
    })

    useFocusEffect(
        useCallback(() => {
            dispatch(cartList());
        }, [])
    );

    const mappedData = useMemo(() => {
        return cart?.response?.map((el) => ({
            parent_id: el?.id,
            quantity: el?.selectedQuantity,
            product_id: el?.product?.id,
            product: el?.product?.name,
            total: el?.product?.price,
            totalQuantity: el?.product?.totalQuantity,
            unit: el?.product?.unit
        })) || [];
    }, [cart?.response]);

    const priceDetails = useMemo(() => (
        <PriceDetails
            data={mappedData}
            deliveryCharges={cart?.delivery_charges}
            totalPrice={cart?.total}
        />
    ), [mappedData, cart?.delivery_charges, cart?.total]);

    const handleCheckout = () => {
        const cartItems = mappedData?.map((el) => ({
            product_id: el?.product_id,
            quantity: el?.quantity,
            price: el?.total,
            total: el?.total * el?.quantity
        }))

        const payload = {
            slottime: `${checkoutData.selectedSlot.starttime} - ${checkoutData.selectedSlot.endtime}`,
            cart_detail: cartItems,
            sub_total: cart?.total,
            grand_total: cart?.total,
            delivery_charges: cart?.delivery_charges,
            location: {},
            sheduledate: checkoutData?.sheduledate,
            address: {},
            availability_address: {}
        }
        if (!checkoutData.selectedSlot.starttime && !checkoutData.selectedSlot.endtime && !checkoutData.sheduledate) {
            showToast('error', 'Please select Slot Date for delivery');
            return;
        }
        dispatch(placeOrder(payload)).then((res) => {
            if (res?.payload?.status === 200) {
                showToast('success', 'Please proceed with payment')
                setTimeout(() => {
                    navigation.navigate('PaymentScreen', { data: { products: mappedData, deliveryCharges: cart?.delivery_charges, deliveryTotal: cart?.total } })
                }, 1000)
            } else if (res?.payload?.status) {
                showToast('error', res?.payload?.message)
            } else {
                showToast('error', 'Something went wrong')
            }
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <SecondaryHeader isBack onPressBack={() => navigation.goBack()} screenName={'Checkout'} />
            <View style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ paddingVertical: 20, gap: 24, paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    <AddressCard />
                    <View style={{ gap: 5 }}>
                        <Typo type='h5' title={'Slot Date'} />
                        <TimeSlotCart
                            slotTime={checkoutData?.timeSlot}
                            onSlotDate={(fullDate) => {
                                setCheckoutData((prev) => ({ ...prev, sheduledate: getISTFullDate(fullDate) }))
                                dispatch(cartTimeslot({ timeDate: getISTFullDate(fullDate) }))
                                    .then((res) => {
                                        const data = res?.payload?.data?.data?.map((el) => ({
                                            ...el,
                                            label: `${el.starttime} - ${el.endtime}`
                                        }));
                                        setCheckoutData((prev) => ({ ...prev, timeSlot: data }));
                                    });
                            }}
                            onSlotTime={(slotObj) => {
                                setCheckoutData((prev) => ({
                                    ...prev,
                                    selectedSlot: slotObj
                                }))
                            }}
                        />
                    </View>
                    {priceDetails}
                </ScrollView>
                <BottomCard
                    onPress={handleCheckout}
                    isAlign
                    isTotal={false}
                    items={mappedData}
                    bottom={0}
                    btnTitle='Proceed to Pay'
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPalatte.whiteClr,
        padding: 20,
        flex: 1
    }
})

export default CheckoutScreen
