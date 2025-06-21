import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { ColorPalatte, FontSize } from '../../Themes';
import { Typo } from '../../Components';

const CountryCodePickerComp = ({
    onChange = () => { },
    containerStyle = {},
    pickerStyles = {},
}) => {
    const [countryCode, setCountryCode] = useState('IN');
    const [callingCode, setCallingCode] = useState('91');

    const handleSelect = (country) => {
        setCountryCode(country.cca2);
        setCallingCode(country.callingCode[0]);
        onChange(country);
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <TouchableOpacity style={styles.touchable}>
                <CountryPicker
                    countryCode={countryCode}
                    withFlag
                    withCallingCode
                    withFilter
                    withAlphaFilter
                    withCallingCodeButton={false}
                    withEmoji
                    onSelect={handleSelect}
                    containerButtonStyle={pickerStyles}
                    theme={{
                        backgroundColor: '#fff',
                        onBackgroundTextColor: ColorPalatte.blackClr,
                    }}
                />
                <Typo title={`+${callingCode}`} style={styles.callingCodeText} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        paddingHorizontal: 12,
        paddingVertical: 9,
        backgroundColor: ColorPalatte.whiteClr,
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },
    touchable: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    callingCodeText: {
        fontSize: FontSize.fontSize16,
        color: ColorPalatte.blackClr,
    },
});

export default CountryCodePickerComp;
