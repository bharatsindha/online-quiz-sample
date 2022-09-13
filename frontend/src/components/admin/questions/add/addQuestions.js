import React from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core'

import QuestionService from '../../../../services/questionApi'
import AddQuestionForm from '../../../../forms/question/addQuestionForm'

class AddQuestions extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.questionService = new QuestionService()
  }

  /**
   * Submit the question
   *
   * @param {*} values
   * @param {*} optionsList
   * @returns
   */
  submitQuestion = (values, optionsList) => {
    let { quizId } = this.props
    let answerList = optionsList.filter((option) => option.answer)

    if (answerList.length === 0) {
      this.props.handleSnackBar(true, 'Select an correct option', 'error')
    } else {
      let optionObj = {}
      for (let i = 0; i < optionsList.length; i++) {
        optionObj[optionsList[i].key] = {
          value: optionsList[i].value,
          answer: optionsList[i].answer,
        }
      }

      values['quizId'] = quizId
      values['optionsList'] = JSON.stringify(optionObj)
      return this.questionService.create(values)
    }
  }

  render() {
    return (
      <Card>
        <CardActionArea className="bg-dark text-white py-3 px-4">
          <Typography variant="h5">Add Question</Typography>
        </CardActionArea>
        <CardContent>
          <AddQuestionForm
            handleSnackBar={this.props.handleSnackBar}
            handleSubmit={this.submitQuestion}
          />
        </CardContent>
      </Card>
    )
  }
}

export default AddQuestions
