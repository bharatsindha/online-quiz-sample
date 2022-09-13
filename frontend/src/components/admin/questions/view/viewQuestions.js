import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Paper,
} from '@material-ui/core'

import QuestionService from '../../../../services/questionApi'
import styles from '../question.module.css'
import DeleteModal from '../../../../modals/deleteModal'
import QuestionCard from './questionCard'
import CustomSnackBar from '../../../../common/customSnackbar'

class ViewQuestions extends React.Component {
  constructor() {
    super()
    this.questionService = new QuestionService()
    this.state = {
      questionList: [],
      quizDetails: {},
      questionCount: 0,
      deleteModal: { show: false, id: '' },
      snackbar: { show: false, msg: '', type: '' },
    }
  }

  componentDidMount() {
    let quizId = this.props.match.params.quizId
    this.questionService.getAll(quizId).then((response) => {
      let data = response.data

      this.setState({
        questionList: data.questions,
        questionCount: data.count,
        quizDetails: data.quizDetails,
      })
    })
  }

  /**
   * Handle delete dialog
   *
   * @param {*} show
   * @param {*} id
   */
  handleDeleteDialog = (show, id) => {
    this.setState({ deleteModal: { show: show, id: id } })
  }

  /**
   * Handle snack bar
   *
   * @param {*} status
   * @param {*} msg
   * @param {*} type
   */
  handleSnackBar = (status, msg, type) => {
    let { snackbar } = this.state

    if (type === undefined) type = snackbar.type
    this.setState({ snackbar: { show: status, msg: msg, type: type } })
  }

  /**
   * Delete the question
   */
  deleteQuestion = () => {
    let questionId = this.state.deleteModal.id
    this.questionService.delete(questionId).then((response) => {
      let questionList = this.state.questionList.filter(
        (item) => item._id !== response.data.question._id
      )
      this.setState({ questionList })
      this.handleDeleteDialog(false, '')
      this.handleSnackBar(true, response.data.msg, 'success')
    })
  }

  /**
   * Handle the question status
   *
   * @param {*} event
   * @param {*} questionId
   */
  handleQuestionStatus = (event, questionId) => {
    let value = event.target.checked
    let checked
    let { questionList } = this.state

    if (value) checked = 'ACTIVE'
    else checked = 'INACTIVE'

    this.questionService
      .updateQuestionStatus(questionId, { status: checked })
      .then((res) => {
        let updatedQuestionList = questionList.map((question) => {
          if (question._id === questionId) {
            question.status = checked
          }
          return question
        })

        this.setState({ questionList: updatedQuestionList })
        this.handleSnackBar(true, res.data.msg, 'success')
      })
  }

  /**
   * Handle add question
   */
  handleAddQuestion = () => {
    let quizId = this.props.match.params.quizId
    this.props.history.push(`/admin/quiz/${quizId}/question/new`)
  }

  /**
   * Edit question
   *
   * @param {*} questionId
   */
  editQuestion = (questionId) => {
    let quizId = this.props.match.params.quizId

    this.props.history.push(`/admin/quiz/${quizId}/question/${questionId}`)
  }

  /**
   * Question not found card
   *
   * @returns
   */
  noQuestionsCard = () => (
    <Card className="w-50 m-auto">
      <CardContent>
        <p className={`${styles.heading} text-dark text-center`}>
          This quiz does not contain any questions
        </p>
        <p className={`text-secondary ${styles.subHeading} text-center mb-0`}>
          Add new question
        </p>
      </CardContent>
      <CardActions className="d-flex flex-row justify-content-center">
        <Button
          size="large"
          color="primary"
          variant="contained"
          onClick={this.handleAddQuestion}
        >
          Add
        </Button>
      </CardActions>
    </Card>
  )

  render() {
    let { questionCount, snackbar, quizDetails } = this.state

    let questions = this.state.questionList.map((data, index) => {
      return (
        <QuestionCard
          index={index}
          key={index}
          questionDetails={data}
          quizStatus={quizDetails.status}
          handleDeleteDialog={this.handleDeleteDialog}
          handleQuestionStatus={this.handleQuestionStatus}
          editQuestion={this.editQuestion}
        />
      )
    })

    return (
      <div className="container py-5 h-100">
        <Card className="p-3">
          <div className="d-flex justify-content-between">
            <div>
              <Typography variant="h4">Quiz Questions</Typography>
              <Typography variant="subtitle1">
                View your quiz questions
              </Typography>
            </div>
            <div className="d-flex flex-row">
              <Paper className="d-flex flex-column bg-dark px-3 pt-1 text-white">
                <Typography variant="h6">Total Questions</Typography>
                <Typography className="align-self-center" variant="subtitle1">
                  {questionCount}
                </Typography>
              </Paper>
            </div>
          </div>
        </Card>
        {questions.length !== 0 ? questions : <this.noQuestionsCard />}
        <DeleteModal
          show={this.state.deleteModal.show}
          heading="question"
          deleteContent={this.deleteQuestion}
          hideModal={this.handleDeleteDialog}
        />
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

export default ViewQuestions
