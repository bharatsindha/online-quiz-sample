import React from 'react'
import { Formik } from 'formik'
import { Button, TextField, Typography } from '@material-ui/core'
import { Form } from 'react-bootstrap'

import schema from '../../../schema/quiz/edit/editQuizSchema'

const EditQuizForm = (props) => {
  return (
    <Formik
      enableReinitialize
      validationSchema={schema}
      onSubmit={(values) => props.handleSubmit(values)}
      initialValues={{ title: props.quizDetails.title }}
    >
      {(formikProps) => (
        <Form className="mt-3" onSubmit={formikProps.handleSubmit}>
          <Typography variant="h6" className="mb-3" component="p">
            Update Quiz details
          </Typography>
          <TextField
            variant="outlined"
            className="w-100 mt-3"
            name="title"
            label="title"
            value={formikProps.values.title || ''}
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
            error={formikProps.touched.title && !!formikProps.errors.title}
            helperText={formikProps.touched.title && formikProps.errors.title}
          />
          <Button
            variant="contained"
            size="large"
            className=" my-3"
            color="primary"
            type="submit"
          >
            Update
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default EditQuizForm
