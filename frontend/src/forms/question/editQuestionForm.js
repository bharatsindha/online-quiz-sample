import React from 'react'
import {
  FormControlLabel,
  IconButton,
  Radio,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  TableBody,
  Checkbox,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core'
import { Formik } from 'formik'
import { Form } from 'react-bootstrap'
import { Editor } from '@tinymce/tinymce-react'
import { Delete, Edit } from '@material-ui/icons'

import NewQuestionOptionModal from '../../modals/newQuestionOptionModal'
import { StyledTableCell, StyledTableRow } from '../../common/customTable'
import BootstrapTooltip from '../../common/customTooltip'

const EditQuestionForm = (props) => {
  let { questionDetails, optionsList } = props
  let [optionModal, setOptionModal] = React.useState(false)
  let [submitType, setSubmitType] = React.useState('updateOption')

  return (
    <Formik
      enableReinitialize
      initialValues={{
        question: questionDetails.question,
        description: questionDetails.description,
        optionType: questionDetails.optionType,
        option: '',
      }}
      onSubmit={(values, formikProps) => props.handleSubmit(values)}
    >
      {(formikProps) => (
        <Form onSubmit={formikProps.handleSubmit} encType="multipart/form-data">
          <Typography variant="h6">Question</Typography>
          <TextField
            variant="outlined"
            className="w-100 mt-1"
            name="question"
            multiline
            minRows={3}
            value={formikProps.values.question}
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
            error={
              formikProps.touched.question && !!formikProps.errors.question
            }
            helperText={
              formikProps.touched.question && formikProps.errors.question
            }
          />
          <Typography variant="h6" className="mt-2 mb-1">
            Description
          </Typography>
          <Editor
            value={formikProps.values.description}
            apiKey="tyd8ijnwqgb5p418emk3m1c82tzuxf0c6o55jy9w4dtj6erh"
            init={{
              content_style: 'pre {margin: 0 !important}',

              height: 400,
              menubar: true,
              plugins: ['code'],
              toolbar:
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist | ',
            }}
            onEditorChange={(content) => {
              formikProps.setFieldValue('description', content)
            }}
          />

          <div className="row mt-3">
            <div className="col-md-6">
              <Typography variant="h6" className="mt-2 mb-1">
                Option type
              </Typography>
              <FormControl className="w-100">
                <Select
                  variant="outlined"
                  className="w-100 mt-1"
                  name="optionType"
                  value={formikProps.values.optionType || ''}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  error={
                    formikProps.touched.optionType &&
                    !!formikProps.errors.optionType
                  }
                  label="optionType"
                  inputProps={{
                    name: 'optionType',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <MenuItem value="single">Single</MenuItem>
                  <MenuItem value="multiple">Multiple</MenuItem>
                </Select>
                <FormHelperText error>
                  {formikProps.touched.optionType &&
                    formikProps.errors.optionType}
                </FormHelperText>
              </FormControl>
            </div>
          </div>
          <div className="d-flex justify-content-between my-2">
            <Typography variant="h6">Options</Typography>
            <Button
              variant="contained"
              className="bg-dark text-white"
              onClick={() => {
                if (optionsList.length >= 5) {
                  props.handleSnackBar(
                    true,
                    'You can add only 1-5 options',
                    'error'
                  )
                } else {
                  setSubmitType('addOption')
                  setOptionModal(true)
                }
              }}
            >
              Add option
            </Button>
          </div>
          <TableContainer>
            <Table>
              <colgroup>
                <col style={{ width: '10%' }} />
                <col style={{ width: '50%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '20%' }} />
              </colgroup>
              <TableHead>
                <TableRow>
                  <StyledTableCell>S.no</StyledTableCell>
                  <StyledTableCell>Option</StyledTableCell>
                  <StyledTableCell align="center">
                    Correct answer
                  </StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {optionsList.map((option, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{option.value}</StyledTableCell>
                    <StyledTableCell align="center">
                      {formikProps.values.optionType === 'single' ? (
                        <Radio
                          checked={option.answer}
                          onChange={() =>
                            props.handleCorrectAnswerChange(
                              index,
                              formikProps.values.optionType
                            )
                          }
                        />
                      ) : (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={() =>
                                props.handleCorrectAnswerChange(
                                  index,
                                  formikProps.values.optionType
                                )
                              }
                              checked={option.answer}
                            />
                          }
                        />
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <BootstrapTooltip title="Delete option">
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() => props.removeOption(index)}
                        >
                          <Delete size="small" />
                        </IconButton>
                      </BootstrapTooltip>
                      <BootstrapTooltip title="Edit option">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => {
                            setSubmitType('updateOption')
                            props.handleSelectedIndex(index)
                            formikProps.setFieldValue('option', option.value)
                            setOptionModal(true)
                          }}
                        >
                          <Edit size="small" />
                        </IconButton>
                      </BootstrapTooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="d-flex justify-content-end">
            <Button
              variant="outlined"
              className="bg-dark text-white mt-3"
              type="submit"
              size="large"
            >
              Update
            </Button>
          </div>
          <NewQuestionOptionModal
            show={optionModal}
            hideModal={setOptionModal}
            addNewOption={props.addNewOption}
            updateOption={props.updateOption}
            formikProps={formikProps}
            submitType={submitType}
          />
        </Form>
      )}
    </Formik>
  )
}

export default EditQuestionForm
