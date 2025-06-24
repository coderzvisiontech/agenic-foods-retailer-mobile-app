import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ColorPalatte, FontSize } from '../../../../Themes'
import { Typo } from '../../../../Components'

const data = {
    name: 'John Doe',
    address: '123 Main St, Springfield, USA',
    phone: '123-456-7890',
}

const AddressCard = ({ onChangeAddress }) => {
    return (
        <View style={{ backgroundColor: ColorPalatte.bgClr, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typo style={{ fontFamily: 'Outfit-Medium' }} type='h5' title='Address' />
                <TouchableOpacity onPress={onChangeAddress}>
                    <Typo style={{ fontFamily: 'Outfit-Medium', color: ColorPalatte.secondaryClr, fontSize: FontSize.fontSize14 }} title='Change' />
                </TouchableOpacity>
            </View>
            <View style={{ gap: 5, marginTop: 10 }}>
                <Typo style={{ color: ColorPalatte.primartTxt, fontWeight: 'bold' }} title={data?.name} />
                <Typo title={data?.address} style={{ color: ColorPalatte.secondaryTxt }} />
                <Typo title={data?.phone} style={{ color: ColorPalatte.secondaryTxt }} />
            </View>
        </View>
    )
}

export default AddressCard
