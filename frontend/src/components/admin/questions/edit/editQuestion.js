import React from 'react'
import { Card, Fab, Typography } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

import EditQuestionForm from '../../../../forms/question/editQuestionForm'
import QuestionService from '../../../../services/questionApi'
import CustomSnackBar from '../../../../common/customSnackbar'

class EditQuestion extends React.Component {
  constructor() {
    super()
    this.state = {
      questionDetails: {},
      optionsList: [],
      selectedIndex: '',
      snackbar: { show: false, msg: '', type: '' },
    }
    this.questionService = new QuestionService()
  }

  componentDidMount() {
    let questionId = this.props.match.params.questionId
    this.questionService.getParticular(questionId).then((res) => {
      let questionData = res.data.questionDetails

      let optionsList = []

      questionData.options.forEach((option) => {
        optionsList.push({
          key: option.key,
          value: option.value,
          answer: questionData.correctAnswer.includes(option.key),
        })
      })
      this.setState({
        questionDetails: {
          question: questionData.question,
          optionType: questionData.optionType,
          description: questionData.description,
        },
        optionsList,
      })
    })
  }

  /**
   * Submit the question
   *
   * @param {*} values
   */
  submitQuestion = (values) => {
    let { optionsList } = this.state

    let questionId = this.props.match.params.questionId
    let quizId = this.props.match.params.quizId

    let answerList = optionsList.filter((option) => option.answer)

    if (answerList.length === 0) {
      this.handleSnackBar(true, 'Select an correct option', 'error')
    } else {
      let optionObj = {}
      for (let i = 0; i < optionsList.length; i++) {
        optionObj[optionsList[i].key] = {
          value: optionsList[i].value,
          answer: optionsList[i].answer,
        }
      }

      values['optionsList'] = JSON.stringify(optionObj)
      values['quizId'] = quizId

      delete values['option']
      this.questionService.update(questionId, values).then((res) => {
        this.handleSnackBar(true, res.data.msg, 'success')
        setTimeout(() => {
          this.props.history.goBack()
        }, 1500)
      })
    }
  }

  /**
   * Handle correct answer change
   *
   * @param {*} index
   * @param {*} optionType
   */
  handleCorrectAnswerChange = (index, optionType) => {
    let tempOptionsList = this.state.optionsList

    if (optionType === 'single') {
      tempOptionsList.forEach((option, optIndex) => {
        if (optIndex === index) option.answer = true
        else option.answer = false
      })
    } else {
      tempOptionsList.forEach((option, optIndex) => {
        if (optIndex === index)
          if (option.answer) option.answer = false
          else option.answer = true
      })
    }

    this.setState({ optionsList: tempOptionsList })
  }

  /**
   * Remove option
   *
   * @param {*} index
   */
  removeOption = (index) => {
    let { optionsList } = this.state
    optionsList = optionsList.filter((option, optIndex) => optIndex !== index)
    this.setState({ optionsList })
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
   * Handle selected index
   *
   * @param {*} index
   */
  handleSelectedIndex = (index) => {
    this.setState({
      selectedIndex: index,
    })
  }

  /**
   * Update option
   *
   * @param {*} formikProps
   */
  updateOption = (formikProps) => {
    let newOption = formikProps.values.option
    let { optionsList, selectedIndex } = this.state

    let tempOptionsList = optionsList.map((option, index) => {
      if (index === selectedIndex) {
        option.value = newOption
      }
      return option
    })

    this.setState({
      optionsList: tempOptionsList,
    })
    formikProps.setFieldValue('option', '')
  }

  /**
   * Handle snackbar
   *
   * @param {*} status
   * @param {*} msg
   * @param {*} type
   */
  handleSnackBar = (status, msg, type) => {
    this.setState({ snackbar: { show: status, msg: msg, type: type } })
  }

  /**
   * Delete question
   */
  deleteQuestion = () => {
    let questionId = this.props.match.params.questionId
    this.questionService.delete(questionId).then((response) => {
      this.props.history.goBack()
    })
  }

  render() {
    let { questionDetails, optionsList, snackbar } = this.state
    return (
      <div className="container-fluid p-5">
        <Card className="p-3 mb-3">
          <div className="d-xs-block d-md-flex justify-content-between">
            <div>
              <Typography variant="h4">Question</Typography>
              <Typography variant="subtitle1">Edit quiz question</Typography>
            </div>
            <div className="align-self-center">
              <Fab
                color="secondary"
                aria-label="add"
                onClick={this.deleteQuestion}
              >
                <Delete />
              </Fab>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="w-100 mx-auto">
            <EditQuestionForm
              questionDetails={questionDetails}
              optionsList={optionsList}
              handleCorrectAnswerChange={this.handleCorrectAnswerChange}
              removeOption={this.removeOption}
              addNewOption={this.addNewOption}
              updateOption={this.updateOption}
              handleSelectedIndex={this.handleSelectedIndex}
              handleSubmit={this.submitQuestion}
              handleFileChange={this.handleFileChange}
              handleSnackBar={this.handleSnackBar}
            />
          </div>
        </Card>
        <CustomSnackBar
          show={snackbar.show}
          snackBarType={snackbar.type}
          handleSnackBar={this.handleSnackBar}
          message={snackbar.msg}
        />
      </div>
    )
  }
}

export default EditQuestion
