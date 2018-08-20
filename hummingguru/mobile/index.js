import React from 'react'
import { AppRegistry, YellowBox } from 'react-native'
import App from './src/components/App'
import store from './src/store'
import { Provider } from 'react-redux'

const HummingGuru = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader",
  "Module AudioRecorderManager",
  "Remote debugger is in a background tab"
])

AppRegistry.registerComponent('HummingGuru', () => HummingGuru)
