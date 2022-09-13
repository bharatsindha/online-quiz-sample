import React from 'react'
import { Card, makeStyles } from '@material-ui/core'

import LoginCard from './loginCard'
import Navbar from '../header/navbar'

const useStyles = makeStyles((theme) => ({
  containerFlud: {
    height: '100vh !important',
  },
  loginContainer: {
    height: 'calc(100% - 64px)',
    padding: '60px 0px',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100% - 55px)',
    },
    backgroundColor: '#f5f5f5',
  },
  loginCard: {
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '78%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
    [theme.breakpoints.up('md')]: {
      width: '30%',
    },
  },
}))

const Login = (props) => {
  const classes = useStyles()
  return (
    <div className={'container-fluid p-0 h-100 ' + classes.containerFlud}>
      <Navbar {...props} />
      <div className={classes.loginContainer}>
        <section className="">
          <Card className={`mx-auto h-100 ${classes.loginCard}`}>
            <LoginCard />
          </Card>
        </section>
      </div>
    </div>
  )
}

export default Login
