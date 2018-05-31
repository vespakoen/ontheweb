import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import {
  Toolbar,
  Button,
} from 'react-native-material-ui';
import { createStackNavigator } from 'react-navigation'

export default class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          style={{
            container: {
              paddingTop: 20,
              height: 70
            }
          }}
          leftElement="menu"
          centerElement="Profile"
          onLeftElementPress={this.props.navigation.openDrawer}
        />
        <Text>Profile!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})