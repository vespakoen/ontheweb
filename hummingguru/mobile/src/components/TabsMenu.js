import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const styles = StyleSheet.create({
  tabBar: {
    height: 55,
    backgroundColor: '#ffe000',
    flexDirection: 'row'
  },
  navItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navItemActive: {
  },
  icon: {
    color: '#9499a1',
    marginBottom: 5
  },
  iconActive: {
    color: '#2b2e37'
  },
  label: {
    color: '#9499a1',
    fontSize: 12
  },
  labelActive: {
    color: '#2b2e37'
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
    <View style={styles.tabBar}>
      { Object.keys(menuItems).map(screenId => {
        const isActive = props.navigation.state.routes[props.navigation.state.index].key === screenId
        return (
          <TouchableOpacity
            key={screenId}
            style={[styles.navItem, isActive && styles.navItemActive]}
            onPress={() => props.navigation.navigate(screenId)}
          >
            <Icon
              size={22}
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
  )
}