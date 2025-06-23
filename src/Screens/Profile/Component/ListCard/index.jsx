import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Typo } from '../../../../Components';
import { PrimaryRightIcon } from '../../../../Config/ImgConfig';
import { ColorPalatte } from '../../../../Themes';

const ListCard = ({ onItemPress, menuItems }) => {
    return (
        <View style={styles.listWrapper}>
            {menuItems?.map(item => (
                <TouchableOpacity
                    key={item?.key}
                    style={styles.card}
                    onPress={() => onItemPress?.(item?.key)}
                >
                    <View style={styles.title}>
                        {item?.icon}
                        <Typo type='h5' title={item?.name} style={styles.text} />
                    </View>
                    <PrimaryRightIcon />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    listWrapper: {
        width: '100%',
        gap: 16,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    text: {
        fontFamily: 'Outfit-Medium',
        color: ColorPalatte.primartTxt,
    },
});

export default ListCard;
