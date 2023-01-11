import {
  ADD_SCHEDULE,
  DELETE_SCHEDULE,
  EDIT_SCHEDULE,
  GET_ALL_SCHEDULE,
  GET_DETAIL_SCHEDULE,
} from './action'

const initialState = {
  loadingSchedule: false,
  scheduleCounter: false,
  dataSchedule: false,
  errorSchedule: false,
  successAddSchedule: false,
  successEditSchedule: false,
  successDeleteSchedule: false,
}

const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SCHEDULE:
      return {
        ...state,
        loadingSchedule: action.payload.loading,
        scheduleCounter: action.payload.data,
        dataSchedule: false,
        successAddSchedule: false,
        successEditSchedule: false,
        errorSchedule: action.payload.error,
      }
    case GET_DETAIL_SCHEDULE:
      let updatedAt = []
      let sorting = []
      let results = []
      if (action.payload && action.payload.data) {
        action.payload.data.map(val => {
          updatedAt.push(val.updatedAt)
        })
        sorting = updatedAt.reverse()
        sorting.map((value, index) => {
          action.payload.data.map((val, idx) => {
            if (value == val.updatedAt) {
              updatedAt.push(val.updatedAt)
              results.push(action.payload.data[idx])
            }
          })
        })
      }
      return {
        ...state,
        loadingSchedule: action.payload.loading,
        dataSchedule: results,
        errorSchedule: action.payload.error,
        successAddSchedule: false,
        successEditSchedule: false,
        successDeleteSchedule: false,
      }
    case ADD_SCHEDULE:
      if (action.payload && action.payload.data.data) {
        state['successAddSchedule'] = true
        switch (action.payload.data.data.day) {
          case 'monday':
            state['scheduleCounter'].monday =
              state['scheduleCounter'].monday + 1
            if (action.payload.data.detail) {
              state['dataSchedule'].unshift(action.payload.data.data)
            }
            break
          case 'tuesday':
            state['scheduleCounter'].tuesday =
              state['scheduleCounter'].tuesday + 1
            if (action.payload.data.detail) {
              state['dataSchedule'].unshift(action.payload.data.data)
            }
            break
          case 'wednesday':
            state['scheduleCounter'].wednesday =
              state['scheduleCounter'].wednesday + 1
            if (action.payload.data.detail) {
              state['dataSchedule'].unshift(action.payload.data.data)
            }
            break
          case 'thursday':
            state['scheduleCounter'].thursday =
              state['scheduleCounter'].thursday + 1
            if (action.payload.data.detail) {
              state['dataSchedule'].unshift(action.payload.data.data)
            }
            break
          case 'friday':
            state['scheduleCounter'].friday =
              state['scheduleCounter'].friday + 1
            if (action.payload.data.detail) {
              state['dataSchedule'].unshift(action.payload.data.data)
            }
            break
        }
      } else {
        state['successAddSchedule'] = false
      }
      return {
        ...state,
        loadingSchedule: action.payload.loading,
        errorSchedule: action.payload.error,
      }
    case EDIT_SCHEDULE:
      if (action.payload && action.payload.data) {
        state['successEditSchedule'] = true
        state['dataSchedule'].map((val, index) => {
          if (val.id == action.payload.data.id) {
            state['dataSchedule'][index].title = action.payload.data.title
            state['dataSchedule'][index].updatedAt =
              action.payload.data.updatedAt
          }
        })
      } else {
        state['successEditSchedule'] = false
      }
      return {
        ...state,
        loading: action.payload.loading,
        errorSchedule: action.payload.error,
      }
    case DELETE_SCHEDULE:
      let result
      if (action.payload && action.payload.data) {
        state['successDeleteSchedule'] = true
        result = state['dataSchedule'].filter(val => {
          return val.id !== action.payload.data.id
        })
        switch (action.payload.data.day) {
          case 'monday':
            state['scheduleCounter'].monday =
              state['scheduleCounter'].monday - 1
            break
          case 'tuesday':
            state['scheduleCounter'].tuesday =
              state['scheduleCounter'].tuesday - 1
            break
          case 'wednesday':
            state['scheduleCounter'].wednesday =
              state['scheduleCounter'].wednesday - 1
            break
          case 'thursday':
            state['scheduleCounter'].thursday =
              state['scheduleCounter'].thursday - 1
            break
          case 'friday':
            state['scheduleCounter'].friday =
              state['scheduleCounter'].friday - 1
            break
        }
        state['dataSchedule'] = result
      } else {
        state['successDeleteSchedule'] = false
      }
      return {
        ...state,
        loading: action.payload.loading,
        errorSchedule: action.payload.error,
      }
    default:
      return state
  }
}

export default scheduleReducer
