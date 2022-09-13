import * as Yup from 'yup'

const schema = Yup.object({
  title: Yup.string().required('Title is required'),
})

export default schema
