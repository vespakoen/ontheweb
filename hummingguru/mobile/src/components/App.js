import React from 'react'
import {
  StyleSheet,
  StatusBar,
  View,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
import {
  createDrawerNavigator,
  createBottomTabNavigator
} from 'react-navigation'
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import Notifications from 'react-native-notifications'
import SideMenu from './SideMenu'
import Login from '../screens/Login'
import Recorder from '../screens/Recorder'
import HelpOthers from '../screens/HelpOthers'
import Profile from '../screens/Profile'
import Requests from '../screens/Requests'
import { actions } from '../redux/navigation'
import TabsMenu from './TabsMenu'

const screens = {
  HelpOthers: {
    screen: HelpOthers
  },
  Recorder: {
    screen: Recorder
  },
  Requests: {
    screen: Requests
  },
  Profile: {
    screen: Profile
  }
}

const Screen = Platform.OS === 'ios'
  ? createBottomTabNavigator(screens, {
    tabBarComponent: TabsMenu
  })
  : createDrawerNavigator(screens, {
    contentComponent: SideMenu
  })

const uiTheme = {
  palette: {
    primaryColor: '#252830',
  },
  toolbar: {
    container: {
      height: 50,
    },
    leftElement: {
      color: '#fff'
    },
    titleText: {
      color: '#fff'
    }
  },
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252830'
  }
})

class App extends React.Component {
  constructor(props) {
    super(props)
		Notifications.addEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this))
		Notifications.addEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this))
		Notifications.requestPermissions()
	}
	
	onPushRegistered(deviceToken) {
	    // TODO: Send the token to my server so it could send back push notifications...
		console.log("Device Token Received", deviceToken)
	}

	onPushRegistrationFailed(error) {
		// For example:
		//
		// error={
		//   domain: 'NSCocoaErroDomain',
		//   code: 3010,
		//   localizedDescription: 'remote notifications are not supported in the simulator'
		// }
		// console.error(error)
	}
	
	componentWillUnmount() {
  	// prevent memory leaks!
  	Notifications.removeEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this))
		Notifications.removeEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this))
  }
  
  render() {
    const { isLoggedIn } = this.props
    if (!isLoggedIn) {
      return <Login />
    }
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <StatusBar
            barStyle="default"
          />
          <Screen />
        </View>
      </ThemeProvider>
    )
  }
}

export default connect(
  state => state.login,
  actions
)(App)
