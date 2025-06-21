import React from 'react';
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

const { height, width } = Dimensions.get('window');

const LoginScreen = () => {
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: {
            phone: ''
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            console.log('Form values:', values);
            navigation.navigate("RegisterScreen")

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
                        >
                            <View style={{ justifyContent: "space-between", maxHeight: 275, flex: 1 }}>

                                <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                                    <Typo type='h2' title='Welcome to Get Fresh' />
                                    <Typo type='p' title='Enter your phone number' />
                                </View>

                                <View>
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
                                </View>

                                <ButtonComp
                                    title="Log In"
                                    type="largePrimary"
                                    onPress={formik.handleSubmit}
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
