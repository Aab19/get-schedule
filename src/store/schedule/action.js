import APICALL from '../../api'
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
  return async dispatch => {
    dispatchLoading(dispatch, GET_ALL_SCHEDULE)

    try {
      const response = await APICALL(`/schedule?email=${email}`, {
        method: 'GET',
      })
      if (response.status == 200) {
        dispatchSuccess(dispatch, GET_ALL_SCHEDULE, response.data.data)
      }
    } catch (error) {
      dispatchError(dispatch, GET_ALL_SCHEDULE, error.message)
    }
  }
}

export const addNewSchedule = (email, form, detail = false) => {
  return async dispatch => {
    dispatchLoading(dispatch, ADD_SCHEDULE)

    try {
      const response = await APICALL(`/schedule?email=${email}`, {
        method: 'POST',
        data: form,
      })
      if (response.status == 201) {
        let result = {
          data: response.data.data,
          detail: detail,
        }
        dispatchSuccess(dispatch, ADD_SCHEDULE, result)
      }
    } catch (error) {
      dispatchError(dispatch, ADD_SCHEDULE, error.message)
    }
  }
}

export const getDetailSchedule = form => {
  return async dispatch => {
    dispatchLoading(dispatch, GET_DETAIL_SCHEDULE)

    try {
      const response = await APICALL(
        `/schedule?email=${form.email}&day=${form.day}`,
        {
          method: 'GET',
        },
      )
      if (response.status == 200) {
        dispatchSuccess(dispatch, GET_DETAIL_SCHEDULE, response.data.data)
      }
    } catch (error) {
      dispatchError(dispatch, GET_DETAIL_SCHEDULE, error.message)
    }
  }
}

export const editSchedule = form => {
  return async dispatch => {
    dispatchLoading(dispatch, EDIT_SCHEDULE)

    try {
      const response = await APICALL(
        `/schedule?email=${form.email}&id=${form.id}`,
        {
          method: 'PATCH',
          data: form,
        },
      )
      if (response.status == 201) {
        dispatchSuccess(dispatch, EDIT_SCHEDULE, response.data.data)
      }
    } catch (error) {
      dispatchError(dispatch, EDIT_SCHEDULE, error.message)
    }
  }
}

export const deleteSchedule = (email, id, day) => {
  return async dispatch => {
    dispatchLoading(dispatch, DELETE_SCHEDULE)

    try {
      const response = await APICALL(`/schedule?email=${email}&id=${id}`, {
        method: 'DELETE',
      })
      if (response.status == 200) {
        let result = {
          id: id,
          day: day,
        }
        dispatchSuccess(dispatch, DELETE_SCHEDULE, result)
      }
    } catch (error) {
      dispatchError(dispatch, DELETE_SCHEDULE, error.message)
    }
  }
}
