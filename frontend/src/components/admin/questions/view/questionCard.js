import {
  ButtonGroup,
  Card,
  CardContent,
  Paper,
  Typography,
  Button,
  CardActions,
  IconButton,
} from '@material-ui/core'
import React from 'react'
import { Edit, DeleteForever } from '@material-ui/icons'

const QuestionCard = (props) => {
  let { questionDetails, index } = props

  let rows = [...Array(Math.ceil(questionDetails.options.length / 2))]

  let optionRows = rows.map((row, index) =>
    questionDetails.options.slice(index * 2, index * 2 + 2)
  )

  let optionContent = optionRows.map((row, index) => (
    <div className="row" key={index}>
      {row.map((option, innerIndex) => (
        <div key={option._id} className="col-md-6 py-2">
          <Paper className="border p-3">
            <Typography>
              {index * 2 + innerIndex + 1}. {option.value}
            </Typography>
          </Paper>
        </div>
      ))}
    </div>
  ))

  return (
    <Card key={questionDetails._id} className="my-5">
      <CardContent className="p-0">
        <div className="pt-1 pb-1 p-3 bg-gray">
          <div className="d-flex justify-content-between">
            <Typography variant="h5" component="h2">
              Question {index + 1}
            </Typography>
          </div>
        </div>
        <div className="p-3 mt-0">
          <div className="d-flex justify-content-between">
            <div>
              <Typography variant="body1" component="p" className="mt-1">
                {questionDetails.question}
              </Typography>
            </div>
            <div className="align-self-center">
              <Typography variant="body1" component="p">
                Option type:{' '}
                <b>
                  {questionDetails.optionType.charAt(0).toUpperCase() +
                    questionDetails.optionType.slice(1)}
                </b>
              </Typography>
            </div>
          </div>
          {optionContent}
          <Typography variant="h6" component="h2" className="mb-1 mt-2">
            Correct answer
          </Typography>
          <ButtonGroup>
            {questionDetails.options.map((option, index) => (
              <Button
                key={index}
                size="large"
                disabled={!questionDetails.correctAnswer.includes(option.key)}
              >
                Option {index + 1}
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </CardContent>
      {props.quizStatus !== 'ACTIVE' && (
        <CardActions className="d-flex justify-content-end" disableSpacing>
          <IconButton
            onClick={() => props.editQuestion(questionDetails._id)}
            color="primary"
          >
            <Edit />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => props.handleDeleteDialog(true, questionDetails._id)}
          >
            <DeleteForever />
          </IconButton>
        </CardActions>
      )}
    </Card>
  )
}

export default QuestionCard
