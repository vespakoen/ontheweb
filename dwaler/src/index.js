import 'whatwg-fetch'
import config from '../config'
import React from 'react'
import ReactDOM from 'react-dom'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class App extends React.Component {
  componentDidMount() {
    fetch(config.TOP_TRACKS_URL)
      .then(res => res.json())
      .then(tracks => this.setState({ tracks }))
  }

  render() {
    return (
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
        <h1>Dwaler</h1>
        Welcome dwaler
        { JSON.stringify(this.state.tracks) }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
