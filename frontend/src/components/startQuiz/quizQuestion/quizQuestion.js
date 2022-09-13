import React from 'react'
import {
  Card,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  FormGroup,
  Checkbox,
  Typography,
  IconButton,
} from '@material-ui/core'

import { ChevronLeft, ChevronRight, Save } from '@material-ui/icons'

import QuizService from '../../../services/quizApi'
import styles from './quizQuestion.module.css'
import SubmitQuizModal from '../../../modals/submitQuizModal'
import CustomSnackBar from '../../../common/customSnackbar'
import BootstrapTooltip from '../../../common/customTooltip'
import { connect } from 'react-redux'
import { setAnswer } from '../../../reducers/quizReducer'
import QuizResult from '../../../modals/quizResult'

class QuizQuestion extends React.Component {
  constructor() {
    super()
    this.state = {
      pageIndex: 0,
      question: '',
      options: [],
      optionType: '',
      questionCount: 0,
      singleOptValue: '',
      multiOptValue: {},
      questionId: '',
      submitModal: false,
      resultModal: false,
      snackbar: { show: false, msg: '', type: '' },
      description: '',
      title: '',
      result: {},
    }
    this.quizService = new QuizService()
  }

  componentDidMount() {
    let { pageIndex } = this.state
    this.nextQuestion(pageIndex)
  }

  /**
   * Open next question
   *
   * @param {*} pageIndex
   */
  nextQuestion(pageIndex) {
    let quizCode = this.props.match.params.quizCode
    let answers = this.props.answers

    this.quizService.getQuestionForQuiz(quizCode, pageIndex).then((res) => {
      if (!res.data.questionDetails) {
        this.handleSnackBar(true, res.data.msg, 'error')
        setTimeout(() => {
          this.props.history.replace('/')
        }, 2000)
      }
      let singleOptValue = ''
      let questionData = res.data.questionDetails

      let multiOptValue = {}

      const checkAnswerExist =
        answers && answers.filter((a1) => a1.questionId === questionData._id)

      if (checkAnswerExist.length) {
        if (questionData.optionType === 'single')
          singleOptValue = checkAnswerExist[0].answer
        else multiOptValue = checkAnswerExist[0].answer
      } else {
        questionData &&
          questionData.options.forEach(
            (option) => (multiOptValue[option.key] = false)
          )
      }

      this.setState({
        question: questionData ? questionData.question : '',
        options: questionData ? questionData.options : [],
        optionType: questionData ? questionData.optionType : '',
        description: questionData ? questionData.description : '',
        singleOptValue,
        pageIndex,
        multiOptValue,
        questionId: questionData ? questionData._id : '',
        title: res.data.quizDetails ? res.data.quizDetails.title : '',
        questionCount: res.data.questionCount,
      })
    })
  }

  /**
   * Save the answer
   */
  saveAnswer = () => {
    let {
      questionId,
      singleOptValue,
      multiOptValue,
      optionType,
      pageIndex,
      questionCount,
    } = this.state

    if (!Object.values(multiOptValue).includes(true) && singleOptValue === '') {
      let msg = 'Attempt question before saving the answer'
      this.handleSnackBar(true, msg, 'error')
    } else {
      this.props.setAnswer({
        questionId: questionId,
        answer: optionType === 'single' ? singleOptValue : multiOptValue,
        optionType: optionType,
      })

      if (pageIndex < questionCount - 1) this.nextQuestion(pageIndex + 1)
      else this.nextQuestion(0)
    }
  }

  /**
   * Handle option change
   *
   * @param {*} event
   */
  handleOptionChange = (event) => {
    let { optionType, multiOptValue } = this.state
    if (optionType === 'single') {
      this.setState({ singleOptValue: event.target.value })
    } else {
      this.setState({
        multiOptValue: {
          ...multiOptValue,
          [event.target.name]: event.target.checked,
        },
      })
    }
  }

  /**
   * Handle submit quiz modal
   *
   * @param {*} status
   */
  handleSubmitQuizModal = (status) => {
    this.setState({ submitModal: status })
  }

  /**
   * Handle quiz result modal
   *
   * @param {*} status
   */
  handleQuizResultModal = (status) => {
    this.setState({ resultModal: status })
  }

  /**
   * Handle quit the quiz
   */
  quitQuiz = () => {
    this.handleQuizResultModal(false)
    this.props.history.replace('/')
  }

  /**
   * Submit the quiz
   */
  submitQuiz = () => {
    let quizCode = this.props.match.params.quizCode
    let answers = this.props.answers

    this.quizService.submitQuiz(quizCode, answers).then((res) => {
      this.handleSubmitQuizModal(false)

      this.setState({
        result: {
          totalQuestion: res.data.totalQuestions,
          totalAttempt: res.data.totalAttempt,
          totalCorrect: res.data.totalCorrect,
          totalWrong: res.data.totalWrong,
        },
      })

      this.handleQuizResultModal(true)
    })
  }

  /**
   * Handle snackbar
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

  render() {
    let {
      question,
      pageIndex,
      singleOptValue,
      snackbar,
      description,
      submitModal,
      resultModal,
      title,
      questionCount,
      result,
    } = this.state

    const SingleOption = () =>
      this.state.options.map((option, index) => {
        return (
          <div key={index} className="d-flex flex-row align-items-center">
            <p className="mr-2 mt-1 align-self-center">{index + 1})</p>
            <FormControlLabel
              value={option.key}
              label={option.value}
              control={<Radio color="primary" />}
            />
          </div>
        )
      })

    const MultipleOption = () =>
      this.state.options.map((option, index) => {
        return (
          <div key={index} className="d-flex flex-row align-items-center">
            <p className="mr-2 mt-1 align-self-center">{index + 1})</p>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.multiOptValue[option.key]}
                  name={option.key}
                  onChange={this.handleOptionChange}
                  color="primary"
                />
              }
              label={option.value}
              onChange={this.handleOptionChange}
            />
          </div>
        )
      })

    return (
      <React.Fragment>
        <div className="bg-dark w-100 py-1 px-4 d-flex justify-content-between">
          <Typography className="align-self-center text-white">
            {title}
          </Typography>
          <Typography className="align-self-center text-white">
            Total questions: {questionCount}
          </Typography>
        </div>
        <div className={styles.outerContainer}>
          <div className={styles.questionContainer}>
            <Card className="mb-2">
              <Typography
                variant="h5"
                className="text-center py-2 font-weight-bold"
              >
                Question {pageIndex + 1}
              </Typography>
            </Card>
            <Card className="p-2">
              <Typography className="mt-2">{question}</Typography>
              {description ? (
                <div
                  dangerouslySetInnerHTML={{ __html: description }}
                  className={styles.description}
                />
              ) : null}
            </Card>
          </div>
          <div className={styles.optionsContainer}>
            <Card className="mb-2">
              <Typography
                variant="h5"
                className="text-center py-2 font-weight-bold"
              >
                Options
              </Typography>
            </Card>
            <Card className="p-2">
              <FormControl component="fieldset">
                {this.state.optionType === 'single' ? (
                  <RadioGroup
                    name="gender1"
                    value={singleOptValue}
                    onChange={this.handleOptionChange}
                  >
                    <SingleOption />
                  </RadioGroup>
                ) : (
                  <FormGroup>
                    <MultipleOption />
                  </FormGroup>
                )}
              </FormControl>
            </Card>
          </div>
        </div>
        <div className={styles.footer + ' bg-dark'}>
          <div>
            <IconButton
              disabled={pageIndex === 0}
              onClick={() => this.nextQuestion(pageIndex - 1)}
            >
              <BootstrapTooltip title="Previous">
                <ChevronLeft className="text-white" />
              </BootstrapTooltip>
            </IconButton>

            <IconButton onClick={this.saveAnswer}>
              <BootstrapTooltip title="Save">
                <Save className="text-white" />
              </BootstrapTooltip>
            </IconButton>

            <IconButton
              disabled={pageIndex === questionCount - 1}
              onClick={() => this.nextQuestion(pageIndex + 1)}
            >
              <BootstrapTooltip title="Next">
                <ChevronRight className="text-white" />
              </BootstrapTooltip>
            </IconButton>
          </div>
          <Button
            variant="contained"
            className=" align-self-center"
            onClick={() => this.handleSubmitQuizModal(true)}
          >
            Submit quiz
          </Button>
        </div>
        <SubmitQuizModal
          show={submitModal}
          submitQuiz={this.submitQuiz}
          handleModal={this.handleSubmitQuizModal}
        />
        <QuizResult
          show={resultModal}
          handleModal={this.quitQuiz}
          result={result}
        />
        <CustomSnackBar
          show={snackbar.show}
          snackBarType={snackbar.type}
          handleSnackBar={this.handleSnackBar}
          message={snackbar.msg}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  answers: state.quizReducer.answers,
})

const mapDispatchToProps = {
  setAnswer,
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizQuestion)
