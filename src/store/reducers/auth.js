import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initState = {
  isAuthenticated: false,
  user: {},
  isAdmin: false,
  username: undefined,
}

const reducer = (state = initState, action) => {
  switch(action.type) {
    case actionTypes.SET_USER: {
      return updateObject(state, {
        isAuthenticated: true,
        user: action.user.decoded,
        isAdmin: action.user.isAdmin,
        username: action.user.username,
      })
    }
    default:
      return state
  }
}

export default reducer