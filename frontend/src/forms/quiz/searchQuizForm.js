import { Formik } from 'formik'
import React from 'react'
import { Backspace, Search } from '@material-ui/icons'
import { TextField, Button } from '@material-ui/core'
import { Form } from 'react-bootstrap'

import schema from '../../schema/quiz/searchQuizSchema'

const SearchQuizForm = (props) => {
  return (
    <Formik
      enableReinitialize
      validationSchema={schema}
      initialValues={{
        title: '',
      }}
      onSubmit={(values) => props.handleFilter(values)}
    >
      {(formikProps) => (
        <Form onSubmit={formikProps.handleSubmit}>
          <div className="row mt-3">
            <div className="col-md-5">
              <TextField
                variant="outlined"
                className="w-100"
                label="Quiz title"
                placeholder="Search quiz title"
                name="title"
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                value={formikProps.values.title || ''}
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div className="col-md-3">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Search />}
                type="submit"
              >
                Search
              </Button>
              <Button
                variant="contained"
                className="bg-danger text-white ml-2"
                startIcon={<Backspace />}
                onClick={() => {
                  formikProps.resetForm()
                  props.viewQuizs()
                }}
              >
                Clear
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default SearchQuizForm
