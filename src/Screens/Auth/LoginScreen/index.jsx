import React, { useEffect, useState } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import {
    BackgroundWrapper,
    ButtonComp,
    Typo,
    TextInput,
    StatusBarComp,
} from '../../../Components';
import { LoginSchema } from '../../../Utils/ValidationSchema';
import { ColorPalatte } from '../../../Themes';
import { VegetableImg } from '../../../Config/ImgConfig';
import { useDispatch } from 'react-redux';
import { authLogin } from '../../../Redux/Action/Auth';
import { showToast } from '../../../Utils/Helper/toastHelper';
import { getAuthToken } from '../../../Utils/Helper/checkAuth';

const { height, width } = Dimensions.get('window');

const LoginScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [loginData, setLoginData] = useState({
        infoState: {
            loading: false
        }
    })

    useEffect(() => {
        const checkUser = async () => {
            const user = await getAuthToken();
            if (user) {
                navigation.navigate('BottomTab', { Screen: 'Home' })
            } else {
                console.log('No token');
            }
        };
        checkUser();
    }, []);


    const formik = useFormik({
        initialValues: {
            phone: ''
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            Keyboard.dismiss()
            setLoginData((prev) => ({
                ...prev,
                infoState: { loading: true }
            }))
            dispatch(authLogin({ phone: { code: "91", number: values?.phone } })).then((res) => {
                console.log('res', res)
                if (res?.payload?.data?.status === 0) {
                    setLoginData((prev) => ({
                        ...prev,
                        infoState: { loading: false }
                    }))
                    showToast('success', 'Please register to login');
                    setTimeout(() => {
                        navigation.navigate("RegisterScreen", { phone_number: values?.phone })
                    }, 1500)
                } else if (res?.payload?.data?.status === 1) {
                    setLoginData((prev) => ({
                        ...prev,
                        infoState: { loading: false }
                    }))
                    showToast('success', 'OTP Sent Successfully');
                    setTimeout(() => {
                        navigation.navigate("OtpScreen", { phone: values?.phone })
                    }, 1500)
                }
                else {
                    setLoginData((prev) => ({
                        ...prev,
                        infoState: { loading: false }
                    }))
                    showToast('error', 'Something went wrong');
                }
            })

        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComp visible={true} backgroundColor={ColorPalatte.whiteClr} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <BackgroundWrapper
                            height={420}
                            image={
                                <VegetableImg
                                    preserveAspectRatio="xMidYMid meet"
                                    width={width * 0.9}
                                    height={height}
                                />
                            }
                            alignBg
                        >
                            <View style={{ justifyContent: "space-between", height: 275, flex: 1 }}>
                                <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                                    <Typo type='h2' title='Welcome to Get Fresh' />
                                    <Typo type='p' title='Enter your phone number' />
                                </View>

                                <TextInput
                                    label="Mobile Number"
                                    placeholder="Enter Mobile Number"
                                    keyboardType="phone-pad"
                                    type='phonenumber'
                                    onChangeText={formik.handleChange('phone')}
                                    onBlur={formik.handleBlur('phone')}
                                    value={formik.values.phone}
                                    error={formik.touched.phone && formik.errors.phone}
                                />

                                <ButtonComp
                                    title="Log In"
                                    type="largePrimary"
                                    onPress={formik.handleSubmit}
                                    disable={loginData?.loading}
                                />
                            </View>
                        </BackgroundWrapper>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorPalatte.whiteClr,
    },
});

export default LoginScreen;
