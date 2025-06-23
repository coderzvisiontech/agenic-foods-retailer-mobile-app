import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ColorPalatte } from '../../Themes';

const getInitials = (name = '') => {
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0][0]?.toUpperCase() || '';
    return (words[0][0] + words[1][0]).toUpperCase();
};

const Avatar = ({ fullName = '', size = 100, backgroundColor = ColorPalatte.primaryClr_100, textColor = ColorPalatte.primartTxt }) => {
    const initials = getInitials(fullName);

    return (
        <View
            style={[
                styles.avatar,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: backgroundColor,
                },
            ]}
        >
            <Text style={[styles.initials, { color: textColor, fontSize: size * 0.4, fontFamily: 'Outfit-Bold' }]}>
                {initials}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    initials: {
        fontWeight: 'bold',
    },
});

export default Avatar;
