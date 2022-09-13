import React from 'react'
import {
  Button,
  MenuItem,
  TextField,
  Typography,
  Select,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  IconButton,
  FormControlLabel,
  Radio,
  Checkbox,
  FormControl,
  FormHelperText,
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { Formik } from 'formik'
import { Form } from 'react-bootstrap'
import { Editor } from '@tinymce/tinymce-react'

import schema from '../../schema/question/questionSchema'
import NewQuestionOptionModal from '../../modals/newQuestionOptionModal'
import { StyledTableCell, StyledTableRow } from '../../common/customTable'
import BootstrapTooltip from '../../common/customTooltip'

class AddQuestionForm extends React.Component {
  constructor() {
    super()
    this.state = {
      optionsList: [],
      description: '',
      optionModal: { show: false },
    }
  }

  /**
   * Handle add option modal
   *
   * @param {*} show
   * @param {*} optionType
   * @param {*} formikProps
   */
  handleOptionModal = (show, optionType, formikProps) => {
    let { optionsList } = this.state
    if (show) {
      if (optionType === '') {
        this.props.handleSnackBar(true, 'Option type is not selected', 'error')
      } else if (optionsList.length >= 5) {
        this.props.handleSnackBar(true, 'You can add only 1-5 options', 'error')
      } else {
        this.setState({ optionModal: { show } })
      }
    } else {
      formikProps.setFieldValue('option', '')
      this.setState({ optionModal: { show } })
    }
  }

  /**
   * Add new option
   *
   * @param {*} formikProps
   */
  addNewOption = (formikProps) => {
    let option = formikProps.values.option
    let { optionsList } = this.state
    let index = optionsList.length + 1
    optionsList.push({ key: `option${index}`, value: option, answer: false })
    this.setState({ optionsList: optionsList, optionModal: { show: false } })
    formikProps.setFieldValue('option', '')
  }

  /**
   * Remove the option
   *
   * @param {*} index
   */
  removeOption = (index) => {
    let { optionsList } = this.state
    optionsList = optionsList.filter((option, optIndex) => optIndex !== index)
    this.setState({ optionsList })
  }

  /**
   * Handle the correct answer change
   *
   * @param {*} index
   * @param {*} optionType
   */
  handleCorrectAnswerChange = (index, optionType) => {
    let { optionsList } = this.state
    if (optionType === 'single') {
      optionsList.forEach((option, optIndex) => {
        if (optIndex === index) option.answer = true
        else option.answer = false
      })
    } else {
      optionsList.forEach((option, optIndex) => {
        if (optIndex === index)
          if (option.answer) option.answer = false
          else option.answer = true
      })
    }
    this.setState({ optionsList })
  }

  render() {
    let { optionModal, optionsList } = this.state
    return (
      <Formik
        validationSchema={schema}
        onSubmit={(values, formikProps) =>
          this.props
            .handleSubmit(values, optionsList)
            .then((response) => {
              this.props.handleSnackBar(true, response.data.msg, 'success')
              formikProps.resetForm()
              this.setState({ optionsList: [] })
            })
            .catch((err) => {
              this.props.handleSnackBar(true, err.response.data.msg, 'error')
            })
        }
        initialValues={{
          question: '',
          description: '',
          optionType: '',
          option: '',
        }}
      >
        {(formikProps) => (
          <Form
            onSubmit={formikProps.handleSubmit}
            encType="multipart/form-data"
          >
            <Typography>Question</Typography>
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

            <div className="mt-3">
              <Typography className="mb-1">Description</Typography>
              <Editor
                value={formikProps.values.description}
                apiKey="tyd8ijnwqgb5p418emk3m1c82tzuxf0c6o55jy9w4dtj6erh"
                init={{
                  height: 400,
                  menubar: true,
                  plugins: [
                    'advlist autolink lists link image',
                    'charmap print preview anchor help',
                    'searchreplace visualblocks code',
                    'insertdatetime media table paste wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help',
                }}
                onEditorChange={(content) => {
                  formikProps.setFieldValue('description', content)
                }}
              />
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <Typography>Option type</Typography>
                <FormControl className="w-100">
                  <Select
                    variant="outlined"
                    className="w-100 mt-1"
                    name="optionType"
                    value={formikProps.values.optionType}
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
            <div className="d-flex justify-content-between mt-3">
              <div className="align-self-end mt-2">
                <Button
                  variant="outlined"
                  className="bg-dark text-white"
                  onClick={() =>
                    this.handleOptionModal(true, formikProps.values.optionType)
                  }
                >
                  Add Option
                </Button>
              </div>
            </div>
            <TableContainer>
              <Table className="mt-3">
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
                    <StyledTableCell>Correct answer</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {optionsList.map((option, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{index + 1}</StyledTableCell>
                      <StyledTableCell>{option.value}</StyledTableCell>
                      <StyledTableCell>
                        {formikProps.values.optionType === 'single' ? (
                          <Radio
                            checked={option.answer}
                            onChange={() =>
                              this.handleCorrectAnswerChange(
                                index,
                                formikProps.values.optionType
                              )
                            }
                            color="primary"
                          />
                        ) : (
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={() =>
                                  this.handleCorrectAnswerChange(
                                    index,
                                    formikProps.values.optionType
                                  )
                                }
                                checked={option.answer}
                                color="primary"
                              />
                            }
                          />
                        )}
                      </StyledTableCell>
                      <StyledTableCell>
                        <BootstrapTooltip title="Delete option">
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={() => this.removeOption(index)}
                          >
                            <Delete size="small" />
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
                Create
              </Button>
            </div>
            <NewQuestionOptionModal
              show={optionModal.show}
              hideModal={this.handleOptionModal}
              addNewOption={this.addNewOption}
              formikProps={formikProps}
            />
          </Form>
        )}
      </Formik>
    )
  }
}

export default AddQuestionForm
