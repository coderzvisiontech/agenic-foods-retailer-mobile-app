import React, { useCallback, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    LayoutAnimation,
    UIManager,
    Platform
} from 'react-native';
import { ColorPalatte, FontSize } from '../../../../Themes';
import { Typo } from '../../../../Components';
import { DownIcon, UpIcon } from '../../../../Config/ImgConfig';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PriceDetails = ({ deliveryCharges, data, totalPrice, isOpen = true }) => {
    const [expanded, setExpanded] = useState(isOpen);

    const details = [];
    const delivery = [
        {
            product: "Delivery Charges",
            unit: deliveryCharges === 0 ? "Free" : 'Fee',
            total: deliveryCharges === 0 ? 0 : deliveryCharges
        }
    ];

    details.push(...data, ...delivery);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(prev => !prev);
    };

    const renderItem = useCallback(({ item }) => (
        <View style={{ paddingVertical: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                <Typo style={{ fontFamily: 'Outfit-Medium' }} title={item?.product} />
                <Typo type='h5' title={`₹${item?.total}`} />
            </View>
            <Typo style={styles.bottom} title={`(${item?.quantity || ''} ${item?.unit})`} />
        </View>
    ), []);

    return (
        <TouchableOpacity activeOpacity={1} onPress={toggleExpand} style={[styles.container, { backgroundColor: !expanded ? ColorPalatte.primaryClr_50 : ColorPalatte.bgClr }]}>
            {expanded && (
                <>
                    <Typo type='h5' title={'Price Details'} />
                    <View style={styles.separator} />
                    <FlatList
                        data={details}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                    />
                    <View style={styles.separator} />
                </>
            )}
            <View style={styles.totalRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Typo type='h4' title={'Total Price'} />
                    {expanded ? <UpIcon /> : <DownIcon />}
                </View>
                <Typo type='h4' title={`₹${totalPrice}`} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: ColorPalatte.primaryClr_50,
        paddingVertical: 24,
        paddingHorizontal: 16,
        borderRadius: 8,
        gap: 15
    },
    bottom: {
        color: ColorPalatte.grey_300,
        fontSize: FontSize.fontSize14
    },
    separator: {
        borderStyle: 'dotted',
        borderWidth: 1,
        borderRadius: 1,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});

export default PriceDetails;
