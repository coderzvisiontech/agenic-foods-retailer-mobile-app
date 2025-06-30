import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Typo } from '../../../../Components'
import { GoldCoin } from '../../../../Config/ImgConfig'
import { ColorPalatte } from '../../../../Themes'

const CreditCard = () => {
    return (
        <View style={styles.wrapper}>
            <View>
                <Typo type='h1' style={{ color: ColorPalatte.whiteClr }} title='₹0.0' />
                <Typo
                    style={{
                        color: ColorPalatte.whiteClr,
                        fontFamily: 'Outfit-Medium',
                    }}
                    title='Balance Credit Points'
                />
            </View>
            <View style={styles.coinWrapper}>
                <GoldCoin />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: ColorPalatte.primaryClr,
        borderRadius: 12,
        padding: 20,
        height: 171,
        overflow: 'hidden',
        borderRadius: 8
    },
    label: {
        color: ColorPalatte.whiteClr,
        fontFamily: 'Outfit-Medium',
    },
    coinWrapper: {
        position: 'absolute',
        right: -15,
        bottom: -10,
    },
})

export default CreditCard
