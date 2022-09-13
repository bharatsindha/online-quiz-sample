import axios from 'axios'
import cookie from 'js-cookie'

class UserService {
  /**
   * Save new user
   *
   * @param {*} state
   * @returns
   */
  saveNewUsers = (state) => {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/signup`,
      data: state,
    })
  }

  /**
   * Login with the existing user
   *
   * @param {*} data
   * @returns
   */
  loginExisitingUser = (data) => {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/login`,
      data: {
        username: data.email,
        password: data.password,
      },
    })
  }

  /**
   * Set token
   *
   * @param {*} token
   * @returns
   */
  setCookie = (token) => cookie.set('token', token, { expires: 365 })

  /**
   * Get token
   *
   * @returns
   */
  getToken = () => cookie.get('token')

  /**
   * Remove token
   *
   * @returns
   */
  removeCookie = () => cookie.remove('token')
}
export default UserService
