import React from 'react'
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'

const ViewQuizDetails = (props) => {
  let { quizDetails } = props
  const history = useHistory()

  const viewQuestions = (quizId) => {
    history.push(`/admin/quiz/${quizId}/questions`)
  }
  return (
    <Card>
      <CardActionArea className="bg-dark text-white py-3 px-4">
        <Typography variant="h5">Quiz details</Typography>
      </CardActionArea>
      <CardContent>
        <div className="container">
          <div className="d-flex justify-content-between px-5 mb-2">
            <Typography className="font-weight-bold">Title:</Typography>
            <Typography>{quizDetails ? quizDetails.title : ''}</Typography>
          </div>
          <div className="d-flex justify-content-start px-5 mt-3">
            <div className="align-self-end mt-2">
              <Button
                variant="outlined"
                className="bg-dark text-white"
                onClick={() => viewQuestions(quizDetails._id)}
              >
                View questions
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const mapStateToProps = (state) => {
  return {
    quizDetails: state.quizReducer.quizDetails,
  }
}

export default connect(mapStateToProps)(ViewQuizDetails)
