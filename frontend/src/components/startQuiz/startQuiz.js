import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from '../header/navbar'
import QuizQuestion from './quizQuestion/quizQuestion'

const StartQuiz = (props) => {
  return (
    <div className="bgGrey" style={{ height: 'initial' }}>
      <Navbar {...props} />
      <Switch>
        <Route
          exact
          path="/startQuiz/:quizCode/question"
          component={QuizQuestion}
        />
      </Switch>
    </div>
  )
}

export default StartQuiz
