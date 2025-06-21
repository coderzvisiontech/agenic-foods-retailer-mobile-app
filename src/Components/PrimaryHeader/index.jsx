import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { LogoIcon, NotificationIcon, CartIcon } from '../../Config/ImgConfig'
import { useNavigation } from '@react-navigation/native'
import { ColorPalatte, FontSize } from '../../Themes'

const PrimaryHeader = ({ isBack, isNotification = true, isCart = true, onNotifyPress, onCartPress, notifyCount, cartCount }) => {
    const navigation = useNavigation();

    return (
        <View style={{ flexDirection: 'row', alignItems: "center", position: 'relative', justifyContent: "space-between" }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <LogoIcon />
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', gap: 10 }}>
                {isNotification && (
                    <TouchableOpacity onPress={onNotifyPress}>
                        <View style={{ position: 'relative' }}>
                            <NotificationIcon color={ColorPalatte.blackClr} />
                            {notifyCount && (
                                <View style={styles.badge}>
                                    <Text style={{ color: ColorPalatte.whiteClr, fontSize: FontSize.fontSize10, fontWeight: 'bold' }}>{notifyCount}</Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                )}

                {isCart && (
                    <TouchableOpacity onPress={onCartPress}>
                        <View style={{ position: 'relative' }}>
                            <CartIcon color={ColorPalatte.blackClr} />
                            {cartCount && (
                                <View style={styles.badge}>
                                    <Text style={{ color: ColorPalatte.whiteClr, fontSize: FontSize.fontSize10, fontWeight: 'bold' }}>{cartCount}</Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        top: -4,
        right: -2,
        backgroundColor: 'red',
        borderRadius: 8,
        width: 14,
        height: 14,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default PrimaryHeader
