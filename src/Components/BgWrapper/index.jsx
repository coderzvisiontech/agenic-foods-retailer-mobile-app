import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Keyboard
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { ColorPalatte } from '../../Themes';
import { StatusBarComp } from '../../Components';

const BackgroundWrapper = ({
    children,
    height = 100,
    image,
    alignBg
}) => {
    const [keyboard, setKeyboard] = useState({
        visible: false,
        keyboardHeight: 0
    });

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', (event) => {
            setKeyboard({
                visible: true,
                keyboardHeight: event?.endCoordinates?.height,
            });
        });

        const hideSub = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboard({
                visible: false,
                keyboardHeight: 0,
            });
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const fromTop = keyboard?.visible ? height + 10 - keyboard?.keyboardHeight : height + 10;

    return (
        <SafeAreaView style={styles.background}>
            <StatusBarComp visible={true} backgroundColor={ColorPalatte.whiteClr} />

            <View
                style={[
                    styles.logoContainer,
                    { height: height, paddingHorizontal: alignBg ? 20 : 0 },
                ]}
            >
                {image}
            </View>

            <KeyboardAwareScrollView
                style={[styles.container, { top: fromTop }]}
                enableOnAndroid={true}
                keyboardShouldPersistTaps="handled"
            >
                {children}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: ColorPalatte.whiteClr,
    },
    container: {
        position: 'absolute',
        backgroundColor: ColorPalatte.primaryClr_50,
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 20,
        flex: 1
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 100,
        position: 'relative'
    },
});

export default BackgroundWrapper;
