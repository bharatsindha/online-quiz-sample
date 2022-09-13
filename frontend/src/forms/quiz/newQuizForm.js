import React from 'react'
import { Formik } from 'formik'
import { Form } from 'react-bootstrap'
import { TextField, Typography, Divider, Button } from '@material-ui/core'

import schema from '../../schema/quiz/newQuizSchema'

let NewQuizForm = (props) => {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => {
        props.handleSubmit(values)
      }}
      initialValues={{
        title: '',
      }}
    >
      {(formikProps) => (
        <Form noValidate onSubmit={formikProps.handleSubmit}>
          <Typography variant="h6" component="p" className="my-3">
            Quiz details
          </Typography>
          <div className="container mb-4 ">
            <div className="row">
              <div className="col-md-6">
                <TextField
                  variant="outlined"
                  className="w-100"
                  name="title"
                  label="title"
                  value={formikProps.values.title}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  error={
                    formikProps.touched.title && !!formikProps.errors.title
                  }
                  helperText={
                    formikProps.touched.title && formikProps.errors.title
                  }
                />
              </div>
            </div>
          </div>
          <Divider />
          <div className="d-flex justify-content-end mt-3 px-3">
            <Button
              variant="outlined"
              type="submit"
              className="bg-dark text-white"
            >
              Create
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default NewQuizForm
