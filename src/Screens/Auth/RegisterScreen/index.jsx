import React from 'react';
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

const RegisterScreen = ({ route }) => {
    const { phone_number } = route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            mobile: phone_number,
            address: '',
            document: '',
            shopImage: ''
        },
        validationSchema: RegisterSchema,
        onSubmit: (values) => {
            console.log('Form values:', values);
            // navigation.navigate('OtpScreen', { phone: '98834983782' })
            const payload = {

            }
            dispatch(authSignup(values))

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
                                onChangeText={formik.handleChange('firstName')}
                                onBlur={formik.handleBlur('firstName')}
                                value={formik.values.firstName}
                                error={formik.touched.firstName && formik.errors.firstName}
                                isMandatory
                            />
                            <TextInput
                                label="Last Name"
                                placeholder="Enter Last Name"
                                onChangeText={formik.handleChange('lastName')}
                                onBlur={formik.handleBlur('lastName')}
                                value={formik.values.lastName}
                                error={formik.touched.lastName && formik.errors.lastName}
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
                                label="Mobile Number"
                                placeholder="Enter Mobile Number"
                                keyboardType="phone-pad"
                                onChangeText={formik.handleChange('mobile')}
                                onBlur={formik.handleBlur('mobile')}
                                value={formik.values.mobile}
                                type='phonenumber'
                                error={formik.touched.mobile && formik.errors.mobile}
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
                            {console.log('------>', formik.values.document)}
                            <TextInput
                                label="Upload a Document"
                                placeholder="Choose a file"
                                type="upload"
                                onChangeText={(uri) => formik.setFieldValue('document', uri)}
                                onBlur={formik.handleBlur('document')}
                                value={formik.values.document}
                                error={formik.touched.document && formik.errors.document}
                                isMandatory
                            />
                            <TextInput
                                label="Upload a Shop Image"
                                type="upload"
                                placeholder="Upload Shop Image"
                                onChangeText={(uri) => formik.setFieldValue('shopImage', uri)}
                                value={formik.values.shopImage}
                                selectionLimit={5}
                            />

                            <ButtonComp
                                title="Create an Account"
                                type="largePrimary"
                                onPress={formik.handleSubmit}
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
