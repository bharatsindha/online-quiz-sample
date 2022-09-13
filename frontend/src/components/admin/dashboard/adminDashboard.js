import React from 'react'
import { ButtonBase, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import QuizService from '../../../services/quizApi'
import styles from './adminDashboard.module.css'

const useStyles = (theme) => ({
  informationCard: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
    },
  },
  quizinerChartCard: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '15px',
    },

    [theme.breakpoints.up('sm')]: {
      marginTop: '0px',
    },
  },
})

class AdminDashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      quizCount: 0,
    }
    this.quizService = new QuizService()
  }

  componentDidMount() {
    this.quizService.getDashboardCardDetails().then((response) => {
      let data = response.data
      this.setState({
        quizCount: data.quizCount,
      })
    })
  }

  render() {
    let { quizCount } = this.state

    let { classes } = this.props

    return (
      <div className="container-fluid">
        <div className="row h-100 py-5">
          <div
            className={`col-xs-12 col-sm-6 col-md-3 ${classes.informationCard}`}
          >
            <Paper className="p-3">
              <div className="d-flex justify-content-between">
                <ButtonBase>
                  <i className={`fa fa-book ${styles.dashboardIcon}`}></i>
                </ButtonBase>
                <div className="text-center align-self-center">
                  <p
                    className={`mb-0 ${styles.quizinerPaperValue} font-weight-bold`}
                  >
                    {quizCount}
                  </p>
                  <p
                    className={`mb-0 ${styles.quizinerPaperText} text-secondary`}
                  >
                    {quizCount === 1 ? 'Quiz' : 'Quizzes'}
                  </p>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(useStyles)(AdminDashboard)
