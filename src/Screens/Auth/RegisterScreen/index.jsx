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
import { RegisterSchema } from '../../../Utils/ValidationSchema';
import { useDispatch } from 'react-redux';
import { authSignup } from '../../../Redux/Action/Auth';
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
            address: '',
            document: '', //file1
            shop_images: '', //file2
            lng: '',
            lat: "",
        },
        // validationSchema: RegisterSchema,
        onSubmit: (values) => {
            console.log('values', values)
            const payload = {
                first_name: values?.first_name,
                last_name: values?.last_name,
                email: values?.email,
                code: '91',
                number: values?.number,
                shop_name: values?.shop_name,
                line1: '6th avenue',
                line2: 'Anna nagar',
                city: 'Chennai',
                state: 'Tamil Nadu',
                zipcode: '600040',
                country: 'India',
                lat: '12.989',
                lng: '8.9787',
                file1: values?.document,
                file2: values?.shop_images,
            }
            setRegisterData((prev) => ({
                ...prev,
                infoState: { loading: true }
            }))
            console.log('payload', payload)
            dispatch(authSignup(payload)).then((res) => {
                console.log('res', res)
                if (res?.payload?.data?.status) {
                    showToast('success', 'Registration Successfull');
                    setRegisterData((prev) => ({
                        ...prev,
                        infoState: { loading: false }
                    }))
                    setTimeout(() => {
                        navigation.navigate('SuccessScreen', {
                            message: 'Successfully Created a Account',
                            screenRoute: {
                                routeName: 'BottomTab',
                                params: { screen: 'loginScreen' }
                            }
                        });

                    }, 1500)
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
                                value={formik.values.first_name}
                                error={formik.touched.first_name && formik.errors.first_name}
                                isMandatory
                            />
                            <TextInput
                                label="Last Name"
                                placeholder="Enter Last Name"
                                onChangeText={formik.handleChange('last_name')}
                                onBlur={formik.handleBlur('last_name')}
                                value={formik.values.last_name}
                                error={formik.touched.last_name && formik.errors.last_name}
                                isMandatory
                            />
                            <TextInput
                                label="Email ID"
                                placeholder="Enter Email Id"
                                keyboardType="email-address"
                                onChangeText={formik.handleChange('email')}
                                onBlur={formik.handleBlur('email')}
                                value={formik.values.email}
                                error={formik.touched.email && formik.errors.email}
                                isMandatory
                            />
                            <TextInput
                                label="Shop Name"
                                placeholder="Enter Shop Name"
                                onChangeText={formik.handleChange('shop_name')}
                                onBlur={formik.handleBlur('shop_name')}
                                value={formik.values.shop_name}
                                error={formik.touched.shop_name && formik.errors.shop_name}
                                isMandatory
                            />
                            <TextInput
                                label="number Number"
                                placeholder="Enter number Number"
                                keyboardType="phone-pad"
                                onChangeText={formik.handleChange('number')}
                                onBlur={formik.handleBlur('number')}
                                value={formik.values.number}
                                type='phonenumber'
                                error={formik.touched.number && formik.errors.number}
                                isMandatory
                            />
                            <TextInput
                                label="Address"
                                placeholder="Enter Address"
                                onChangeText={formik.handleChange('address')}
                                onBlur={formik.handleBlur('address')}
                                value={formik.values.address}
                                error={formik.touched.address && formik.errors.address}
                                isMandatory
                            />
                            <TextInput
                                label="Upload a Document"
                                placeholder="Choose a file"
                                type="upload"
                                onChangeText={(uri) =>
                                    formik.setFieldValue('document', {
                                        uri: uri,
                                        fileName: uri?.split('/').pop(),
                                        type: 'image/jpeg',
                                    })
                                }
                                onBlur={formik.handleBlur('document')}
                                value={formik.values.document}
                                error={formik.touched.document && formik.errors.document}
                                isMandatory
                            />
                            <TextInput
                                label="Upload a Shop Image"
                                type="upload"
                                placeholder="Upload Shop Image"
                                onChangeText={(uri) => formik.setFieldValue('shop_images', uri)}
                                value={formik.values.shop_images}
                                selectionLimit={5}
                            />

                            <ButtonComp
                                title="Create an Account"
                                type="largePrimary"
                                onPress={formik.handleSubmit}
                                disable={registerData?.infoState?.loading}
                            />
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
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
        paddingBottom: 20,
    },
    formWrapper: {
        marginTop: 20,
    },
});

export default RegisterScreen;
