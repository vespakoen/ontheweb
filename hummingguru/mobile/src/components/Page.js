import React from 'react'
import {
  View,
  Platform
} from 'react-native'
import {
  Toolbar
} from 'react-native-material-ui'
import TabsMenu from './TabsMenu'

export default (props) => Platform.OS === 'ios'
  ? (
    <View style={{ flex: 1 }}>
      <Toolbar
        style={{
          container: {
            paddingTop: 20,
            height: 70
          }
        }}
        centerElement={props.title}
      />
      { props.children }
    </View>
  )
  : (
    <View style={{ flex: 1 }}>
      <Toolbar
        style={{
          container: {
            paddingTop: 20,
            height: 70
          }
        }}
        leftElement="menu"
        centerElement={props.title}
        onLeftElementPress={props.navigation.openDrawer}
      />
      { props.children }
    </View>
  )
