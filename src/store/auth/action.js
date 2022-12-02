import axios from 'axios'
import {API_TIMEOUT, URL_API} from '../../utils/constant'
import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
} from '../../utils/dispatch'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const loginUser = email => {
  return dispatch => {
    dispatchLoading(dispatch, LOGIN)

    axios
      .post(URL_API + '/checkin', {email: email}, {timeout: API_TIMEOUT})
      .then(response => {
        if (response.status == 200) {
          dispatchSuccess(dispatch, LOGIN, response.data.data)
        }
      })
      .catch(error => {
        dispatchError(dispatch, LOGIN, error.message)
      })
  }
}

export const logoutUser = () => {
  return dispatch => {
    dispatchSuccess(dispatch, LOGOUT, false)
  }
}
