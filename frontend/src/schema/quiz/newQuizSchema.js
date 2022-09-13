import * as Yup from 'yup'

let schema = Yup.object({
  title: Yup.string().required('Title is required'),
})

export default schema
