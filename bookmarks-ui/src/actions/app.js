import update from 'react-addons-update'

const initialState = {
  initialized: false
  }

const INITIALIZE = 'app/INITIALIZE'

export function loadApp() {
  return (dispatch, getState) => {
      return dispatch(initializeApp())
    }
}

export function initializeApp() {
  return { type: INITIALIZE }
}

export default function reducer(state = initialState, action) {
  let { type, payload } = action

  switch (type) {
    case INITIALIZE:
      return update(state, { initialized: { $set: true } })

    default:
      return state
  }
}
