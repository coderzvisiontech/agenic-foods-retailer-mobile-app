import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { PrimaryHeader } from '../../Components'
import { ColorPalatte } from '../../Themes'

const CartScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <PrimaryHeader />
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

export default CartScreen
