import * as actionTypes from './actionTypes'
import setAuthToken from '../../utils/setAuthToken';
import jwtDecode from 'jwt-decode'
import axios from 'axios'

export const logIn = (user) => {
  return dispatch => {
    axios.post('/api/users/login', user)
    .then(res => {
      if (res.data.token) {
        const token = res.data.token
        localStorage.setItem('jwt', token)
        setAuthToken(token)
        const decoded = jwtDecode(token)
        dispatch(setUser(decoded))
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const setUser = (decoded) => {
  return {
    type: actionTypes.SET_USER,
    user: decoded,
  }
}

export const logOut = () => {
  return (dispatch) => {
    localStorage.removeItem('jwt');
    setAuthToken(false);
    dispatch(setUser({}));
  }
}