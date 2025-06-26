import React, { useState, useMemo, useCallback } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { RadioButton, Typo } from '../../../../Components'
import { Cash } from '../../../../Config/ImgConfig';
import { ColorPalatte } from '../../../../Themes';

const PaymentMethods = ({ data, onSelect }) => {
    const [selectedValue, setSelectedValue] = useState(null);

    const renderCard = useCallback(({ item }) => {
        const isSelected = selectedValue === item.title;

        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                    <RadioButton
                        value={isSelected}
                        onChange={() => {
                            setSelectedValue(item.title);
                            onSelect?.(item.title);
                        }}
                    />
                    <Typo style={styles.title} title={item?.title} />
                </View>
                {item?.icon}
            </View>
        );
    }, [selectedValue, onSelect]);

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.title}
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
