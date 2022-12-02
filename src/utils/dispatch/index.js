export const dispatchLoading = (dispatch, type) => {
  return dispatch({
    type: type,
    payload: {
      loading: true,
      data: false,
      error: false,
    },
  })
}

export const dispatchSuccess = (dispatch, type, result) => {
  return dispatch({
    type: type,
    payload: {
      loading: false,
      data: result,
      error: false,
    },
  })
}

export const dispatchError = (dispatch, type, error) => {
  return dispatch({
    type: type,
    payload: {
      loading: false,
      data: false,
      error: error,
    },
  })
}
