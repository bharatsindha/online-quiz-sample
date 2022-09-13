import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css'
import Admin from './components/admin/admin'
import Home from './components/home'
import Login from './components/login/login'
import Signup from './components/signup/signup'
import StartQuiz from './components/startQuiz/startQuiz'
import protectedRoute from './hoc/protectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={protectedRoute(Home, false)}></Route>
        <Route path="/signup" component={protectedRoute(Signup, false)}></Route>
        <Route path="/login" component={protectedRoute(Login, false)}></Route>
        <Route path="/admin" component={protectedRoute(Admin, true)}></Route>
        <Route
          path="/startQuiz"
          component={protectedRoute(StartQuiz, false)}
        ></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
