import config from '../../../config'
import Notifications from 'react-native-notifications'

export default function RealtimeMiddleware() {
  let ws
  return (store) => (next) => (action) => {
    next(action)
    switch (action.type) {
      case 'LOGIN_SUCCESS': {
        const state = store.getState()
        ws = new WebSocket(`ws://${config.WS_URL}/?userId=${state.login.user.id}`);
        ws.onmessage = (message) => {
          const action = JSON.parse(message.data)
          store.dispatch(action)
        }
        return
      }
      case 'NOTIFICATION': {
        Notifications.localNotification({
          alertBody: action.payload.comment.comment,
          alertTitle: "A guru commented on your humm!",
          soundName: "chime.aiff",
          silent: false,
          // category: "SOME_CATEGORY",
          userInfo: {}
        })
        return
      }
    }
  }
}