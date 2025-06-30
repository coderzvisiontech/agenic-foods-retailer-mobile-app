import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ColorPalatte, FontSize } from '../../../../Themes'
import { Typo } from '../../../../Components'

const AddressCard = ({ onChangeAddress, user }) => {
    return (
        <View style={{ backgroundColor: ColorPalatte.bgClr, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typo style={{ fontFamily: 'Outfit-Medium' }} type='h5' title='Address' />
                <TouchableOpacity onPress={onChangeAddress}>
                    <Typo style={{ fontFamily: 'Outfit-Medium', color: ColorPalatte.secondaryClr, fontSize: FontSize.fontSize14 }} title='Change' />
                </TouchableOpacity>
            </View>
            <View style={{ gap: 5, marginTop: 10 }}>
                <Typo style={{ color: ColorPalatte.primartTxt, fontWeight: 'bold' }} title={user?.name} />
                <Typo title={user?.availability_address} style={{ color: ColorPalatte.secondaryTxt }} />
                <Typo title={user?.phone_number} style={{ color: ColorPalatte.secondaryTxt }} />
            </View>
        </View>
    )
}

export default AddressCard
