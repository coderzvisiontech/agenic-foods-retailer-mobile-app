import React, { useRef, useEffect } from 'react';
import { SafeAreaView, View, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SuccessIcon } from '../../Config/ImgConfig'
import { Typo } from '../../Components'
import { ColorPalatte } from '../../Themes'

const SuccessScreen = ({ route }) => {
    const { message, screenRoute, screen } = route.params
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => {
                if (screenRoute && screenRoute?.routeName) {
                    navigation.navigate(screenRoute?.routeName, screenRoute?.params || {});
                } else if (screen) {
                    navigation.navigate(screen);
                }
            }, 1000);
        });
    }, [fadeAnim, navigation]);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 25, backgroundColor: ColorPalatte.whiteClr }}>
            <Animated.View style={{ opacity: fadeAnim }}>
                <SuccessIcon />
            </Animated.View>
            <View style={{ paddingHorizontal: 40 }}>
                <Typo style={{ textAlign: 'center' }} type='h3' title={message} />
            </View>
        </SafeAreaView>
    )
}

export default SuccessScreen
