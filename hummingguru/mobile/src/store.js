import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'remote-redux-devtools'
import rootReducer from './redux'
import RealtimeMiddleware from './redux/middlewares/realtimeMiddleware'

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      RealtimeMiddleware()
    )
  )
)
