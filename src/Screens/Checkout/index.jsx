import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { SecondaryHeader } from '../../Components'
import { ColorPalatte } from '../../Themes'
import useUserData from '../../Hooks/useFetchUser'
import { AddressCard } from './Components'

const CheckoutScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user } = useUserData();


    return (
        <SafeAreaView style={styles.container}>
            <SecondaryHeader isBack onPressBack={() => navigation.goBack()} screenName={'Checkout'} />
            <View style={{ paddingVertical: 20 }}>
                <AddressCard />
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
