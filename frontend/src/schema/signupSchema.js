import * as Yup from 'yup'

let schema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid Email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Minimum password length should be 6')
    .required('Password is required'),
})

export default schema
