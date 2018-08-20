import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'
import { Provider } from 'react-redux'
import App from './components/App'

function getAppEl() {
  let appEl = document.getElementById('app')
  if (!appEl) {
    appEl = document.createElement('div')
    document.body.appendChild(appEl)
  }
  return appEl
}

function resetStyle() {
  let resetEl = document.getElementById('reset')
  if (!resetEl) {
    resetEl = document.createElement('style')
    resetEl.type = 'text/css'
    resetEl.innerHTML = `* { margin: 0; padding: 0; } html, body { width: 100%; height: 100%; }`
    document.body.appendChild(resetEl)
  }
}

resetStyle()

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), getAppEl())