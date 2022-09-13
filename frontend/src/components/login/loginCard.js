import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import UserService from '../../services/userApi'
import LoginForm from '../../forms/loginForm'
import styles from './login.module.css'
import Snackbar from '../../common/customSnackbar'

class LoginCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      snackbar: { show: false, msg: '', type: '' },
    }
    this.userService = new UserService()
  }

  /**
   * Handle login
   *
   * @param {*} data
   */
  handleLogin = (data) => {
    this.userService.setCookie(data.token)
    this.props.history.push('/admin/quiz')
  }

  /**
   * Handle error
   *
   * @param {*} error
   */
  handleError = (error) => {
    if (error.response) {
      this.handleSnackBar(true, error.response.data.msg, 'error')
    }
  }

  /**
   * Handle snackbar
   *
   * @param {*} show
   * @param {*} msg
   * @param {*} type
   */
  handleSnackBar = (show, msg, type) => {
    if (type === undefined) {
      type = 'error'
    }
    this.setState({ snackbar: { show, msg, type } })
  }

  render() {
    let { snackbar } = this.state
    return (
      <div className="container py-3">
        <h2 className={`bg-white text-center ${styles.loginHeading}`}>Login</h2>
        {this.state.error ? (
          <p className="mb-0 text-danger font-weight-bold">
            * {this.state.error}
          </p>
        ) : (
          ' '
        )}
        <LoginForm
          handleLogin={this.handleLogin}
          handleError={this.handleError}
        />
        <Snackbar
          handleSnackBar={this.handleSnackBar}
          snackBarType={snackbar.type}
          message={snackbar.msg}
          show={snackbar.show}
        />
      </div>
    )
  }
}

export default withRouter(LoginCard)
