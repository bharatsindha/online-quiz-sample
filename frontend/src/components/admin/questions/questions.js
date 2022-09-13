import React from 'react'
import { withRouter } from 'react-router-dom'

import AddQuestion from './add/addQuestions'
import CustomSnackBar from '../../../common/customSnackbar'
import ViewQuizDetails from './viewQuizDetails'
import QuizService from '../../../services/quizApi'
import { connect } from 'react-redux'
import { setQuizDetails } from '../../../reducers/quizReducer'

class Questions extends React.Component {
  constructor() {
    super()
    this.state = {
      snackbar: { show: false, msg: '', type: '' },
    }
    this.quizService = new QuizService()
  }

  componentDidMount() {
    let quizId = this.props.match.params.quizId
    this.quizService.getQuizQuestionDetails(quizId).then((res) => {
      if (res.data.quizDetails) {
        this.props.setQuizDetails(res.data.quizDetails)
      } else {
        this.handleSnackBar(true, 'Quiz do not found!', 'error')
        setTimeout(() => {
          this.props.history.replace('/admin/quiz')
        }, 1500)
      }
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
    this.setState({ snackbar: { show: status, msg, type } })
  }

  render() {
    let { snackbar } = this.state

    return (
      <div className="container-fluid p-5 ">
        <div className="row">
          <div className="col-md-7">
            <AddQuestion
              handleSnackBar={this.handleSnackBar}
              quizId={this.props.match.params.quizId}
            />
          </div>
          <div className="col-md-5">
            <ViewQuizDetails />
          </div>
        </div>
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
const mapDispatchToProps = {
  setQuizDetails,
}
export default withRouter(connect(null, mapDispatchToProps)(Questions))
