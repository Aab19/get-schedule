import APICALL from '../../api'
import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
} from '../../utils/dispatch'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const loginUser = email => {
  return async dispatch => {
    dispatchLoading(dispatch, LOGIN)

    try {
      const response = await APICALL('/checkin', {
        method: 'POST',
        data: {
          email: email,
        },
      })
      if (response.status == 200) {
        dispatchSuccess(dispatch, LOGIN, response.data.data)
      }
    } catch (error) {
      dispatchError(dispatch, LOGIN, error.message)
    }
  }
}

export const logoutUser = () => {
  return dispatch => {
    dispatchSuccess(dispatch, LOGOUT, false)
  }
}
