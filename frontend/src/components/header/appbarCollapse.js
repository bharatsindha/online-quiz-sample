import React from 'react'
import {
  Typography,
  Link,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
} from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { setAuthenticatedUser } from '../../reducers/adminReducer'
import UserService from '../../services/userApi'
import LogOutModal from '../../modals/logOutModal'
import styles from '../home.module.css'
import CollapseMenu from './collapseMenu'

const useStyles = makeStyles((theme) => ({
  buttonBar: {
    [theme.breakpoints.down('xs')]: {
      display: 'none !important',
    },
    background: 'transparent',
  },
  menuList: {
    padding: 0,
  },
  activeUserButton: {
    backgroundColor: '#3f51b5',
    color: 'white !important',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  userButton: {
    color: 'black',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    '&:hover': {
      borderRadius: 10,
      backgroundColor: '#585F63',
      color: 'white',
    },
  },
  navbarItem: {
    fontFamily: 'Raleway',
    fontSize: 15,
  },
}))

const TypographyMenu = (props) => {
  const classes = useStyles()
  return (
    <Menu
      anchorEl={props.anchorEl}
      open={Boolean(props.anchorEl)}
      keepMounted
      getContentAnchorEl={null}
      disableAutoFocusItem
      id="user-menu"
      onClose={props.handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <MenuList className={classes.menuList}>
        <MenuItem
          onClick={() => {
            props.handleClose()
            props.setLogoutModal(true)
          }}
        >
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Logout</Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

const AppbarCollapse = (props) => {
  let [show, setModal] = React.useState(false)
  const [userMenu, setUserMenu] = React.useState(null)

  /**
   * Logout the user
   */
  let logOutUser = () => {
    let userService = new UserService()
    userService.removeCookie()
    props.setAuthenticatedUser({ authenticated: false })
    setModal(false)
    props.history.push('/login')
  }

  /**
   * Handle the menu click
   *
   * @param {*} event
   */
  const handleClick = (event) => {
    setUserMenu(event.currentTarget)
  }

  /**
   * Handle menu close
   */
  const handleClose = () => {
    setUserMenu(null)
  }

  /**
   * Handle tab change
   *
   * @param {*} index
   */
  const handleTabChange = (index) => {
    props.setActiveTab(index)

    if (index === 0) props.history.push('/admin/quiz')
  }

  const classes = useStyles()
  const { activeTab } = props
  return (
    <div className={`ml-auto ${classes.buttonBar}`} id="appbar-collapse">
      {props.authenticated ? (
        <div className="d-flex">
          <div
            onClick={() => handleTabChange(0)}
            className={`${classes.userButton} cursor-pointer mr-2 ${
              activeTab === 1 ? classes.activeUserButton : ''
            }`}
          >
            Quiz List
          </div>

          <div
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className={`${classes.userButton} cursor-pointer`}
          >
            {`${props.name.split(' ')[0]}`}
          </div>
          <TypographyMenu
            anchorEl={userMenu}
            handleClose={handleClose}
            setLogoutModal={setModal}
          />
        </div>
      ) : (
        <div className="d-flex">
          <Typography
            variant="body1"
            className={`mx-2 ${styles.navbarItem} cursor-pointer ${
              activeTab === 3 ? styles.activeTab : 'mt-1'
            }`}
          >
            <Link
              href="/login"
              className={activeTab === 3 ? 'text-white' : 'text-dark'}
            >
              Login
            </Link>
          </Typography>
          <Typography
            variant="body1"
            className={`mx-2 ${styles.navbarItem} cursor-pointer ${
              activeTab === 2 ? styles.activeTab : 'mt-1 text-dark'
            }`}
          >
            <Link
              href="/signup"
              className={activeTab === 2 ? 'text-white' : 'text-dark'}
            >
              Sign Up
            </Link>
          </Typography>
        </div>
      )}

      <CollapseMenu
        anchorEl={props.anchorEl}
        handleMenuClick={props.handleMenuClick}
      />
      <LogOutModal show={show} closeModal={setModal} logOutUser={logOutUser} />
    </div>
  )
}

const mapDispatchToProps = {
  setAuthenticatedUser,
}

/**
 * Map state to props
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = (state) => {
  return {
    authenticated: state.adminReducer.authenticated,
    name: state.adminReducer.name,
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppbarCollapse)
)
