import React, { useEffect, useState } from 'react';
import {
    TextInput,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Typo } from "../../Components";
import { ColorPalatte, FontSize } from '../../Themes';
import { UploadIcon, CloseIcon, SearchIcon } from '../../Config/ImgConfig';
import { requestGalleryPermission } from '../../Utils/CommonFunctions';

const { height, width } = Dimensions.get('window')

const TextInputComp = ({
    placeholder = '',
    value,
    onChangeText,
    type = 'text', // 'text' | 'password' | 'search' | 'phonenumber' | 'upload'
    keyboardType = 'default',
    error = '',
    style = {},
    inputStyle = {},
    closeIcon = false,
    editable = true,
    label,
    isMandatory,
    selectionLimit = 1,
    onPressIn,
    paddingHori = true,
    ...rest
}) => {
    const [secure, setSecure] = useState(type === 'password');
    const [previewVisible, setPreviewVisible] = useState(false);
    const [fileData, setFileData] = useState(null);

    const handleUploadPress = async () => {
        const granted = await requestGalleryPermission();
        if (!granted) return;
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, (response) => {
            if (response?.assets && response?.assets?.length > 0) {
                const image = response?.assets?.[0];
                const image2 = response?.assets
                onChangeText(image);
                setFileData(image2);
            }
        });
    };

    const renderLeftIcon = () => {
        if (type === 'search') {
            return (
                <SearchIcon />
            );
        }
        if (type === 'phonenumber') {
            return (
                <View style={styles.phonePrefix}>
                    <Text style={styles.prefixText}>+91</Text>
                    <View style={styles.verticalDivider} />
                </View>
            );
        }
        return null;
    };

    const renderRightIcon = () => {
        if (type === 'password') {
            return (
                <TouchableOpacity onPress={() => setSecure(!secure)}>
                    <Icon
                        name={secure ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color={ColorPalatte.greyClr}
                        style={{ marginLeft: 8 }}
                    />
                </TouchableOpacity>
            );
        }
        if (type === 'upload') return null;
        if (closeIcon && value?.length > 0) {
            return (
                <TouchableOpacity onPress={() => onChangeText('')}>
                    <MaterialIcons
                        name="close"
                        size={20}
                        color={ColorPalatte.greyClr}
                        style={{ marginLeft: 8 }}
                    />
                </TouchableOpacity>
            );
        }
        return null;
    };

    const getKeyboardType = () => {
        if (type === 'phonenumber') return 'phone-pad';
        if (type === 'search') return 'default';
        return keyboardType;
    };

    return (
        <>
            <View style={[styles.container, style]}>
                {label && (
                    <View style={styles.labelwrapper}>
                        <Typo title={label} style={styles.label} />
                        {isMandatory && (
                            <Text
                                style={{
                                    color: ColorPalatte?.errorclr,
                                    transform: [{ translateY: -2 }],
                                }}
                            >
                                *
                            </Text>
                        )}
                    </View>
                )}
                <View style={[styles.inputWrapper, { paddingHorizontal: paddingHori && 12, }]}>
                    {renderLeftIcon()}

                    {type === 'upload' ? (
                        <>
                            <TouchableOpacity
                                style={[styles.uploadBox, inputStyle]}
                                onPress={handleUploadPress}
                                activeOpacity={0.8}
                                disabled={!editable}
                            >
                                <View style={styles.uploadContent}>
                                    <UploadIcon name="image" size={20} color={ColorPalatte.blackClr} style={{ marginRight: 8 }} />
                                    <Text
                                        style={{
                                            flex: 1,
                                            color: value ? ColorPalatte.blackClr : ColorPalatte.placeHolderClr,
                                        }}
                                        numberOfLines={1}
                                    >
                                        {value || placeholder}
                                    </Text>
                                </View>
                                {value?.length > 0 && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setFileData(null);
                                            onChangeText(null);
                                        }}
                                    >
                                        <CloseIcon name="close" size={20} color={ColorPalatte.blackClr} />
                                    </TouchableOpacity>
                                )}
                            </TouchableOpacity>

                        </>
                    ) : (
                        <>
                            {editable ? (
                                <TextInput
                                    style={[styles.input, inputStyle]}
                                    placeholder={placeholder}
                                    placeholderTextColor={ColorPalatte.placeHolderClr}
                                    value={value}
                                    onChangeText={onChangeText}
                                    secureTextEntry={secure}
                                    keyboardType={getKeyboardType()}
                                    editable={editable}
                                    {...rest}
                                />
                            ) : (
                                <TouchableOpacity
                                    style={[styles.input, inputStyle, { justifyContent: 'center' }]}
                                    onPress={onPressIn}
                                    activeOpacity={0.8}
                                >
                                    <Text style={{ color: value ? ColorPalatte.blackClr : ColorPalatte.placeHolderClr }}>
                                        {value || placeholder}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </>
                    )}

                    {renderRightIcon()}
                </View>
                {type === 'upload' && (
                    <TouchableOpacity onPress={() => setPreviewVisible(true)}>
                        <Text style={styles.clickTxt} >Click to View</Text>
                    </TouchableOpacity>
                )}
                {error ? <Text style={styles.error}>{error}</Text> : null}

            </View>
            {previewVisible && fileData && (
                <View style={styles.modalWrapper}>
                    <TouchableOpacity style={styles.modalBackdrop} onPress={() => setPreviewVisible(false)} />
                    <TouchableOpacity style={{ alignItems: 'flex-end', marginRight: 20 }} onPress={() => setPreviewVisible(false)}>
                        <Ionicons name="close-circle-outline" color={ColorPalatte.whiteClr} size={28} />
                    </TouchableOpacity>
                    <View style={styles.modalContent}>
                        <Image
                            source={{ uri: fileData?.[0]?.uri }}
                            style={styles.previewImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        width: '100%',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: ColorPalatte.whiteClr,
        // paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: ColorPalatte.grey_200,
    },
    input: {
        flex: 1,
        fontSize: FontSize.fontSize16,
        color: ColorPalatte.blackClr,
        padding: 12,
    },
    uploadBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        paddingVertical: 12,
    },
    uploadContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 8,
    },
    error: {
        color: ColorPalatte.errorclr,
        fontSize: FontSize.fontSize12,
        marginTop: 4,
        left: 5,
    },
    phonePrefix: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
    },
    prefixText: {
        fontSize: FontSize.fontSize16,
        color: ColorPalatte.blackClr,
        fontFamily: 'Outfit-Bold',
        marginRight: 6,
    },
    verticalDivider: {
        width: 1,
        height: 24,
        backgroundColor: ColorPalatte.grey_300,
    },
    label: {
        color: ColorPalatte.primartTxt,
        fontFamily: 'Outfit-Medium',
        fontSize: FontSize.fontSize14,
    },
    labelwrapper: {
        marginBottom: 8,
        width: '100%',
        flexDirection: 'row',
        columnGap: 2,
    },
    clickTxt: {
        color: ColorPalatte.primaryClr,
        textDecorationLine: 'underline',
        fontFamily: 'Outfit-Regular',
        fontSize: FontSize.fontSize12,
        paddingTop: 5
    },

    modalWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        zIndex: 999,
    },

    modalBackdrop: {
        ...StyleSheet.absoluteFillObject,
    },

    modalContent: {
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },

    previewImage: {
        width: width * 0.8,
        height: height * 0.8,
        borderRadius: 8,
        marginBottom: 10,
    },

    closeBtn: {
        paddingVertical: 6,
        paddingHorizontal: 20,
        backgroundColor: ColorPalatte.primaryClr,
        borderRadius: 6,
    },

    closeText: {
        color: 'white',
        fontWeight: '600',
    },

});

export default TextInputComp;
