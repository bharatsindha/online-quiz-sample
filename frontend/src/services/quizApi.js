import axios from 'axios'
import UserService from './userApi'

class QuizService {
  constructor() {
    this.userService = new UserService()
    this.QUIZ_URL = 'api/v1/admin/quiz'
    this.QUIZ_PUBLIC_URL = 'api/v1/quiz'
    this.dashboardUrl = 'api/v1/admin/dashboard'
  }

  getDashboardCardDetails = () => {
    let token = this.userService.getToken()
    return axios({
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/${this.dashboardUrl}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }

  /**
   * Save quiz details
   *
   * @param {*} quizDetails
   * @returns
   */
  saveQuizDetails = (quizDetails) => {
    let token = this.userService.getToken()
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/${this.QUIZ_URL}`,
      data: quizDetails,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }

  /**
   * Get the list of quizzes
   *
   * @param {*} params
   * @returns
   */
  getAllQuiz = (params) => {
    let token = this.userService.getToken()
    return axios({
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/${this.QUIZ_URL}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params: params,
    })
  }

  /**
   * Get the particular quiz details
   *
   * @param {*} quizId
   * @returns
   */
  getParticularQuiz = (quizId) => {
    let token = this.userService.getToken()
    return axios({
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/${this.QUIZ_URL}/${quizId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }

  /**
   * Update the quiz
   *
   * @param {*} quizId
   * @param {*} data
   * @returns
   */
  updateQuiz = (quizId, data) => {
    let token = this.userService.getToken()
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_BASE_URL}/${this.QUIZ_URL}/${quizId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    })
  }

  /**
   * Delete the quiz
   *
   * @param {*} quizId
   * @returns
   */
  deleteQuiz = (quizId) => {
    let token = this.userService.getToken()
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_BASE_URL}/${this.QUIZ_URL}`,
      params: { quizId },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }

  /**
   * Publish the quiz
   *
   * @param {*} quizId
   * @returns
   */
  publishQuiz = (quizId) => {
    let token = this.userService.getToken()
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/${this.QUIZ_URL}/publish`,
      params: { quizId },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }

  /**
   * Get the question details of the quiz
   *
   * @param {*} quizId
   * @returns
   */
  getQuizQuestionDetails(quizId) {
    let token = this.userService.getToken()
    return axios({
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/${this.QUIZ_URL}/${quizId}/questionDetails`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }

  /**
   * Get the list of the quizzes
   *
   * @param {*} params
   * @returns
   */
  getQuizList(params) {
    let token = this.userService.getToken()
    return axios({
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/${this.QUIZ_URL}/quizDetails`,
      params: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }

  /**
   * Get the question for the quiz
   *
   * @param {*} quizCode
   * @param {*} pageIndex
   * @returns
   */
  getQuestionForQuiz(quizCode, pageIndex) {
    return axios({
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/${this.QUIZ_PUBLIC_URL}/${quizCode}/question`,
      params: { pageIndex },
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  /**
   * Submit the quiz
   *
   * @param {*} quizCode
   * @param {*} answers
   * @returns
   */
  submitQuiz(quizCode, answers) {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/${this.QUIZ_PUBLIC_URL}/${quizCode}/submit`,
      data: { answers: answers },
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export default QuizService
