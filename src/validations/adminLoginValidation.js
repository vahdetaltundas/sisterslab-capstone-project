import * as Yup from "yup";

export const adminLoginInitialValues={
    username:"",
    password:"",
};

export const adminLoginValidationSchema=Yup.object({
    username: Yup.string().required("Enter your username address"),
    password: Yup.string()
    .required('Enter your password')
    .min(4, 'Password must be at least 4 characters')
    .max(20, 'Password must be at most 20 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Password must be alphanumeric'),
});