import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Navbar from '../header/navbar'
import adminDashboard from './dashboard/adminDashboard'
import EditQuestion from './questions/edit/editQuestion'
import Questions from './questions/questions'
import ViewQuestions from './questions/view/viewQuestions'
import CreateQuiz from './quiz/create/createQuiz'
import EditQuiz from './quiz/edit/editQuiz'
import Quiz from './quiz/quiz'

const Admin = (props) => {
  return (
    <div className="bgGrey" style={{ height: 'initial' }}>
      <Navbar {...props} />
      <Switch>
        <Route exact path="/admin" component={adminDashboard} />
        <Route exact path="/admin/quiz" component={Quiz} />
        <Route path="/admin/quiz/new" component={CreateQuiz}></Route>
        <Route exact path="/admin/quiz/:quizId" component={EditQuiz}></Route>
        <Route
          exact
          path="/admin/quiz/:quizId/question/new"
          component={Questions}
        ></Route>
        <Route
          exact
          path="/admin/quiz/:quizId/question/:questionId"
          component={EditQuestion}
        ></Route>
        <Route
          path="/admin/quiz/:quizId/questions"
          component={ViewQuestions}
        ></Route>
        <Redirect from="/admin/*" to="/admin" />
      </Switch>
    </div>
  )
}

export default Admin
