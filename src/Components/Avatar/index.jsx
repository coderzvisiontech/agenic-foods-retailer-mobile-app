import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ColorPalatte } from '../../Themes';
import { EditIcon } from '../../Config/ImgConfig';

const getInitials = (name = '') => {
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0][0]?.toUpperCase() || '';
    return (words[0][0] + words[1][0]).toUpperCase();
};

const Avatar = ({
    fullName = '',
    size = 100,
    backgroundColor = ColorPalatte.primaryClr_100,
    textColor = ColorPalatte.primartTxt,
    isEdit = false,
    onEditPress
}) => {
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
            {isEdit && (
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 3, padding: 3, backgroundColor: ColorPalatte.disableClr, borderRadius: 50 }} onPress={onEditPress}>
                    <EditIcon />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    initials: {
        fontWeight: 'bold',
    },
});

export default Avatar;
