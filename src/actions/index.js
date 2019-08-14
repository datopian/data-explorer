import __datapackage from '../testData/testData.json'
import _datapackage from '../testData/actes-criminels.json'
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

export const fetchDataAction = payload => dispatch => {
  dispatch(fetchDataBegin())
  
  const datapackage = __datapackage

  setTimeout(() => {
      dispatch(fetchDataSuccess({datapackage}))
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
