import React, {
  Component,
  PropTypes
} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { actions } from '../redux/login'
import Page from '../components/Page'
import { profileStyle as styles } from '../style'

class Profile extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps
  }

  renderFacebookScreen() {
    const { firstName, id } = facebookProfile
    return (
      <View style={styles.container}>
        <Image style={styles.avatar} source={{ uri: `https://graph.facebook.com/${id}/picture?type=large&width=300&height=300` }} />
        <Text style={styles.name}>{firstName}</Text>
      </View>
    )
  }

  renderGuestScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>Guest</Text>
      </View>
    )
  }

  render() {
    const { navigation, user } = this.props
    const { facebookProfile, guestProfile } = user
    let Screen
    if (facebookProfile) {
      Screen = this.renderFacebookScreen()
    } else if (guestProfile) {
      Screen = this.renderGuestScreen()
    }
    return (
      <Page
        navigation={navigation}
        title="Profile"
      >
        { Screen }
      </Page>
    )
  }
}

// Profile.propTypes = {

// }

export default connect(
  state => state.login,
  actions
)(Profile)
