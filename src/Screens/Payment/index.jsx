import React, { useMemo } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

import { ColorPalatte } from '../../Themes'
import { SecondaryHeader, Typo } from '../../Components'
import { PriceDetails } from '../Order/Components'
import { PaymentMethods } from './Components'
import { Cash } from '../../Config/ImgConfig'

const PaymentScreen = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { data } = route.params

    const dataVAl = [
        {
            title: 'Cash on Delivery',
            icon: <Cash />
        },
    ]

    const priceDetails = useMemo(() => (
        <PriceDetails
            data={data?.products}
            deliveryCharges={data?.deliveryCharges}
            totalPrice={data?.deliveryTotal}
            isOpen={false}
        />
    ), [data]);

    return (
        <SafeAreaView style={styles.container}>
            <SecondaryHeader isBack screenName={'Payment'} onPressBack={() => navigation.goBack()} />
            <View style={{ paddingVertical: 20, gap: 20 }}>
                {priceDetails}

                <View>
                    <Typo type='h5' title={'Select Your Payment Method'} />
                    <PaymentMethods
                        data={dataVAl}
                        onSelect={(title) => {
                            console.log("Selected Payment Method:", title);
                        }}
                    />
                </View>

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

export default PaymentScreen
