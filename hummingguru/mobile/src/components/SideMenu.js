import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const styles = StyleSheet.create({
  navItem: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-around',
  },
  navItemActive: {
    backgroundColor: '#c0c0c0'
  },
  icon: {
    padding: 10,
    color: '#888',
  },
  iconActive: {
    color: '#000'
  },
  label: {
    padding: 10,
    color: '#888',
    marginTop: 4,
    fontSize: 18
  },
  labelActive: {
    color: '#000'
  }
})

const menuItems = {
  HelpOthers: {
    label: 'Help Others',
    icon: 'hearing'
  },
  Recorder: {
    label: 'Get Help',
    icon: 'mic'
  },
  Requests: {
    label: 'Humms',
    icon: 'record-voice-over'
  },
  Profile: {
    label: 'Profile',
    icon: 'face'
  }
}

export default props => {
  return (
    <ScrollView>
      <View style={{ height: 65 }} />
      <View>
        { Object.keys(menuItems).map(screenId => {
          const isActive = props.navigation.state.routes[props.navigation.state.index].key === screenId
          return (
            <TouchableOpacity
              key={screenId}
              style={[styles.navItem, isActive && styles.navItemActive]}
              onPress={() => props.navigation.navigate(screenId)}
            >
              <Icon
                size={24}
                style={[styles.icon, isActive && styles.iconActive]}
                name={menuItems[screenId].icon}
              />
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {menuItems[screenId].label}
              </Text>
            </TouchableOpacity>
          )
        }) }
      </View>
    </ScrollView>
  )
}