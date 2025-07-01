import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Typo } from '../../../../Components'
import { GoldCoin } from '../../../../Config/ImgConfig'
import { ColorPalatte } from '../../../../Themes'

const CreditCard = () => {
    const [creditPoints, setCreditPoints] = useState(null);

    useEffect(() => {
        const fetchCreditPoints = async () => {
            try {
                const value = await AsyncStorage.getItem('credit_points');
                if (value !== null) {
                    setCreditPoints(value);
                }
            } catch (error) {
                console.error('Failed to load credit_points', error);
            }
        };
        fetchCreditPoints();
    }, []);

    return (
        <View style={styles.wrapper}>
            <View>
                <Typo type='h1' style={{ color: ColorPalatte.whiteClr }} title={`₹${creditPoints || 0.0}`} />
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
