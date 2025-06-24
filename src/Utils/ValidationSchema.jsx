import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    shop_name: Yup.string().required('Shop Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    number: Yup.string().min(10, 'Invalid mobile number').required('Mobile number is required'),
    address: Yup.string().required('Address is required'),
    document: Yup.object().shape({
        uri: Yup.string().required('File is required'),
        fileName: Yup.string(),
        type: Yup.string(),
    }),

});

export const LoginSchema = Yup.object().shape({
    phone: Yup.string()
        .required('Phone number is required')
});

export const otpSchema = Yup.object().shape({
    otp: Yup.string()
        .required('OTP is required')
        .length(6, 'OTP must be 6 digits'),
    terms: Yup.bool()
        .oneOf([true], 'You must accept the terms and conditions'),
});

export const ProfileSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    number: Yup.string().min(10, 'Invalid mobile number').required('Mobile number is required'),
    address: Yup.string().required('Address is required'),
});