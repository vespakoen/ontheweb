const initialState = {
  stack: ['helpOthers']
}

export function push(route) {
  return {
    type: 'ROUTE_PUSH',
    payload: route
  }
}

export function pop() {
  return {
    type: 'ROUTE_POP',
  }
}

export function replace(route) {
  return {
    type: 'ROUTE_REPLACE',
    payload: route
  }
}

export const actions = {
  push,
  pop,
  replace
}

const reducers = {
  ROUTE_PUSH: (state, action) => ({
    ...state,
    stack: [...state.stack, action.payload]
  }),
  ROUTE_POP: (state) => ({
    ...state,
    stack: [...state.stack.slice(0, state.stack.length - 1)]
  }),
  ROUTE_REPLACE: (state, action) => ({
    ...state,
    stack: [action.payload]
  })
}

export default (state = initialState, action) => {
  if (reducers[action.type]) {
    return reducers[action.type](state, action)
  }
  return state
}
