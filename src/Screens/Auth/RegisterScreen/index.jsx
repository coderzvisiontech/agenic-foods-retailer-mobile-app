import React, { useState } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';

import {
    ButtonComp,
    SecondaryHeader,
    StatusBarComp,
    TextInput,
} from '../../../Components';
import { ColorPalatte } from '../../../Themes';
import { RegisterSchema } from '../../../Utils/Helper/ValidationSchema';
import { useDispatch } from 'react-redux';
import { authLogin, authSignup } from '../../../Redux/Action/Auth';
import { showToast } from '../../../Utils/Helper/toastHelper';

const RegisterScreen = ({ route }) => {
    const { phone_number } = route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [registerData, setRegisterData] = useState({
        infoState: {
            loading: false
        }
    })

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            code: "",
            email: '',
            number: phone_number,
            shop_name: '',
            address: {
                line1: '',
                line2: '',
                city: '',
                state: '',
                zipcode: '',
                country: '',
                availability_address: ''
            },
            document: '', //file1
            shop_images: '', //file2
            lng: '',
            lat: "",

        },
        validationSchema: RegisterSchema,
        onSubmit: (values) => {
            const payload = {
                first_name: values?.first_name,
                last_name: values?.last_name,
                email: values?.email,
                code: '+91',
                number: values?.number,
                shop_name: values?.shop_name,
                line1: values?.address?.line1,
                line2: values?.address?.line2,
                city: values?.address?.city,
                state: values?.address?.state,
                zipcode: values?.address?.zipcode,
                country: values?.address?.country,
                lat: values?.lat,
                lng: values?.lng,
                file1: values?.document,
                file2: values?.shop_images,
            };
            setRegisterData((prev) => ({
                ...prev,
                infoState: { loading: true }
            }))
            dispatch(authSignup(payload)).then((res) => {
                console.log('res', res)
                if (res?.payload?.data?.status) {
                    showToast('success', 'Registration Successfull');
                    dispatch(authLogin({ phone: { code: "+91", number: values?.number } })).then((res) => {
                        console.log('res', res);
                        if (res?.payload?.status === 200) {
                            setRegisterData((prev) => ({
                                ...prev,
                                infoState: { loading: false }
                            }))
                            showToast('success', 'OTP sent successfully.')
                            setTimeout(() => {
                                navigation.navigate('OtpScreen', { phone: values?.number, is_from: 'Register', otp: res?.payload?.data?.otp });
                            }, 1000)
                        }
                    })
                } else if (res?.payload?.data?.isExist) {
                    showToast('error', res?.payload?.data?.message);
                    setRegisterData((prev) => ({
                        ...prev,
                        infoState: { loading: false }
                    }))
                }
                else {
                    setRegisterData((prev) => ({
                        ...prev,
                        infoState: { loading: false }
                    }))
                    showToast('error', 'Registration Failed');
                }
            })
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComp visible={true} backgroundColor={ColorPalatte.whiteClr} />
            <SecondaryHeader isBack screenName="Create an Account" onPressBack={() => navigation.goBack()} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                        <View style={styles.formWrapper}>
                            <TextInput
                                label="First Name"
                                placeholder="Enter First Name"
                                onChangeText={formik.handleChange('first_name')}
                                onBlur={formik.handleBlur('first_name')}
                                value={formik?.values?.first_name}
                                error={formik?.touched?.first_name && formik?.errors?.first_name}
                                isMandatory
                            />
                            <TextInput
                                label="Last Name"
                                placeholder="Enter Last Name"
                                onChangeText={formik.handleChange('last_name')}
                                onBlur={formik.handleBlur('last_name')}
                                value={formik?.values?.last_name}
                                error={formik?.touched?.last_name && formik?.errors?.last_name}
                                isMandatory
                            />
                            <TextInput
                                label="Email ID"
                                placeholder="Enter Email Id"
                                keyboardType="email-address"
                                onChangeText={formik.handleChange('email')}
                                onBlur={formik.handleBlur('email')}
                                value={formik?.values?.email}
                                error={formik?.touched?.email && formik?.errors?.email}
                                isMandatory
                            />
                            <TextInput
                                label="Shop Name"
                                placeholder="Enter Shop Name"
                                onChangeText={formik.handleChange('shop_name')}
                                onBlur={formik.handleBlur('shop_name')}
                                value={formik?.values?.shop_name}
                                error={formik?.touched?.shop_name && formik?.errors?.shop_name}
                                isMandatory
                            />
                            <TextInput
                                label="number Number"
                                placeholder="Enter number Number"
                                keyboardType="phone-pad"
                                onChangeText={formik.handleChange('number')}
                                onBlur={formik.handleBlur('number')}
                                value={formik?.values?.number}
                                type='phonenumber'
                                error={formik?.touched?.number && formik?.errors?.number}
                                isMandatory
                            />
                            <TextInput
                                label="Address"
                                placeholder="Enter Address"
                                value={formik?.values?.address?.availability_address}
                                editable={false}
                                isMandatory
                                error={
                                    formik?.touched?.address?.availability_address && formik?.errors?.address?.availability_address
                                }
                                onPressIn={() => {
                                    navigation.navigate('GoogleMapScreen', {
                                        onSelect: ({ address }) => {
                                            formik.setFieldValue('address.availability_address', address?.availability_address || '')
                                            formik.setFieldValue('address.line1', address?.line1 || '');
                                            formik.setFieldValue('address.line2', address?.line2 || '');
                                            formik.setFieldValue('address.city', address?.city || '');
                                            formik.setFieldValue('address.state', address?.state || '');
                                            formik.setFieldValue('address.country', address?.country || '');
                                            formik.setFieldValue('address.zipcode', address?.zipcode || '');
                                            formik.setFieldValue('lat', address?.lat || '');
                                            formik.setFieldValue('lng', address?.lng || '');
                                        },
                                    });
                                }}
                            />
                            <TextInput
                                label="Upload a Document"
                                placeholder="Choose a file"
                                type="upload"
                                onChangeText={(file) => {
                                    formik.setFieldValue('document', {
                                        uri: file?.uri,
                                        fileName: file?.fileName || file?.name,
                                        type: file?.type,
                                    })
                                }}
                                onBlur={formik.handleBlur('document')}
                                value={formik?.values?.document?.fileName}
                                error={formik?.touched?.document && formik?.errors?.document?.uri}
                                isMandatory
                            />
                            <TextInput
                                label="Upload a Shop Image"
                                type="upload"
                                placeholder="Upload Shop Image"
                                onChangeText={(file) => {
                                    formik.setFieldValue('shop_images', {
                                        uri: file?.uri,
                                        fileName: file?.fileName || file?.name,
                                        type: file?.type,
                                    })
                                }}
                                value={formik?.values?.shop_images?.fileName}
                                selectionLimit={5}
                            />

                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
                <View style={{ position: 'absolute', bottom: 20, width: '100%' }}>
                    <ButtonComp
                        title="Create an Account"
                        type="largePrimary"
                        onPress={formik.handleSubmit}
                        disable={registerData?.infoState?.loading}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPalatte.whiteClr,
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 24
    },
    scrollContent: {
        paddingBottom: 60,
    },
    formWrapper: {
        marginTop: 20,
    },
});

export default RegisterScreen;
