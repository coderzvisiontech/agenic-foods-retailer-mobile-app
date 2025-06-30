import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckIcon } from '../../Config/ImgConfig';
import { ColorPalatte, FontSize } from '../../Themes';

const steps = [
    'Order Received',
    'Order Packed',
    'On the way',
    'Delivered',
];

const StatusTracking = ({ deliveryStatus }) => {    
    const currentStepName = useMemo(() => {
        const order_status = deliveryStatus?.order_status?.toLowerCase();
        const outofDelivery = deliveryStatus?.outofDelivery;

        switch (order_status) {
            case 'new order':
                return 'Order Received';
            case 'inprogress':
                return outofDelivery === 1 ? 'Order Packed' : 'On the way';
            case 'completed':
                return 'Delivered';
            default:
                return '';
        }
    }, [deliveryStatus]);

    const currentStepIndex = steps.indexOf(currentStepName);

    return (
        <View style={styles.container}>
            {steps.map((step, index) => {
                const isActive = index === currentStepIndex;
                const isCompleted = index < currentStepIndex;

                return (
                    <View key={index} style={styles.stepRow}>
                        <View style={styles.iconColumn}>
                            <View style={styles.circleWrapper}>
                                {isCompleted || isActive ? (
                                    <CheckIcon />
                                ) : (
                                    <View style={styles.inactiveCircle} />
                                )}
                            </View>
                            {index !== steps.length - 1 && (
                                <View style={styles.lineWrapper}>
                                    <View
                                        style={[
                                            styles.verticalLine,
                                            (isCompleted || isActive) && styles.activeLine,
                                        ]}
                                    />
                                </View>
                            )}
                        </View>

                        <Text
                            style={[
                                { fontSize: FontSize.fontSize14 },
                                isCompleted || isActive
                                    ? styles.activeLabel
                                    : styles.inactiveLabel,
                            ]}
                        >
                            {step}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
};

const CIRCLE_SIZE = 16;

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPalatte.primaryClr_50,
        borderRadius: 12,
        padding: 24,
    },
    stepRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    iconColumn: {
        alignItems: 'center',
        marginRight: 12,
        width: CIRCLE_SIZE,
    },
    circleWrapper: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inactiveCircle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        borderWidth: 1,
        borderColor: ColorPalatte.grey_300,
        backgroundColor: ColorPalatte.whiteClr,
    },
    verticalLine: {
        width: 1,
        height: 30,
        backgroundColor: ColorPalatte.grey_300,
        marginTop: 6,
    },
    activeLine: {
        backgroundColor: ColorPalatte.successClr,
    },
    activeLabel: {
        color: ColorPalatte.primartTxt,
        fontFamily: 'Outfit-Medium',
    },
    inactiveLabel: {
        color: ColorPalatte.grey_400,
        fontFamily: 'Outfit-Medium',
    },
});

export default StatusTracking;
