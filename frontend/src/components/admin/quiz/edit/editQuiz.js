import React from 'react'
import { Card, Typography } from '@material-ui/core'

import QuizService from '../../../../services/quizApi'
import EditQuizForm from '../../../../forms/quiz/edit/editQuizForm'
import CustomSnackBar from '../../../../common/customSnackbar'

class EditQuiz extends React.Component {
  constructor() {
    super()
    this.state = {
      quiz: {},
      snackbar: { show: false, msg: '', type: '' },
    }
    this.quizService = new QuizService()
  }

  componentDidMount() {
    let quizId = this.props.match.params.quizId
    this.quizService.getParticularQuiz(quizId).then((res) => {
      let response = res.data
      this.setState({
        quiz: { ...response.quizDetails },
      })
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

    this.setState({
      snackbar: {
        show: status,
        msg: msg,
        type: type,
      },
    })
  }

  /**
   * Update quiz details
   *
   * @param {*} data
   */
  updateQuizDetails = (data) => {
    let quizId = this.props.match.params.quizId

    this.quizService
      .updateQuiz(quizId, data)
      .then((response) => {
        this.handleSnackBar(true, response.data.msg, 'success')
        this.setState({
          quiz: { ...response.data.quizDetails },
        })
        setTimeout(() => {
          this.props.history.replace('/admin/quiz')
        }, 1000)
      })
      .catch((error) => {
        this.handleSnackBar(true, error.response.data.msg, 'error')
      })
  }

  render() {
    let { quiz, snackbar } = this.state
    return (
      <div className="container py-5 px-4">
        <Card className="p-3 mb-4">
          <div className="d-xs-block d-md-flex justify-content-between">
            <div>
              <Typography variant="h4">Edit quiz</Typography>
            </div>
          </div>
        </Card>
        <Card style={{ height: '430px' }}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <EditQuizForm
                  quizDetails={quiz}
                  handleSubmit={this.updateQuizDetails}
                />
              </div>
            </div>
          </div>
          <CustomSnackBar
            show={snackbar.show}
            snackBarType={snackbar.type}
            handleSnackBar={this.handleSnackBar}
            message={snackbar.msg}
          />
        </Card>
      </div>
    )
  }
}

export default EditQuiz
