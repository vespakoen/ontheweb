import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../redux/router'
import Login from './Login'
import HelpOthers from './HelpOthers'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import HelpOthersIcon from '@material-ui/icons/Hearing'
import RecorderIcon from '@material-ui/icons/Mic'
import RequestsIcon from '@material-ui/icons/RecordVoiceOver'
import ProfileIcon from '@material-ui/icons/Face'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
})

const routes = {
  helpOthers: HelpOthers
}

const App = (props) => {
  const Page = routes[props.router.stack[0]]
  if (!props.login.isLoggedIn) {
    return <Login />
  }
  return <div style={{ position: 'absolute', height: '100%', width: '100%', backgroundColor: '#252830' }}>
    <MuiThemeProvider theme={theme}>
      <SwipeableDrawer
        open={false}
      >
        <List component="nav">
          <ListItem button>
            <ListItemIcon>
              <HelpOthersIcon />
            </ListItemIcon>
            <ListItemText primary="Help Others" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <RecorderIcon />
            </ListItemIcon>
            <ListItemText primary="Get Help" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <RequestsIcon />
            </ListItemIcon>
            <ListItemText primary="Humms" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ProfileIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </SwipeableDrawer>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            Get Help
          </Typography>
        </Toolbar>
      </AppBar>
      <Page />
    </MuiThemeProvider>
  </div>
}

export default connect(
  state => state,
  actions
)(App)