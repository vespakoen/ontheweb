import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'

import { connect } from 'react-redux'
import { actions } from '../redux/login'
import { loginStyle as styles } from '../style'

class Login extends Component {
  renderFetchingProfile() {
    return (
      <View style={styles.intro}>
        <Text style={styles.introText}>
          Loading profile...
        </Text>
      </View>
    )
  }

  renderFetchingUser() {
    return (
      <View style={styles.intro}>
        <Text style={styles.introText}>
          Loading profile...
        </Text>
      </View>
    )
  }

  renderIsLoggingIn() {
    return (
      <View style={styles.intro}>
        <Text style={styles.introText}>
          Logging in...
        </Text>
      </View>
    )
  }

  renderError() {
    const login = this.props.login
    return (
      <View style={styles.intro}>
        <Text style={styles.introText}>
          Oops, something went wrong with connecting the guru's, please try again in a bit...
        </Text>
        <View style={styles.spacer} />
        <TouchableOpacity
          onPress={login}
          style={styles.login}
        >
          <Text style={styles.loginText}>
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderLoginButtons() {
    const { facebookLogin, guestLogin } = this.props
    return (
      <View style={styles.spacer}>
        <View style={styles.spacer} />
        <TouchableOpacity
          onPress={guestLogin}
          style={styles.guestLogin}
        >
          <Text style={styles.loginText}>
            Login as Guest
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={facebookLogin}
          style={styles.facebookLogin}
        >
          <Text style={styles.loginText}>
            Login with Facebook
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderContent() {
    const { isLoggedIn, isLoggingIn, isFetchingProfile, isFetchingUser, error } = this.props
    if (error) {
      return this.renderError()
    }
    if (isLoggedIn) {
      if (isFetchingProfile) {
        return this.renderFetchingProfile()
      } else if (isFetchingUser) {
        return this.renderFetchingUser()
      }
    } else if (isLoggingIn) {
      return this.renderIsLoggingIn()
    }
    return this.renderLoginButtons()
  }

  render() {
    return (
      <View style={styles.container}>
        { this.renderContent() }
      </View>
    )
  }
}

// Login.propTypes = {
//   login: PropTypes.func,
//   isLoggedIn: PropTypes.bool,
//   isLoggingIn: PropTypes.bool,
//   isFetchingUser: PropTypes.bool,
//   isFetchingProfile: PropTypes.bool
// }

export default connect(
  state => state.login,
  actions
)(Login)
