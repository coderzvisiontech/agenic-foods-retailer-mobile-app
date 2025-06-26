import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';

import { BackIcon } from '../../Config/ImgConfig'
import { Typo } from "../../Components"

const SecondaryHeader = ({ isBack, screenName, onPressBack, onRefresh }) => {
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
            {onRefresh && (
                <TouchableOpacity onPress={onRefresh}>
                    <Feather name="refresh-cw" color="#000" size={18} />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default SecondaryHeader
