import React, { Component } from 'react'
import { Card, withStyles } from '@material-ui/core'

import './signup.module.css'
import Navbar from '../header/navbar'
import SignUpForm from '../../forms/signupForm'
import CustomSnackBar from '../../common/customSnackbar'
import { connect } from 'react-redux'

const style = (theme) => ({
  containerFlud: {
    height: '100vh !important',
  },
  signUpBackground: {
    height: 'calc(100% - 66px) !important',
    padding: '20px 0px',
    backgroundColor: '#f5f5f5',
  },
  signUpCard: {
    borderRadius: '10px',
    [theme.breakpoints.down('xs')]: {
      margin: '10px 0px',
    },
  },
  rocketIcon: {
    color: 'white',
    [theme.breakpoints.down('xs')]: {
      fontSize: '15vw !important',
    },
    [theme.breakpoints.up('xs')]: {
      fontSize: '55px !important',
    },

    [theme.breakpoints.up('md')]: {
      fontSize: '8vw !important',
    },
  },
  signupHeading: {
    fontFamily: 'Raleway',
  },
  signupSubHeading: {
    fontFamily: 'Raleway',
    fontSize: '18px',
    textAlign: 'center',
  },
  cardHeading: {
    fontFamily: 'Raleway',
  },
})

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      snackbar: { show: false, msg: '', type: '' },
    }
  }

  /**
   * Check authentication
   */
  checkAuthentication() {
    if (this.props.authenticated) this.props.history.push('/admin')
  }

  componentDidMount() {
    this.checkAuthentication()
  }

  componentDidUpdate() {
    this.checkAuthentication()
  }

  /**
   * Handle snackbar
   *
   * @param {*} show
   * @param {*} msg
   * @param {*} type
   */
  handleSnackBar = (show, msg, type) => {
    this.setState({ snackbar: { show, msg, type } })
  }

  render() {
    const { classes } = this.props
    let { snackbar } = this.state
    return (
      <div className={'container-fluid p-0 h-100 ' + classes.containerFlud}>
        <Navbar {...this.props} />
        <div className={`${classes.signUpBackground}`}>
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-start mt-4">
              <div className="col-md-7 col-sm-12">
                <Card className={`py-3 ${classes.signUpCard}`}>
                  <h2 className={`text-center mb-0 ${classes.cardHeading}`}>
                    Sign up
                  </h2>
                  <div className="px-5">
                    <SignUpForm handleSnackBar={this.handleSnackBar} />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <CustomSnackBar
          show={snackbar.show}
          message={snackbar.msg}
          snackBarType={snackbar.type}
          handleSnackBar={this.handleSnackBar}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.adminReducer.authenticated,
  }
}

export default withStyles(style)(connect(mapStateToProps, null)(SignUp))
