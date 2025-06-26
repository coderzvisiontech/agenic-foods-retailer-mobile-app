import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { ColorPalatte } from '../../Themes';

const CustomRadioButton = ({ value, onChange }) => {
    return (
        <TouchableOpacity style={radioStyles.outerCircle} onPress={onChange}>
            {value && <View style={radioStyles.innerCircle} />}
        </TouchableOpacity>
    );
};

const radioStyles = StyleSheet.create({
    outerCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: ColorPalatte.primaryClr,
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: ColorPalatte.primaryClr
    }
});

export default CustomRadioButton;
