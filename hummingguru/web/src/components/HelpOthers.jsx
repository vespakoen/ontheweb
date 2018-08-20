import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../redux/helpOthers'
import Waveform from './Waveform'
import Button from '@material-ui/core/Button';

class HelpOthers extends React.Component {
  componentDidMount() {
    this.props.getCurrentHumm()
  }

  render() {
    if (!this.props.helpOthers.humm) {
      return <div>Loading...</div>
    }
    const { humm } = this.props.helpOthers
    const { recordingId, note } = humm
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <h1 style={{ marginLeft: 20, marginTop: 20, fontFamily: 'Arial', color: '#fff' }}>Help Others!</h1>
        <div
          style={{
            margin: 20,
            backgroundColor: '#2b2e37',
            borderRadius: 5,
            padding: 10,
            boxShadow: '0px 4px 5px rgba(0, 0, 0, .1)'
          }}
        >
          <Waveform
            url={`http://localhost:8080/humm/${recordingId}.mp3`}
            waveColor="#9499a1"
            progressColor="#fff"
            height={180}
          />
        </div>
        <p>{ note }</p>
        <a href="#" onClick={this.props.commentOnHumm}>I know!</a><br />
        <a href="#" onClick={this.props.getNextHumm}>No idea...</a>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    )
  }
}

export default connect(
  state => state,
  actions
)(HelpOthers)