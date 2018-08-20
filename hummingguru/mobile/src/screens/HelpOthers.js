import React, {
  Component
} from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Waveform from '../components/Waveform'
import RoundButton from '../components/RoundButton'
import { actions } from '../redux/helpOthers'
import Page from '../components/Page'
import { helpOthersStyle as styles } from '../style'

class HelpOthers extends Component {
  constructor(props) {
    super(props)
    this.inputFocused = this.inputFocused.bind(this)
    this.inputBlurred = this.inputBlurred.bind(this)
  }

  componentDidMount() {
    this.props.getCurrentHumm()
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps
  }

  inputFocused() {
    this.refs.SCROLLVIEW.scrollTo({
      x: 0,
      y: 130,
      animated: true
    })
  }

  inputBlurred() {
    this.refs.SCROLLVIEW.scrollTo({
      x: 0,
      y: 0,
      animated: true
    })
  }

  renderLoadingScreen() {
    return (
      <View style={styles.intro}>
        <Text style={styles.introText}>
          Loading a humm, hang in there...
        </Text>
      </View>
    )
  }

  renderNoMoreHummsScreen() {
    return (
      <View style={styles.intro}>
        <Text style={styles.introText}>
          You heard all the humms!
          Check back later...
        </Text>
      </View>
    )
  }

  renderCommentScreen() {
    return (
      <ScrollView
        ref="SCROLLVIEW"
        style={styles.container}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.intro}>
          <Text style={styles.introText}>
            Share your knowledge about the song
          </Text>
        </View>
        <TextInput
          style={styles.comment}
          onChangeText={this.props.setComment}
          onFocus={this.inputFocused}
          onBlur={this.inputBlurred}
          value={this.props.comment}
          ref="COMMENT"
          multiline
        />
        <View style={styles.controls}>
          <RoundButton
            buttonStyle={{ backgroundColor: '#4CAF50' }}
            onPress={this.props.sendComment}
          >
            <Text style={styles.submit}>
              SEND
            </Text>
          </RoundButton>
        </View>
      </ScrollView>
    )
  }
  
  renderHummScreen() {
    const { humm } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.humm}>
          <Waveform
            recordingId={humm.recordingId}
            height={150}
            backgroundColor="#2b2e37"
            waveColor="#9499a1"
            progressColor="#fff"
          />
          <View style={styles.note}>
            <Text style={styles.noteText}>{humm.note}</Text>
          </View>
        </View>
        <View style={styles.controls}>
          <RoundButton onPress={this.props.commentOnHumm}>
            <Icon name="check" size={50} color="#ffe000" />
            <Text style={{ color: '#ffe000' }}>I know!</Text>
          </RoundButton>
          <RoundButton onPress={this.props.getNextHumm}>
            <Icon name="close" size={50} color="#9499a1" />
            <Text style={{ color: '#9499a1' }}>No idea...</Text>
          </RoundButton>
        </View>
      </View>
    )
  }

  render() {
    const { humm, isLoading, isCommenting, navigation } = this.props
    let Screen
    if (isLoading) {
      Screen = this.renderLoadingScreen()
    } else if (!humm) {
      Screen = this.renderNoMoreHummsScreen()
    } else if (isCommenting) {
      Screen = this.renderCommentScreen()
    } else {
      Screen = this.renderHummScreen()
    }
    return (
      <Page
        navigation={navigation}
        title="Help Others"
      >
        { Screen }
      </Page>
    )
  }
}

// HelpOthers.propTypes = {
//   getNextHumm: PropTypes.func,
//   getCurrentHumm: PropTypes.func,
//   humm: PropTypes.object,
//   isLoading: PropTypes.bool
// }

export default connect(
  state => state.helpOthers,
  actions
)(HelpOthers)
