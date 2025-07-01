import React, { useRef } from 'react';
import { TouchableOpacity, Animated, Easing } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const RefreshButton = ({ onRefresh }) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    const handleRefreshPress = () => {
        onRefresh?.();

        rotateAnim.setValue(0);
        Animated.sequence([
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 0,
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg']
    });

    return (
        <TouchableOpacity onPress={handleRefreshPress}>
            <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
                <Feather name="refresh-cw" color="#000" size={18} />
            </Animated.View>
        </TouchableOpacity>
    );
};

export default RefreshButton;
