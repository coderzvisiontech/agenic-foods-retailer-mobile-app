import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { BackIcon } from '../../Config/ImgConfig'
import { Typo } from "../../Components"

const SecondaryHeader = ({ isBack, screenName, onPressBack }) => {
    return (
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
    )
}

export default SecondaryHeader
