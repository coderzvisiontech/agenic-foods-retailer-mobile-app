import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ColorPalatte } from '../../Themes';
import { Typo } from '../../Components';
import { RightIcon } from '../../Config/ImgConfig';

const BottomCard = ({ items = [], onPress, btnTitle = 'Add to Cart', isRight = false, bottom, isTotal = true, isAlign }) => {
    const translateY = useRef(new Animated.Value(100)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (items?.length > 0) {
            Animated.parallel([
                Animated.spring(translateY, {
                    toValue: 0,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 100,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [items?.length]);

    const totalAmount = items?.reduce((sum, item) => sum + (item?.price || item?.total) * item?.quantity, 0);

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateY }],
                    opacity,
                    bottom: bottom,
                    left: isAlign ? 0 : 20,
                    right: isAlign ? 0 : 20,
                    width: isAlign ? '100%' : ''
                },
            ]}
        >
            <View>
                {isTotal && (
                    <Typo title={`Total ${items.length} item${items.length > 1 ? 's' : ''}`} />
                )}
                <Typo type='h3' title={`₹${(totalAmount).toFixed(2)}`} />
            </View>

            <TouchableOpacity onPress={onPress}>
                <View style={styles.button}>
                    <Typo style={{ fontFamily: 'Outfit-Bold', color: ColorPalatte.whiteClr }} title={btnTitle} />
                    {isRight && (
                        <RightIcon />
                    )}
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPalatte.whiteClr,
        position: 'absolute',
        // left: 20,
        // right: 20,
        height: 81,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        // width: '100%',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
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

export default BottomCard