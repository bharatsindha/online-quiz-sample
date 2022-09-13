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

const SubmitQuizModal = (props) => {
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
            Submit quiz
          </Typography>
          <Typography variant="body1" component="p" className="my-3">
            Are you sure you want to submit the quiz? You won't be able to
            attempt any question after submission.
          </Typography>

          <div className="d-flex justify-content-end mt-3">
            <Button
              variant="contained"
              className="bg-white mr-2"
              onClick={() => props.handleModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className="bg-dark text-white"
              onClick={props.submitQuiz}
            >
              Confirm
            </Button>
          </div>
        </Paper>
      </Fade>
    </Modal>
  )
}

export default SubmitQuizModal
