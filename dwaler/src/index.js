import 'whatwg-fetch'
import config from '../config'
import React from 'react'
import ReactDOM from 'react-dom'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import dwalerTheme from './theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBar from 'material-ui/AppBar';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import Menu from './components/Menu'

const styles = {
  root: {
    width: '100%',
    clear: 'both'
  },
  content: {
    width: '70%',
    float: 'left'
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    fetch(config.TOP_TRACKS_URL)
      .then(res => res.json())
      .then(tracks => this.setState({ tracks }))
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(dwalerTheme)}>
        <div id="app">
          <AppBar
            title="Dwaler"
            iconElementRight={
              <IconMenu
                iconButtonElement={
                  <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" />
              </IconMenu>
            }
          />
          <div style={styles.root}>
            <Menu />
            <div style={styles.content}>
              content
            </div>
          </div>
          
          { JSON.stringify(this.state.tracks) }
        </div>
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
