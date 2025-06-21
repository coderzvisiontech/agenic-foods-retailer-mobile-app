import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile: Yup.string().min(10, 'Invalid mobile number').required('Mobile number is required'),
    address: Yup.string().required('Address is required'),
    document: Yup.string().required('Document is required'),
});

export const LoginSchema = Yup.object().shape({
    phone: Yup.string()
        .required('Phone number is required')
});