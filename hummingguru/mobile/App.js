import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native'
import {
  COLOR,
  ThemeProvider,
  Button,
  Drawer,
  Avatar
} from 'react-native-material-ui'
import SideMenu from './src/components/SideMenu'
import HummsScreen from './src/screens/HummsScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import {
  DrawerNavigator
} from 'react-navigation'

const uiTheme = {
  palette: {
    primaryColor: COLOR.yellow600,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
}

const RootView = DrawerNavigator({
  Humms: {
    screen: HummsScreen,
  },
  Profile: {
    screen: ProfileScreen
  }
}, {
  contentComponent: SideMenu
})

export default class App extends Component {
  render() {
    const menu = (
      <Drawer>
        <Drawer.Header>
          <Drawer.Header.Account
            avatar={<Avatar text="A" />}
            footer={{
              dense: true,
              centerElement: {
                primaryText: 'Reservio',
                secondaryText: 'business@email.com',
              },
              rightElement: 'arrow-drop-down',
            }}
          />
        </Drawer.Header>
        <Drawer.Section
          divider
          items={[
            { icon: 'bookmark-border', value: 'Humms' },
            { icon: 'person', value: 'Profile', active: true },
            { icon: 'people', value: 'Clients' },
          ]}
        />
        <Drawer.Section
          title="Personal"
          items={[
            { icon: 'info', value: 'Info' },
            { icon: 'settings', value: 'Settings' },
          ]}
        />
      </Drawer>
    )
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <RootView />
        </View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.grey700
  }
})
