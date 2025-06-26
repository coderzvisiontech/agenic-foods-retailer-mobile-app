import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { VITE_UPLOAD_IMG } from "@env"

import { ColorPalatte, FontSize } from '../../Themes'
import { Typo } from "../../Components"
import { BlackRIght } from '../../Config/ImgConfig'
import { formatList } from '../../Utils/CommonFunctions'

const OrderCard = ({ data, onOrderPress, isOrder = true }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onOrderPress}>
            <Image
                source={
                    // data?.image ? { uri: `${VITE_UPLOAD_IMG}${data?.image}` } :
                    require('../../Assets/Images/otp_bg.jpg')
                }
                style={styles.image}
                resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
                {isOrder ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typo style={{ fontSize: FontSize.fontSize18 }} title={data?.order_status} />
                        <BlackRIght style={{ color: 'black' }} />
                    </View>
                ) : (
                    <Typo ellipsis={true} tailWidth={180} style={{ fontSize: FontSize.fontSize18, fontFamily: 'Outfit-Medium' }} title={data?.cartDetail?.length > 1 ? formatList(data?.cartDetail?.map((el) => el?.product)) : data?.cartDetail?.[0]?.product} />
                )}
                {isOrder ? (
                    <Typo tailWidth={170} ellipsis={true} style={styles.orderName} title={data?.productDetail?.length > 1 ? formatList(data?.productDetail) : data?.productDetail} />
                ) : (
                    <Typo style={styles.orderQty} title={`Qty: ${data?.cartDetail?.length}`} />
                )}
                {isOrder ? (
                    <Typo style={styles.orderId} title={`Order Id: ${data?.order_id}`} />
                ) : (
                    <Typo style={styles.price} type='h4' title={`₹${data?.grand_total}`} />
                )}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPalatte.bgClr,
        borderRadius: 12,
        flexDirection: 'row',
        padding: 12,
        marginVertical: 8,
        gap: 10
    },
    image: {
        width: 93,
        height: 84,
        borderRadius: 8,
    },
    orderName: {
        fontSize: FontSize.fontSize16,
        color: ColorPalatte.secondaryTxt,
        fontFamily: 'Outfit-Medium',
        paddingBottom: 15
    },
    orderId: {
        fontSize: FontSize.fontSize12,
        color: ColorPalatte.secondaryTxt,
        fontFamily: 'Outfit-Regular',
    },
    orderQty: {
        fontSize: FontSize.fontSize12,
        color: ColorPalatte.grey_300,
        fontFamily: 'Outfit-Regular',
        paddingBottom: 15
    },
    price: {
        fontFamily: 'Outfit-Bold'
    }
})

export default OrderCard
