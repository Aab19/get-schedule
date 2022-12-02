import axios from 'axios'
import {API_TIMEOUT, URL_API} from '../../utils/constant'
import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
} from '../../utils/dispatch'

export const GET_ALL_SCHEDULE = 'GET_ALL_SCHEDULE'
export const GET_DETAIL_SCHEDULE = 'GET_DETAIL_SCHEDULE'
export const ADD_SCHEDULE = 'ADD_SCHEDULE'
export const EDIT_SCHEDULE = 'EDIT_SCHEDULE'
export const DELETE_SCHEDULE = 'DELETE_SCHEDULE'

export const getAllSchedule = email => {
  return dispatch => {
    dispatchLoading(dispatch, GET_ALL_SCHEDULE)

    axios
      .get(URL_API + `/schedule?email=${email}`, {timeout: API_TIMEOUT})
      .then(response => {
        if (response.status == 200) {
          dispatchSuccess(dispatch, GET_ALL_SCHEDULE, response.data.data)
        }
      })
      .catch(error => {
        dispatchError(dispatch, GET_ALL_SCHEDULE, error.message)
      })
  }
}

export const addNewSchedule = (email, form, detail = false) => {
  return dispatch => {
    dispatchLoading(dispatch, ADD_SCHEDULE)

    axios
      .post(URL_API + `/schedule?email=${email}`, form, {
        timeout: API_TIMEOUT,
      })
      .then(response => {
        if (response.status == 201) {
          let result = {
            data: response.data.data,
            detail: detail,
          }
          dispatchSuccess(dispatch, ADD_SCHEDULE, result)
        }
      })
      .catch(error => {
        dispatchError(dispatch, ADD_SCHEDULE, error.message)
      })
  }
}

export const getDetailSchedule = form => {
  return dispatch => {
    dispatchLoading(dispatch, GET_DETAIL_SCHEDULE)

    axios
      .get(URL_API + `/schedule?email=${form.email}&day=${form.day}`, {
        timeout: API_TIMEOUT,
      })
      .then(response => {
        if (response.status == 200) {
          dispatchSuccess(dispatch, GET_DETAIL_SCHEDULE, response.data.data)
        }
      })
      .catch(error => {
        dispatchError(dispatch, GET_DETAIL_SCHEDULE, error.message)
      })
  }
}

export const editSchedule = form => {
  return dispatch => {
    dispatchLoading(dispatch, EDIT_SCHEDULE)

    axios
      .patch(URL_API + `/schedule?email=${form.email}&id=${form.id}`, form, {
        timeout: API_TIMEOUT,
      })
      .then(response => {
        if (response.status == 201) {
          dispatchSuccess(dispatch, EDIT_SCHEDULE, response.data.data)
        }
      })
      .catch(error => {
        dispatchError(dispatch, EDIT_SCHEDULE, error.message)
      })
  }
}

export const deleteSchedule = (email, id, day) => {
  return dispatch => {
    dispatchLoading(dispatch, DELETE_SCHEDULE)

    axios
      .delete(URL_API + `/schedule?email=${email}&id=${id}`, {
        timeout: API_TIMEOUT,
      })
      .then(response => {
        if (response.status == 200) {
          let result = {
            id: id,
            day: day,
          }
          dispatchSuccess(dispatch, DELETE_SCHEDULE, result)
        }
      })
      .catch(error => {
        dispatchError(dispatch, DELETE_SCHEDULE, error.message)
      })
  }
}
