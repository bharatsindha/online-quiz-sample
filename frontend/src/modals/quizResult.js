import React from 'react'
import {
  Modal,
  Button,
  Paper,
  makeStyles,
  Typography,
  Backdrop,
  Fade,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const QuizResult = (props) => {
  const classes = useStyles()

  return (
    <Modal
      open={props.show}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.show}>
        <Paper className="w-50 p-4">
          <Typography variant="h6" component="p">
            Quiz Result
          </Typography>
          <Typography variant="body1" component="p" className="my-3">
            You answered {props.result ? props.result.totalCorrect : 0}/
            {props.result ? props.result.totalQuestion : 0} questions correctly.
          </Typography>
          <div className="d-flex justify-content-end mt-3">
            <Button
              variant="contained"
              className="bg-dark text-white"
              onClick={() => props.handleModal(false)}
            >
              Ok
            </Button>
          </div>
        </Paper>
      </Fade>
    </Modal>
  )
}

export default QuizResult
