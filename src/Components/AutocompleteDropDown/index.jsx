import React, { useMemo, useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { Typo } from "../../Components";
import { ColorPalatte, FontSize } from "../../Themes";
import { SearchIcon } from "../../Config/ImgConfig"; // This should return a valid React component

const SearchDropdown = ({
    data = [],
    placeholder = "Enter",
    onSelect,
    onChangeText,
    label,
    style,
    isMandatory,
    error,
}) => {
    const formattedData = useMemo(() => {
        return data?.map((item) => ({
            id: item?.place_id ?? item?.key?.toString(),
            title: item?.description ?? item?.value,
        }));
    }, [data]);

    return (
        <View style={[styles.textContainer, style]}>
            {label && (
                <View style={styles.labelWrapper}>
                    <Typo label={label} style={styles.label} labelText />
                    {isMandatory && <Text style={styles.asterisk}>*</Text>}
                </View>
            )}

            <View style={styles.inputWithIcon}>
                <View style={styles.iconWrapper}>
                    <SearchIcon />
                </View>

                <AutocompleteDropdown
                    clearOnFocus={false}
                    closeOnBlur={true}
                    closeOnSubmit={false}
                    dataSet={formattedData}
                    onChangeText={onChangeText}
                    onSelectItem={(item) => {
                        if (item) {
                            onSelect?.(item.id);
                        }
                    }}
                    inputContainerStyle={[
                        styles.inputWrapper,
                        error ? styles.inputError : null,
                        { paddingLeft: 25 },
                    ]}
                    textInputProps={{
                        placeholder,
                        autoCorrect: false,
                        autoCapitalize: "none",
                        placeholderTextColor: "grey",
                        style: styles.input,
                    }}
                />
            </View>

            {error && (
                <Typo
                    label={error}
                    style={styles.errorText}
                    labelRegular
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        width: "100%",
        marginBottom: 20,
    },
    labelWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    label: {
        color: ColorPalatte.secondaryTxt,
        fontFamily: "Outfit-SemiBold",
        fontSize: FontSize.fontSize12,
    },
    asterisk: {
        color: ColorPalatte.errorclr,
        marginLeft: 2,
        fontSize: FontSize.fontSize12,
        fontFamily: "Outfit-SemiBold",
    },
    inputWithIcon: {
        position: "relative",
        justifyContent: "center",
    },
    iconWrapper: {
        position: "absolute",
        left: 10,
        zIndex: 10,
    },
    inputWrapper: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: ColorPalatte.grey_200,
        height: 44,
        backgroundColor: ColorPalatte.whiteClr,
    },
    input: {
        fontFamily: "Outfit-Regular",
        fontSize: FontSize.fontSize16,
        color: ColorPalatte.primartTxt,
        height: 44,
    },
    inputError: {
        borderColor: ColorPalatte.errorclr,
    },
    errorText: {
        color: ColorPalatte.errorclr,
        marginTop: 4,
        fontFamily: "Outfit-Medium",
    },
});

export default SearchDropdown;
