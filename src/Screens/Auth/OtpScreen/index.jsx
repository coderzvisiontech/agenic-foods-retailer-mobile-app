import React, { useState } from 'react'
import {
    View,
    Dimensions,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from 'formik';
import {
    BackgroundWrapper,
    ButtonComp,
    Typo,
    StatusBarComp,
    CheckboxComp,
    OTPInput
} from '../../../Components';
import { ColorPalatte, FontSize } from '../../../Themes';
import { EditIcon, OtpBg } from '../../../Config/ImgConfig';
import { otpSchema } from '../../../Utils/Helper/ValidationSchema';
import { showToast } from '../../../Utils/Helper/toastHelper';
import { useDispatch } from 'react-redux';
import { authOtpVerify } from '../../../Redux/Action/Auth';
import { userProfile } from '../../../Redux/Action/Profile';

const { height, width } = Dimensions.get('window');

const OtpScreen = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { phone, isFrom } = route.params;

    const [otpData, setOtpData] = useState({
        infoData: {
            loading: false
        }
    })

    const formik = useFormik({
        initialValues: {
            otp: '',
            terms: false
        },
        validationSchema: otpSchema,
        onSubmit: (values) => {
            Keyboard.dismiss()
            const payload = {
                phone: {
                    code: '+91',
                    number: phone
                },
                otp: values?.otp,
            }
            setOtpData((prev) => ({
                ...prev,
                infoData: { loading: true }
            }))
            dispatch(authOtpVerify(payload)).then(async (res) => {
                if (res?.payload?.status === 200) {
                    showToast('success', 'OTP verified successfully');
                    setOtpData((prev) => ({
                        ...prev,
                        infoData: { loading: false }
                    }))
                    await AsyncStorage.setItem('token', res?.payload?.data?.token);
                    dispatch(userProfile()).then(async (res) => {
                        console.log('res', res);

                        if (res?.payload?.status === 200) {
                            await AsyncStorage.setItem('email', res?.payload?.data?.response?.[0]?.email || '')
                            await AsyncStorage.setItem('full_name', `${res?.payload?.data?.response?.[0]?.first_name || ''} ${res?.payload?.data?.response?.[0]?.last_name || ''}`)
                            await AsyncStorage.setItem('user_id', res?.payload?.data?.response?.[0]?._id || '')
                            await AsyncStorage.setItem('phone_number', res?.payload?.data?.response?.[0]?.phone?.number || '')
                            await AsyncStorage.setItem('available_address', res?.payload?.data?.response?.[0]?.availability_address || '')
                            await AsyncStorage.setItem(
                                'location',
                                JSON.stringify(res?.payload?.data?.response?.[0]?.location || {})
                            );

                            await AsyncStorage.setItem(
                                'address',
                                JSON.stringify(res?.payload?.data?.response?.[0]?.address || {})
                            );

                            if (isFrom === 'Register') {
                                setTimeout(() => {
                                    navigation.navigate('SuccessScreen', {
                                        screenRoute: {
                                            routeName: 'BottomTab',
                                            params: { screen: 'Home', message: 'Successfully Created a Account' }
                                        }
                                    });
                                }, 1500)
                            } else {
                                setTimeout(() => {
                                    navigation.navigate('BottomTab', { screen: 'Home' })
                                }, 1500)
                            }

                        } else {
                            showToast('error', 'Something went wrong')
                        }
                    })
                } else {
                    setOtpData((prev) => ({
                        ...prev,
                        infoData: { loading: false }
                    }))
                    showToast('error', res?.payload?.message)
                }
            })
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComp visible={false} backgroundColor='black' />

            <BackgroundWrapper
                height={height * 0.5}
                image={
                    <View style={{ flex: 1, bottom: 40 }}>
                        <Image
                            source={OtpBg}
                            resizeMode="contain"
                            style={{ width: width, height: height * 0.8 }}
                        />
                    </View>

                }
            >
                <View style={{ justifyContent: "space-between", flex: 1 }}>

                    <View style={{ alignItems: 'center', paddingVertical: 20, gap: 10 }}>
                        <Typo type='h2' title='Verify Mobile Number' />
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <Typo type='p' title={`Enter OTP Sent to ${phone}`} />
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <EditIcon />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ paddingVertical: 30, alignItems: 'center', gap: 10, paddingBottom: Object.keys(formik.errors).length > 0 ? 15 : 40 }}>
                        <OTPInput length={6} value={formik.values.otp} setValue={formik.handleChange('otp')} />
                        {(formik.errors.otp || formik.errors.terms) && (
                            <Typo
                                style={styles.error}
                                title={formik.errors.otp || formik.errors.terms}
                            />
                        )}
                    </View>

                    <View style={{ gap: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
                            <CheckboxComp
                                value={formik.values.terms}
                                onValueChange={(value) => formik.setFieldValue('terms', value)}
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Typo type='label' title='Accept ' />
                                <Typo type='label' style={{ color: ColorPalatte.primaryClr }} title='Terms and Conditions & Privacy Policy' />
                            </View>
                        </View>
                        <ButtonComp
                            title="Verify & Proceed"
                            type="largePrimary"
                            onPress={formik.handleSubmit}
                            disable={otpData?.infoData?.loading}
                        />
                        <View style={{ alignItems: 'center', flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
                            <Typo type='label' title='Don’t Receive a Code?' />
                            <TouchableOpacity onPress={() => console.log('resend clicked...')}>
                                <Typo style={{ color: ColorPalatte.secondaryClr }} type='label' title='Resend OTP' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </BackgroundWrapper>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorPalatte.whiteClr,
    },
    error: {
        color: ColorPalatte.errorclr,
        fontSize: FontSize.fontSize12
    }
});

export default OtpScreen
