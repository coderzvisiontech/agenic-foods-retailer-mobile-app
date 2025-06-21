import React, { useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { ColorPalatte, FontSize } from '../../Themes';

const { width } = Dimensions.get('window');

const OTPInput = ({ length = 6, value, setValue, autoFocus = true }) => {
    const inputs = useRef([]);

    useEffect(() => {
        if (autoFocus && inputs.current[0]) {
            inputs.current[0].focus();
        }
    }, [autoFocus]);

    const handleChange = (text, index) => {
        const numericText = text.replace(/[^0-9]/g, '');

        const newValue = value.split('');

        if (numericText.length > 1) {
            const pastedDigits = numericText.slice(0, length - index).split('');
            for (let i = 0; i < pastedDigits.length && (index + i) < length; i++) {
                newValue[index + i] = pastedDigits[i];
            }
            setValue(newValue.join(''));

            const nextIndex = Math.min(index + pastedDigits.length, length - 1);
            if (inputs.current[nextIndex]) {
                inputs.current[nextIndex].focus();
            }
        } else {
            newValue[index] = numericText;
            setValue(newValue.join(''));

            if (numericText && index < length - 1) {
                inputs.current[index + 1].focus();
            }
        }
    };

    const handleKeyPress = (e, index) => {
        const key = e.nativeEvent.key;

        if (key === 'Backspace') {
            const newValue = value.split('');

            if (value[index]) {
                newValue[index] = '';
                setValue(newValue.join(''));
            } else if (index > 0) {
                newValue[index - 1] = '';
                setValue(newValue.join(''));
                inputs.current[index - 1].focus();
            }
        }
    };

    const handleFocus = (index) => {
        if (inputs.current[index]) {
            inputs.current[index].setSelection(0, 1);
        }
    };

    return (
        <View style={styles.container}>
            {Array.from({ length }).map((_, i) => (
                <TextInput
                    key={i}
                    ref={(ref) => (inputs.current[i] = ref)}
                    value={value[i] || ''}
                    onChangeText={(text) => handleChange(text, i)}
                    onKeyPress={(e) => handleKeyPress(e, i)}
                    onFocus={() => handleFocus(i)}
                    keyboardType="number-pad"
                    maxLength={1}
                    style={[
                        styles.box,
                        value[i] ? styles.filledBox : styles.emptyBox
                    ]}
                    textAlign="center"
                    selectTextOnFocus={true}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    box: {
        borderWidth: 1.5,
        borderRadius: 8,
        padding: 10,
        width: 48,
        height: 48,
        fontSize: FontSize.fontSize20,
        color: ColorPalatte.primartTxt,
        textAlign: 'center',
    },
    emptyBox: {
        borderColor: ColorPalatte.grey_200,
        backgroundColor: 'transparent',
    },
    filledBox: {
        borderColor: ColorPalatte.grey_200,
        backgroundColor: ColorPalatte.grey_50
    },
});

export default OTPInput;