import React from 'react'
import { AppRegistry } from 'react-native'
import App from './src/components/App'
import store from './src/store'
import { Provider } from 'react-redux'

const HummingGuru = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('HummingGuru', () => HummingGuru)
