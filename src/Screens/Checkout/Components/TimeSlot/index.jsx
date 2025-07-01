import React, { useCallback, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { ColorPalatte, FontSize } from '../../../../Themes';
import { getDateData } from '../../../../Utils/Helper/formatHelper';

const TimeSlot = ({ slotTime = [], onSlotDate, onSlotTime }) => {
    const dateData = getDateData();

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const renderDateItem = useCallback(({ item }) => {
        const isSelected = selectedDate === item.date;

        const handlePress = () => {
            if (!item?.disabled) {
                setSelectedDate(item.date);
                const nativeDate = new Date(item.fullDate);
                onSlotDate?.(nativeDate.toString());
            }
        };

        return (
            <TouchableOpacity
                style={[
                    styles.dateItem,
                    item.disabled && styles.disabledDate,
                    isSelected && !item.disabled && styles.activeDate
                ]}
                onPress={handlePress}
                disabled={item.disabled}
            >
                <Text style={[
                    styles.dayText,
                    item.disabled && styles.disabledText,
                    isSelected && !item.disabled && styles.activeText
                ]}>
                    {item.day}
                </Text>
                <Text style={[
                    styles.dateText,
                    item.disabled && styles.disabledText,
                    isSelected && !item.disabled && styles.activeText
                ]}>
                    {item.date}
                </Text>
            </TouchableOpacity>
        );
    }, [selectedDate, onSlotDate]);

    const renderTimeSlot = useCallback((slot) => {
        const label = `${slot.starttime} - ${slot.endtime}`;
        const isSelected = selectedTime === slot._id;
        return (
            <TouchableOpacity
                key={slot._id}
                style={[
                    styles.timeSlot,
                    isSelected && { backgroundColor: ColorPalatte.primaryClr }
                ]}
                onPress={() => {
                    setSelectedTime(slot._id);
                    onSlotTime?.(slot);
                }}
            >
                <Text style={[
                    {
                        fontSize: FontSize.fontSize14,
                        color: ColorPalatte.grey_400,
                        fontFamily: 'Outfit-Medium'
                    },
                    isSelected && styles.activeText
                ]}>
                    {label}
                </Text>
            </TouchableOpacity>
        );
    }, [selectedTime, onSlotTime]);

    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                data={dateData}
                keyExtractor={(item) => item.fullDate}
                renderItem={renderDateItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10 }}
                style={{ marginBottom: 16 }}
            />
            {selectedDate && (
                <View style={styles.timeContainer}>
                    {slotTime?.map(renderTimeSlot)}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: ColorPalatte.grey_100,
        borderRadius: 8,
        paddingVertical: 24,
        paddingHorizontal: 16
    },
    dateItem: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: ColorPalatte.grey_200,
        minWidth: 60,
        gap: 10
    },
    activeDate: {
        backgroundColor: ColorPalatte.primaryClr,
        borderColor: ColorPalatte.primaryClr
    },
    disabledDate: {
        backgroundColor: ColorPalatte.disableClr,
        borderColor: ColorPalatte.grey_100,
        borderWidth: 0
    },
    dayText: {
        fontSize: FontSize.fontSize14,
        color: ColorPalatte.grey_400,
        fontFamily: 'Outfit-Medium'
    },
    dateText: {
        fontSize: FontSize.fontSize16,
        fontFamily: 'Outfit-Medium',
        color: ColorPalatte.primartTxt,
    },
    disabledText: {
        color: ColorPalatte.disableTxt
    },
    activeText: {
        color: ColorPalatte.whiteClr
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10
    },
    timeSlot: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: ColorPalatte.grey_200,
        alignItems: 'center',
    },
});

export default TimeSlot;
