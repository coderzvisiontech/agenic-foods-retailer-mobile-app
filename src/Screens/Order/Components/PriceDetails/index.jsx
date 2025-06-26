import React, { useCallback } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { ColorPalatte, FontSize } from '../../../../Themes'
import { Typo } from '../../../../Components'



const PriceDetails = ({ deliveryCharges, data, totalPrice }) => {
    const details = [];

    const delivery = [
        {
            product: "Delivery Charges",
            unit: deliveryCharges === 0 ? "Free" : 'Fee',
            total: deliveryCharges === 0 ? 0 : deliveryCharges
        }
    ]

    details?.push(...data, ...delivery);

    const renderItem = useCallback(({ item }) => {
        return (
            <View style={{ paddingVertical: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", flex: 1 }}>
                    <Typo style={{ fontFamily: 'Outfit-Medium' }} title={item?.product} />
                    <Typo type='h5' title={`₹${item?.total}`} />
                </View>
                <Typo style={styles.bottom} title={`(${item?.quantity || ''} ${item?.unit})`} />
            </View>
        );
    }, []);

    return (
        <View style={styles.container}>
            <Typo type='h5' title={'Price Details'} />

            <FlatList
                data={details}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <Typo type='h4' title={'Total Price'} />
                <Typo type='h4' title={`₹${totalPrice}`} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorPalatte.bgClr,
        paddingVertical: 24,
        paddingHorizontal: 16,
        borderRadius: 8,
        gap: 15
    },
    bottom: {
        color: ColorPalatte.grey_300,
        fontSize: FontSize.fontSize14
    }
})

export default PriceDetails
