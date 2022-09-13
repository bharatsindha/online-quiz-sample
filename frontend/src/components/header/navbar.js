import React from 'react'
import { useLocation } from 'react-router'
import { AppBar, Toolbar, makeStyles, Link } from '@material-ui/core'
import clsx from 'clsx'
import AppbarCollapse from './appbarCollapse'
import LogoImage from '../../assets/logo.png'

const useStyles = makeStyles((theme) => ({
  buttonBar: {
    [theme.breakpoints.down('xs')]: {
      display: 'none !important',
    },
    background: 'transparent',
  },
  verticalButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',
    },
  },
  navbar: {
    backgroundColor: 'white',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}))

const Navbar = (props) => {
  const classes = useStyles()
  const location = useLocation()
  const [active, setActive] = React.useState(0)

  React.useEffect(() => {
    let pathname = location.pathname
    if (pathname === '/admin') setActive(0)
    else if (pathname === '/admin/quiz') setActive(1)
    else if (pathname === '/signup') setActive(2)
    else if (pathname === '/login') setActive(3)
  }, [location])

  return (
    <AppBar position="static" className={clsx(classes.navbar)}>
      <Toolbar>
        <Link href="/">
          <img
            src={LogoImage}
            // width="40"
            height="50"
            className="align-top"
            alt="logo"
          />
        </Link>
        <AppbarCollapse activeTab={active} setActiveTab={setActive} />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
