import React from 'react'
import WaveSurfer from 'wavesurfer.js'

class Waveform extends React.Component {
  componentDidMount() {
    this.wave = WaveSurfer.create({
      container: this.refs.WAVEFORM,
      waveColor: this.props.waveColor,
      progressColor: this.props.progressColor,
      height: this.props.height,
      normalize: true,
      cursorWidth: 0
    })
    this.wave.load(this.props.url);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.url !== nextProps.url) {
      this.wave.load(nextProps.url);
    }
  }

  render() {
    return (
      <div ref="waveform" style={{ position: 'relative' }}>
        <div ref="TOUCH" onClick={() => this.wave.playPause()} style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}></div>
        <div ref="WAVEFORM"></div>
      </div>
    )
  }
}

export default Waveform