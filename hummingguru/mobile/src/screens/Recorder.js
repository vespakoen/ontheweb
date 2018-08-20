import React, { Component, PropTypes } from 'react'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Waveform from '../components/Waveform'
import RoundButton from '../components/RoundButton'
import { actions } from '../redux/recorder'
import Page from '../components/Page'
import { recorderStyle as styles } from '../style'

class Recorder extends Component {
  constructor(props) {
    super(props)
    this.toggleRecord = this.toggleRecord.bind(this)
    this.inputFocused = this.inputFocused.bind(this)
    this.inputBlurred = this.inputBlurred.bind(this)
  }

  componentDidMount() {
    this.props.listenToProgress()
    this.props.listenToFinish()
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps
  }

  toggleRecord() {
    if (this.props.isRecording) {
      this.props.stopRecording()
      clearTimeout(this.autoStopper)
    } else {
      this.props.startRecording()
      this.autoStopper = setTimeout(this.props.stopRecording, 20000)
    }
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

  renderRoundButton({ children, onPress, buttonStyle }) {
    return (
      <TouchableOpacity onPress={onPress} >
        <View style={[styles.roundButton, buttonStyle || {}]} >
          { children }
        </View>
      </TouchableOpacity>
    )
  }

  renderRecordScreen() {
    const progressSeconds = Math.round(this.props.progress)
    const recordButtonContent = this.props.isRecording ? (
      <Text style={styles.counter}>
        {20 - progressSeconds}
      </Text>
    ) : (
      <Icon
        name="mic"
        size={50}
        color="#ffe000"
      />
    )
    return (
      <View style={styles.container}>
        { this.props.isRecording ? (
          <View style={styles.intro}>
            <Text style={styles.introText}>
              {'Hummmmmmmm...\n\nTap the button at any time to stop recording'}
            </Text>
          </View>
        ) : (
          <View style={styles.intro}>
            <Text style={styles.introText}>
              Tap the button below and start humming...
            </Text>
          </View>
        ) }
        <View style={styles.controls}>
          <RoundButton
            style={this.props.isRecording ? {
              backgroundColor: '#F44336'
            } : {}}
            onPress={this.toggleRecord}
          >
            {recordButtonContent}
          </RoundButton>
        </View>
      </View>
    )
  }

  renderUploadScreen() {
    return (
      <View style={styles.container}>
        <View style={styles.intro}>
          <Text style={styles.introText}>
            Processing audio, hang in there...
          </Text>
        </View>
      </View>
    )
  }

  renderPreviewScreen() {
    return (
      <View style={styles.container}>
        <View style={styles.humm}>
          <Waveform
            recordingId={this.props.recordingId}
            height={150}
            backgroundColor="#2b2e37"
            waveColor="#9499a1"
            progressColor="#fff"
          />
        </View>
        <View style={styles.intro}>
          <Text style={styles.introText}>
            Tap the waves above, does it sound good?
          </Text>
        </View>
        <View style={styles.controls}>
          <RoundButton
            onPress={this.props.acceptRecording}
          >
            <Icon
              name="check"
              size={50}
              color="#ffe000"
            />
          </RoundButton>
          <RoundButton
            onPress={this.props.declineRecording}
          >
            <Icon
              name="close"
              size={50}
              color="#9499a1"
            />
          </RoundButton>
        </View>
      </View>
    )
  }

  renderAddNoteScreen() {
    return (
      <ScrollView
        ref="SCROLLVIEW"
        style={styles.container}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.intro}>
          <Text style={styles.introText}>
            Add a helpfull note, or send some love to the other gurus...
          </Text>
        </View>
        <TextInput
          style={styles.note}
          onChangeText={this.props.setNote}
          onFocus={this.inputFocused}
          onBlur={this.inputBlurred}
          value={this.props.note}
          ref="NOTE"
          multiline
        />
        <View style={styles.controls}>
          <RoundButton
            onPress={this.props.createHumm}
          >
            <Text style={styles.submit}>
              SUBMIT
            </Text>
          </RoundButton>
        </View>
      </ScrollView>
    )
  }

  render() {
    const { recordingId, isUploading, isRecordingAccepted, navigation } = this.props
    let Screen
    if (isRecordingAccepted) {
      Screen = this.renderAddNoteScreen()
    } else if (isUploading) {
      Screen = this.renderUploadScreen()
    } else if (recordingId) {
      Screen = this.renderPreviewScreen()
    } else {
      Screen = this.renderRecordScreen()
    }
    return (
      <Page
        navigation={navigation}
        title="Get Help"
      >
        { Screen }
      </Page>
    )
  }
}

// Recorder.propTypes = {
//   isUploading: PropTypes.bool,
//   isRecording: PropTypes.bool,
//   recordingId: PropTypes.string,
//   progress: PropTypes.number,
//   startRecording: PropTypes.func,
//   stopRecording: PropTypes.func,
//   listenToProgress: PropTypes.func,
//   listenToFinish: PropTypes.func,
//   acceptRecording: PropTypes.func,
//   declineRecording: PropTypes.func,
//   isRecordingAccepted: PropTypes.bool,
//   setNote: PropTypes.func,
//   note: PropTypes.string,
//   createHumm: PropTypes.func
// }

export default connect(
  state => state.recorder,
  actions
)(Recorder)
