import React from 'react'
import JwtDecode from 'jwt-decode'
import cookie from 'js-cookie'
import { connect } from 'react-redux'
import { setAuthenticatedUser } from '../reducers/adminReducer'

export default function (WrappedComponent, isRedirectIfNotAuth) {
  class ProtectedRoute extends React.Component {
    /**
     * Check user's authentication
     */
    checkAuthentication() {
      const initReducer = { authenticated: false }

      let cookieData = cookie.getJSON()

      if (Object.keys(cookieData).length !== 0 && cookieData.token) {
        let decodedToken = JwtDecode(cookieData.token)

        if (Date.now() >= decodedToken.exp * 1000) {
          if (isRedirectIfNotAuth) this.props.history.push('/login')

          this.props.setAuthenticatedUser(initReducer)
        } else {
          this.props.setAuthenticatedUser({
            authenticated: true,
            firstName: decodedToken.firstName,
            lastName: decodedToken.lastName,
          })
        }
      } else {
        if (isRedirectIfNotAuth) this.props.history.replace('/login')
        this.props.setAuthenticatedUser(initReducer)
      }
    }

    componentDidMount() {
      this.checkAuthentication()
    }

    componentDidUpdate() {
      this.checkAuthentication()
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapDispatchToProps = {
    setAuthenticatedUser,
  }

  return connect(null, mapDispatchToProps)(ProtectedRoute)
}
