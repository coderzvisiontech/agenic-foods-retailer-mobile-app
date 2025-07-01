import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';

import { BackIcon } from '../../Config/ImgConfig'
import { RefreshButton, Typo } from "../../Components"
import { ColorPalatte } from '../../Themes';

const SecondaryHeader = ({ isBack, screenName, onPressBack, onRefresh, isClear, onClear }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: "center", position: 'relative', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: "center", position: 'relative' }}>
                {isBack && (
                    <TouchableOpacity onPress={onPressBack}>
                        <BackIcon />
                    </TouchableOpacity>
                )}

                {screenName && (
                    <Typo type='h3' title={screenName} />
                )}
            </View>
            {onRefresh && <RefreshButton onRefresh={onRefresh} />}

            {isClear && (
                <TouchableOpacity onPress={onClear}>
                    <Typo style={styles.clearAll} title={'Clear All'} />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    clearAll: {
        fontFamily: 'Outfit-Medium',
        color: ColorPalatte.secondaryClr
    }
})

export default SecondaryHeader
