import React, { Component } from 'react'
import Moment from 'react-moment'
import {
  Button,
  Card,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from '@material-ui/core'
import { Add, Delete, Edit, ViewHeadline, Publish } from '@material-ui/icons'

import QuizService from '../../../services/quizApi'
import DeleteModal from '../../../modals/deleteModal'
import CustomSnackBar from '../../../common/customSnackbar'
import { StyledTableCell, StyledTableRow } from '../../../common/customTable'
import BootstrapTooltip from '../../../common/customTooltip'
import SearchQuizForm from '../../../forms/quiz/searchQuizForm'

class Quiz extends Component {
  constructor() {
    super()
    this.state = {
      pageIndex: 0,
      pageSize: 5,
      quizList: [],
      pageCount: 0,
      deleteModal: { show: false, id: '' },
      snackbar: { show: false, msg: '', type: '' },
    }
    this.quizService = new QuizService()
  }

  /**
   * Get list of the quizzes
   *
   * @param {*} filteredValues
   */
  viewQuizs = (filteredValues) => {
    this.quizService
      .getAllQuiz({
        pageIndex: this.state.pageIndex,
        pageSize: this.state.pageSize,
        sort: this.state.sortedBy,
        ...filteredValues,
      })
      .then((res) => {
        this.setState({
          pageCount: res.data.quizCount,
          quizList: res.data.quizList,
        })
      })
  }

  componentDidMount() {
    let filteredValues = {}
    this.viewQuizs(filteredValues)
  }

  /**
   * Delete the quiz
   */
  deleteQuiz = () => {
    let quizId = this.state.deleteModal.id
    this.quizService.deleteQuiz(quizId).then((response) => {
      this.handleDeleteDialog(false, '')
      this.handleSnackBar(true, response.data.msg, 'success')
      this.viewQuizs({})
    })
  }

  /**
   * Add new question
   *
   * @param {*} quizId
   */
  addNewQuestion = (quizId) => {
    this.props.history.push(`/admin/quiz/${quizId}/question/new`)
  }

  /**
   * View question
   *
   * @param {*} quizId
   */
  viewQuestions = (quizId) => {
    this.props.history.push(`/admin/quiz/${quizId}/questions`)
  }

  /**
   * Create new quiz
   */
  createNewQuiz = () => {
    this.props.history.push({ pathname: '/admin/quiz/new' })
  }

  /**
   * Handle delete dialog
   *
   * @param {*} show
   * @param {*} quizId
   */
  handleDeleteDialog = (show, quizId) => {
    this.setState({ deleteModal: { show: show, id: quizId } })
  }

  /**
   * Update quiz
   *
   * @param {*} quizId
   */
  updateQuiz = (quizId) => {
    this.props.history.push({ pathname: `/admin/quiz/${quizId}` })
  }

  /**
   * Handle snackbar
   *
   * @param {*} status
   * @param {*} msg
   * @param {*} type
   */
  handleSnackBar = (status, msg, type) => {
    let { snackbar } = this.state

    if (type === undefined) type = snackbar.type
    this.setState({ snackbar: { show: status, msg: msg, type: type } })
  }

  /**
   * Handle page change
   *
   * @param {*} event
   * @param {*} value
   */
  handlePageChange = (event, value) => {
    this.setState({ pageIndex: value }, () => this.viewQuizs())
  }

  /**
   * Handle page size
   *
   * @param {*} event
   */
  handlePageSize = (event) => {
    this.setState({ pageSize: parseInt(event.target.value, 10) }, () =>
      this.viewQuizs()
    )
  }

  /**
   * Handle filter
   *
   * @param {*} filteredValues
   */
  handleFilter = (filteredValues) => {
    for (let [key, value] of Object.entries(filteredValues)) {
      if (value === '') {
        delete filteredValues[key]
      } else filteredValues[key] = value.toString()
    }
    this.viewQuizs(filteredValues)
  }

  /**
   * Publish quiz
   *
   * @param {*} quizId
   */
  publishQuiz = (quizId) => {
    this.quizService
      .publishQuiz(quizId)
      .then((response) => {
        this.handleSnackBar(true, response.data.msg, 'success')
        this.viewQuizs({})
      })
      .catch((error) => {
        this.handleSnackBar(true, error.response.data.msg, 'error')
      })
  }

  render() {
    let { quizList, deleteModal, snackbar, pageCount, pageIndex, pageSize } =
      this.state

    return (
      <div className="p-4">
        <Card className="p-3">
          <div className="d-xs-block d-md-flex justify-content-between">
            <div>
              <Typography variant="h4">Quiz</Typography>
              <Typography variant="subtitle1">Explore your quiz</Typography>
            </div>
            <div className="align-self-center">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={this.createNewQuiz}
              >
                Create new
              </Button>
            </div>
          </div>
        </Card>
        <Card className="mt-4 p-3">
          <SearchQuizForm
            handleFilter={this.handleFilter}
            viewQuizs={this.viewQuizs}
          />
        </Card>
        <TableContainer component={Paper} className="mt-4">
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>S.No</StyledTableCell>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell>Created At</StyledTableCell>
                <StyledTableCell>Permalink</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizList.length === 0 ? (
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={5}
                    className="text-center font-weight-bold"
                  >
                    No quiz available
                  </StyledTableCell>
                </StyledTableRow>
              ) : null}
              {quizList.map((quiz, index) => (
                <React.Fragment key={quiz._id}>
                  <StyledTableRow key={quiz._id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell>{quiz.title}</StyledTableCell>
                    <StyledTableCell>
                      <Moment format="MMM Do, YYYY (hh:mm A)">
                        {quiz.createdDate}
                      </Moment>
                    </StyledTableCell>
                    <StyledTableCell>
                      {quiz.status === 'ACTIVE'
                        ? `${window.location.origin}/startQuiz/${quiz.randomCode}/question`
                        : ''}
                    </StyledTableCell>
                    <StyledTableCell>
                      {quiz.status !== 'ACTIVE' ? 'Not publish' : 'Published'}
                    </StyledTableCell>
                    <StyledTableCell>
                      {quiz.status !== 'ACTIVE' && (
                        <>
                          <BootstrapTooltip title="Update quiz">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => this.updateQuiz(quiz._id)}
                            >
                              <Edit size="small" />
                            </IconButton>
                          </BootstrapTooltip>
                          <BootstrapTooltip title="Add question">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => this.addNewQuestion(quiz._id)}
                            >
                              <Add size="small" />
                            </IconButton>
                          </BootstrapTooltip>
                        </>
                      )}
                      <BootstrapTooltip title="View questions">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => this.viewQuestions(quiz._id)}
                        >
                          <ViewHeadline size="small" />
                        </IconButton>
                      </BootstrapTooltip>
                      <BootstrapTooltip title="Delete quiz">
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() =>
                            this.handleDeleteDialog(true, quiz._id)
                          }
                        >
                          <Delete size="small" />
                        </IconButton>
                      </BootstrapTooltip>
                      {quiz.status !== 'ACTIVE' && (
                        <BootstrapTooltip title="Publish quiz">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => this.publishQuiz(quiz._id)}
                          >
                            <Publish size="small" />
                          </IconButton>
                        </BootstrapTooltip>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 25]}
            colSpan={5}
            count={pageCount}
            rowsPerPage={pageSize}
            page={pageIndex}
            onPageChange={this.handlePageChange}
            onRowsPerPageChange={this.handlePageSize}
          ></TablePagination>
        </TableContainer>
        <DeleteModal
          show={deleteModal.show}
          hideModal={this.handleDeleteDialog}
          heading="quiz"
          deleteContent={this.deleteQuiz}
        />
        <CustomSnackBar
          show={snackbar.show}
          handleSnackBar={this.handleSnackBar}
          snackBarType={snackbar.type}
          message={snackbar.msg}
        />
      </div>
    )
  }
}

export default Quiz
