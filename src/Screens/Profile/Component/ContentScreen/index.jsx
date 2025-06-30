import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { ColorPalatte } from '../../../../Themes';
import {
    Avatar,
    ButtonComp,
    SecondaryHeader,
    TextInput
} from '../../../../Components';
import { ProfileSchema } from '../../../../Utils/ValidationSchema';
import CreditCard from '../CreditCard';

const DetailScreen = ({ route }) => {
    const navigation = useNavigation();
    const { name, updateProfile, data } = route.params;

    const profileFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            first_name: data?.first_name || '',
            last_name: data?.last_name || '',
            email: data?.email || '',
            number: data?.phone?.number || '',
            address: `${data?.address?.line1 || ''}, ${data?.address?.line2 || ''}, ${data?.address?.state || ''}, ${data?.address?.city || ''}, ${data?.address?.zipcode || ''}, ${data?.address?.country || ''}`,
        },
        validationSchema: ProfileSchema,
        onSubmit: (values) => {
            updateProfile?.(values);
        },
    });

    const renderMyProfile = () => (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <Avatar
                fullName={`${profileFormik.values.first_name} ${profileFormik.values.last_name}`}
                isEdit
                onEditPress={() => console.log('Edit pressed')}
            />
            <TextInput
                label="First Name"
                value={profileFormik.values.first_name}
                onChangeText={profileFormik.handleChange('first_name')}
                onBlur={profileFormik.handleBlur('first_name')}
                error={profileFormik.touched.first_name && profileFormik.errors.first_name}
            />
            <TextInput
                label="Last Name"
                value={profileFormik.values.last_name}
                onChangeText={profileFormik.handleChange('last_name')}
                onBlur={profileFormik.handleBlur('last_name')}
                error={profileFormik.touched.last_name && profileFormik.errors.last_name}
            />
            <TextInput
                label="Email ID"
                value={profileFormik.values.email}
                onChangeText={profileFormik.handleChange('email')}
                onBlur={profileFormik.handleBlur('email')}
                error={profileFormik.touched.email && profileFormik.errors.email}
            />
            <TextInput
                label="Mobile Number"
                value={profileFormik.values.number}
                onChangeText={profileFormik.handleChange('number')}
                onBlur={profileFormik.handleBlur('number')}
                error={profileFormik.touched.number && profileFormik.errors.number}
                type="phonenumber"
            />
            <TextInput
                label="Address"
                value={profileFormik.values.address}
                onChangeText={profileFormik.handleChange('address')}
                onBlur={profileFormik.handleBlur('address')}
                error={profileFormik.touched.address && profileFormik.errors.address}
            />
            <ButtonComp
                type="largePrimary"
                onPress={profileFormik.handleSubmit}
                title="Update"
            />
        </KeyboardAwareScrollView>
    );

    const renderCredit = () => (
        <CreditCard />
    )

    return (
        <SafeAreaView style={styles.container}>
            <SecondaryHeader onPressBack={() => navigation.goBack()} isBack screenName={name} />
            <View style={styles.contentWrapper}>
                {name === 'My Profile' ? renderMyProfile() : renderCredit()}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPalatte.whiteClr,
        flex: 1,
        padding: 20,
    },
    contentWrapper: {
        flex: 1,
        paddingVertical: 20
    },
});

export default DetailScreen;
