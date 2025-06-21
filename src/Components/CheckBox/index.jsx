import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ColorPalatte, FontSize } from '../../Themes';

const CheckboxComp = ({
    value = false,
    onValueChange = () => { },
    label = '',
    disabled = false,
    style = {},
    labelStyle = {},
    iconSize = 22,
}) => {
    return (
        <TouchableOpacity
            style={[styles.wrapper, style, disabled && { opacity: 0.5 }]}
            activeOpacity={0.8}
            onPress={() => !disabled && onValueChange(!value)}
            disabled={disabled}
        >
            <View style={[styles.box, value && styles.boxChecked]}>
                {value && (
                    <MaterialIcons
                        name="check"
                        size={iconSize - 8}
                        color={ColorPalatte.whiteClr}
                    />
                )}
            </View>
            {label ? (
                <Text style={[styles.label, labelStyle]}>
                    {label}
                </Text>
            ) : null}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    box: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: ColorPalatte.grey_300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorPalatte.whiteClr,
    },
    boxChecked: {
        backgroundColor: ColorPalatte.primaryClr,
        borderColor: ColorPalatte.primaryClr,
    },
    label: {
        marginLeft: 10,
        color: ColorPalatte.blackClr,
        fontSize: FontSize.fontSize14,
    },
});

export default CheckboxComp;
