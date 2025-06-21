import React from 'react'
import {
    View,
    Dimensions,
    StyleSheet,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import {
    BackgroundWrapper,
    ButtonComp,
    Typo,
    StatusBarComp,
    CheckboxComp,
    OTPInput
} from '../../../Components';
import { ColorPalatte } from '../../../Themes';
import { EditIcon, OtpBg } from '../../../Config/ImgConfig';

const { height, width } = Dimensions.get('window');

const OtpScreen = ({ route }) => {
    const navigation = useNavigation();
    const { phone } = route.params;

    const formik = useFormik({
        initialValues: {
            otp: ''
        },
        // validationSchema: LoginSchema,
        onSubmit: (values) => {
            console.log('Form values:', values);
            navigation.navigate("SuccessScreen")

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
                            <TouchableOpacity>
                                <EditIcon />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ paddingVertical: 30 }}>
                        <OTPInput length={6} value={formik.values.otp} setValue={formik.handleChange('otp')} />
                    </View>

                    <View style={{ gap: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
                            <CheckboxComp
                                value={true}
                            // onValueChange={setAgreed}
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
});

export default OtpScreen
