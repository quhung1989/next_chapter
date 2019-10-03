import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const initState = {
  showModal: false,
  username: '',
  userId: '',
  loggedOut: false,
  showDrawer: false,
  showLogIn: true,
  dropDown: false,
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER: {
      return updateObject(state, {
        username: action.username,
        userId: action.userId
      });
    }
    case actionTypes.TOGGLE_MODAL: {
      return updateObject(state, {showModal: !state.showModal})
    }
    case actionTypes.TOGGLE_DRAWER: {
      return updateObject(state, {showDrawer: !state.showDrawer})
    }
    case actionTypes.TOGGLE_SHOW_LOGIN: {
      return updateObject(state, {showLogIn: !state.showLogIn})
    }
    case actionTypes.TOGGLE_SHOW_DROPDOWN: {
      return updateObject(state, {dropDown: !state.dropDown})
    }
    case actionTypes.LOGGED_OUT: {
      return updateObject(state, {loggedOut: !state.loggedOut})
    }
    default:
      return state;
  }
}

export default reducer;