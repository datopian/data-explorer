import loadDataset from '../utils/loadDataset'

export const filterUIAction = payload => dispatch => {
 dispatch({
  type: 'FILTER_UI_ACTION'
 })
}

export const dataViewBuilderAction = (payload) => dispatch => {
 dispatch({
  type: 'DATA_VIEW_BUILDER_ACTION',
  payload
 })
}

export const fetchDataAction = payload => async dispatch => {
  dispatch(fetchDataBegin())
  const views = await loadDataset(payload.datapackage)
  dispatch(fetchDataSuccess({datapackage: {views}}))
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
