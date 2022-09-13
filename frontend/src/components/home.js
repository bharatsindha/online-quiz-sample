import React from 'react'
import Navbar from './header/navbar'
import { withStyles } from '@material-ui/core'

const style = (theme) => ({
  containerFlud: {},
  homeBackground: {
    padding: '60px 0px',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100% - 55px)',
    },
  },
  homeHeading: {
    fontFamily: 'Raleway',
    fontSize: '35px',
    fontWeight: 800,
  },
  homeSubHeading: {
    fontFamily: 'Raleway',
    fontSize: '18px',
    textAlign: 'center',
  },
  cardHeading: {
    fontFamily: 'Raleway',
  },
})

const Home = (props) => {
  const { classes } = props

  return (
    <div className={'container-fluid p-0 h-100 ' + classes.containerFlud}>
      <Navbar {...props} />
      <div className={`${classes.homeBackground}`}>
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-start mt-4">
            <div className="col-md-5 col-sm-12 d-flex flex-column align-items-center">
              <h2 className={` ${classes.homeHeading}`}>Quiz Builder App</h2>
              <p className={`mb-0 ${classes.homeSubHeading} `}>
                Get started and publish quiz in less than 5 minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withStyles(style)(Home)
