import React from 'react'
import { Card, Divider, Typography } from '@material-ui/core'

import NewQuizForm from '../../../../forms/quiz/newQuizForm'
import QuizService from '../../../../services/quizApi'

class CreateQuiz extends React.Component {
  constructor() {
    super()
    this.state = {
      snackBar: { show: false, msg: '', type: '' },
    }

    this.quizService = new QuizService()
  }

  componentDidMount() {}

  /**
   * Handle submit quiz
   * @param {*} quizData
   */
  handleSubmit = (quizData) => {
    this.quizService.saveQuizDetails(quizData).then((res) => {
      this.props.history.replace('/admin/quiz')
    })
  }

  render() {
    return (
      <div className="container py-5">
        <Card className="p-3">
          <Typography variant="h5" component="h2" className="mb-3">
            Create new quiz
          </Typography>

          <div className="container">
            <Divider />
            <NewQuizForm handleSubmit={this.handleSubmit} />
          </div>
        </Card>
      </div>
    )
  }
}

export default CreateQuiz
