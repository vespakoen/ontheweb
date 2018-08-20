import * as api from '../api'

const initialState = {
  humm: null,
  isLoading: true,
  isCommenting: false,
  isSendingComment: false,
  sendCommentError: null
}

export function getNextHumm() {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({
      type: 'FETCH_NEXT_HUMM'
    })
    api.getNextHummForUser(state.login.user.id)
      .then(nextHumm => dispatch({
        type: 'FETCH_NEXT_HUMM_SUCCESS',
        payload: nextHumm
      }))
      .catch(err => dispatch({
        type: 'FETCH_NEXT_HUMM_ERROR',
        payload: err.message
      }))
  }
}

export function getCurrentHumm() {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({
      type: 'FETCH_CURRENT_HUMM'
    })
    api.getCurrentHummForUser(state.login.user.id)
      .then(currentHumm => dispatch({
        type: 'FETCH_CURRENT_HUMM_SUCCESS',
        payload: currentHumm
      }))
      .catch(err => dispatch({
        type: 'FETCH_CURRENT_HUMM_ERROR',
        payload: err.message
      }))
  }
}

export function commentOnHumm() {
  return {
    type: 'COMMENT_ON_HUMM'
  }
}

export function setComment(comment) {
  return {
    type: 'SET_COMMENT',
    payload: comment
  }
}

export function sendComment() {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({
      type: 'SEND_COMMENT'
    })
    api.createComment(state.helpOthers.humm.id, {
        userId: state.login.user.id,
        comment: state.helpOthers.comment
      })
      .then(() => dispatch({
        type: 'SEND_COMMENT_SUCCESS'
      }))
      .catch(err => dispatch({
        type: 'SEND_COMMENT_ERROR',
        payload: err.message
      }))
  }
}

export const actions = {
  getNextHumm,
  getCurrentHumm,
  commentOnHumm,
  setComment,
  sendComment
}

const reducers = {
  FETCH_CURRENT_HUMM: (state) => ({
    ...state,
    isLoading: true
  }),
  FETCH_NEXT_HUMM: (state) => ({
    ...state,
    isLoading: true
  }),
  FETCH_NEXT_HUMM_SUCCESS: (state, action) => ({
    ...state,
    humm: action.payload,
    isLoading: false
  }),
  FETCH_NEXT_HUMM_ERROR: (state, action) => ({
    ...state,
    humm: null,
    error: action.payload,
    isLoading: false
  }),
  FETCH_CURRENT_HUMM_SUCCESS: (state, action) => ({
    ...state,
    humm: action.payload,
    isLoading: false
  }),
  FETCH_CURRENT_HUMM_ERROR: (state, action) => ({
    ...state,
    humm: null,
    error: action.payload,
    isLoading: false
  }),
  COMMENT_ON_HUMM: (state, action) => ({
    ...state,
    isCommenting: true
  }),
  SET_COMMENT: (state, action) => ({
    ...state,
    comment: action.payload
  }),
  SEND_COMMENT: (state, action) => ({
    isSendingComment: true
  }),
  SEND_COMMENT_SUCCESS: (state, action) => ({
    isSendingComment: false,
    isCommenting: false,
    comment: '',
    sendCommentError: null
  }),
  SEND_COMMENT_ERROR: (state, action) => ({
    isSendingComment: false,
    sendCommentError: action.payload
  }),
}

export default (state = initialState, action) => {
  if (reducers[action.type]) {
    return reducers[action.type](state, action)
  }
  return state
}
