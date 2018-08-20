import React, {
  Component
} from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { actions } from '../redux/requests'
import Waveform from '../components/Waveform'
import Page from '../components/Page'
import { requestsStyle as styles } from '../style'

class Requests extends Component {
  componentDidMount() {
    this.props.getRequests()
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps
  }

  render() {
    const { navigation } = this.props
    return (
      <Page
        navigation={navigation}
        title="Humms"
      >
        <ScrollView style={styles.container}>
        { this.props.requests && this.props.requests.map(humm => {
          return (
            <View
              style={styles.humm}
              key={humm.id}
            >
              <Waveform
                recordingId={humm.recordingId}
                height={40}
                backgroundColor="#2b2e37"
                waveColor="#9499a1"
                progressColor="#fff"
              />
              <View style={styles.note}>
                <Text style={styles.noteText}>
                  {humm.note}
                </Text>
                { humm.comments.map(comment => {
                  return (
                    <View
                      style={styles.comment}
                      key={comment.id}
                    >
                      <Text style={styles.commentersName}>
                        {comment.user.guestProfile
                          ? comment.user.guestProfile.name || 'Guest'
                          : comment.user.facebookProfile.name }
                      </Text>
                      <Text style={styles.commentText}>
                        {comment.comment}
                      </Text>
                    </View>
                  )
                }) }
              </View>
            </View>
          )
        }) }
        </ScrollView>
      </Page>
    )
  }
}

// Requests.propTypes = {}

export default connect(
  state => state.requests,
  actions
)(Requests)
