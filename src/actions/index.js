export const filterUIAction = (payload) => dispatch => {
 dispatch({
  type: 'FILTER_UI_ACTION'
 })
}

export const dataViewBuilderAction = (payload) => dispatch => {
 dispatch({
  type: 'DATA_VIEW_BUILDER_ACTION'
 })
}

export const fetchDataAction = payload => dispatch => {
  dispatch(fetchDataBegin())

  setTimeout(() => {
    // fail randomly
    if (Date.now()%2 === 0) {
      dispatch(fetchDataSuccess({data: {lat: 1.1241242, lon: -1.254121}}))
    } else {
      dispatch(fetchDataFailure({msg: "Something is wrong", statusCode: 500}))
    }
  }, 800)
}

const fetchDataBegin = () => ({
  type: 'FETCH_DATA_BEGIN'
})

const fetchDataSuccess = res => ({
  type: 'FETCH_DATA_SUCCESS',
  payload: { ...res }
})

const fetchDataFailure = err => ({
  type: 'FETCH_DATA_FAILURE',
  payload: { err }
})
