import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import {
  Toolbar,
  Button,
  Card
} from 'react-native-material-ui'

export default class HummsScreen extends Component {
  static navigationOptions = {
    title: 'Humms',
  }

  componentDidMount() {
    this.setState({
      humms: [
        {
          id: '1',
          genre: 'R&B',
          description: '',
          sound: ''
        },
        {
          id: '2',
          genre: 'Rock',
          description: '',
          sound: ''
        }
      ]
    })
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
          centerElement="Humms"
          onLeftElementPress={this.props.navigation.openDrawer}
        />
        <Card>
          <Text>Hello</Text>
        </Card>
        <Button
          text="Go to Profile"
          primary
          onPress={() => this.props.navigation.navigate('Profile')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})