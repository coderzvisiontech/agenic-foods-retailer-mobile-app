import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ColorPalatte } from '../../../../Themes';
import { Typo } from '../../../../Components';
import { RightIcon } from '../../../../Config/ImgConfig';

const AddCart = ({ items = [], onViewCart }) => {
    const totalAmount = items?.reduce((sum, item) => sum + item?.price * item?.quantity, 0);

    return (
        <View style={styles.container}>
            <View>
                <Typo title={`Total ${items.length} item${items.length > 1 ? 's' : ''}`} />
                <Typo type='h3' title={`₹${totalAmount.toFixed(2)}`} />
            </View>

            <TouchableOpacity onPress={onViewCart}>
                <View style={styles.button}>
                    <Typo style={{ fontFamily: 'Outfit-Bold', color: ColorPalatte.whiteClr }} title='Add to Cart' />
                    {/* <RightIcon /> */}
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPalatte.whiteClr,
        position: 'absolute',
        bottom: 10,
        left: 20,
        right: 20,
        height: 81,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
        borderWidth: 0.5,
        borderColor: ColorPalatte.grey_100,
    },
    button: {
        backgroundColor: ColorPalatte.primaryClr,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 13,
        paddingVertical: 10,
        borderRadius: 8,
    },
});

export default AddCart;
