import React, { useState, useMemo, useCallback } from 'react'
import { View, StyleSheet, FlatList, Image } from 'react-native'
import { VITE_UPLOAD_IMG } from "@env"

import { RadioButton, Typo } from '../../../../Components'
import { Cash } from '../../../../Config/ImgConfig';
import { ColorPalatte } from '../../../../Themes';

const PaymentMethods = ({ data, onSelect }) => {
    const [selectedValue, setSelectedValue] = useState(null);

    const renderCard = useCallback(({ item }) => {
        const isSelected = selectedValue === item?.id;

        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                    <RadioButton
                        value={isSelected}
                        onChange={() => {
                            setSelectedValue(item?.id);
                            onSelect?.(item);
                        }}
                    />
                    <Typo style={styles.title} title={item?.method} />
                </View>
                {/* <Image
                    source={
                        item?.image ? { uri: `${VITE_UPLOAD_IMG}${item?.image}` } : require('../../../../Assets/Images/otp_bg.jpg')
                    }
                    resizeMode="contain"
                    style={styles.image}
                /> */}
                {/* {item?.icon} */}
                <Cash />
            </View>
        );
    }, [selectedValue, onSelect]);

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderCard}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: ColorPalatte.bgClr,
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginVertical: 10
    },
    title: {
        fontFamily: 'Outfit-Medium'
    }
})

export default PaymentMethods
