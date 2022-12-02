import {LOGIN, LOGOUT} from './action'

const initialState = {
  loadingLogin: false,
  dataLogin: false,
  errorLogin: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loadingLogin: action.payload.loading,
        dataLogin: action.payload.data,
        errorLogin: action.payload.error,
      }
    case LOGOUT:
      return {
        loading: false,
        data: action.payload.data,
        error: false,
      }
    default:
      return state
  }
}

export default authReducer
