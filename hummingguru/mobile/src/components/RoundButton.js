import React, { PropTypes } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4
  },
  shadowOpacity: 0.1,
  shadowRadius: 5
}

const styles = StyleSheet.create({
  roundButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2b2e37',
    ...shadow
  }
})

const RoundButton = ({ onPress, style, children }) => (
  <TouchableOpacity onPress={onPress} >
    <View style={[styles.roundButton, style || {}]} >
      { children }
    </View>
  </TouchableOpacity>
)

// RoundButton.propTypes = {
//   onPress: PropTypes.func,
//   buttonStyle: PropTypes.object, // eslint-disable-line
//   children: PropTypes.element
// }

export default RoundButton
