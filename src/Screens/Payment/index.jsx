import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ColorPalatte } from '../../Themes'
import { ButtonComp, SecondaryHeader, Typo } from '../../Components'
import { PriceDetails } from '../Order/Components'
import { PaymentMethods } from './Components'
import { Cash } from '../../Config/ImgConfig'
import { paymentOptions, proceedPayment } from '../../Redux/Action/Payments'
import { showToast } from '../../Utils/Helper/toastHelper'

const PaymentScreen = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { data, is_from } = route.params;

    const [paymentData, setPaymentData] = useState({
        paymentMethod: [],
        selectedPayment: {},
        paymentDetails: {}
    })

    useFocusEffect(
        useCallback(() => {
            dispatch(paymentOptions()).then((res) => {
                if (res?.payload?.status === 200) {
                    const data = res?.payload?.data?.response?.paymentOptions?.map((el) => ({
                        id: el?.id,
                        image: el?.image,
                        method: el?.method,
                        subName: el?.subName
                    }))
                    const paymentDetails = {
                        credit: res?.payload?.data?.credit,
                        status: res?.payload?.data?.status,
                        email: res?.payload?.data?.response?.email,
                        name: res?.payload?.data?.response?.name,
                        phone: res?.payload?.data?.response?.phone,
                    }
                    setPaymentData((prev) => ({ ...prev, paymentMethod: data, paymentDetails: paymentDetails }))
                }
            })
        }, [])
    );

    const priceDetails = useMemo(() => (
        <PriceDetails
            data={data?.products}
            deliveryCharges={data?.deliveryCharges}
            totalPrice={data?.deliveryTotal}
            isOpen={false}
        />
    ), [data]);

    const handlePayment = useCallback(() => {

        const payload = {
            paymentMethod: paymentData?.selectedPayment?.subName,
            timeSlot: data?.timeSlot,
            delivery_charges: data?.deliveryCharges,
            credits: paymentData?.paymentDetails?.credit,
            orderId: data?.orderId
        }

        dispatch(proceedPayment(payload)).then(async (res) => {
            if (res?.payload.status === 200) {
                try {
                    await AsyncStorage.removeItem('@products');
                    console.log('Products removed from local storage');
                    navigation.navigate('SuccessScreen', {
                        message: 'Successfully Order Placed',
                        is_from: is_from
                    })
                } catch (e) {
                    console.error('Error removing @products:', e);
                }
            }
        })
    }, [data, paymentData])

    return (
        <SafeAreaView style={styles.container}>
            <SecondaryHeader isBack screenName={'Payment'} onPressBack={() => navigation.goBack()} />
            <View style={{ paddingVertical: 20, gap: 20, flex: 1 }}>

                <ScrollView
                    contentContainerStyle={{ gap: 20, paddingBottom: 60 }}
                    showsVerticalScrollIndicator={false}
                >
                    {priceDetails}

                    <View>
                        <Typo type='h5' title={'Select Your Payment Method'} />
                        <PaymentMethods
                            data={paymentData?.paymentMethod}
                            onSelect={(val) => {
                                setPaymentData((prev) => ({ ...prev, selectedPayment: val }))
                            }}
                        />
                    </View>
                </ScrollView>

                {Object?.keys(paymentData?.selectedPayment)?.length > 0 && (
                    <View style={styles.button}>
                        <ButtonComp onPress={handlePayment} type='largePrimary' title='Place Order' />
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
    },
    button: {
        position: 'absolute',
        bottom: 20,
        width: '100%'
    }
})

export default PaymentScreen
