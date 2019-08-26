import loadDataset from '../utils/loadDataset'

export const filterUIAction = (payload) => async (dispatch, getState) => {
 dispatch({
  type: 'FILTER_UI_ACTION',
  payload
 })
 const datapackage = getState().sharedState.datapackage
 // For datastore resources, we need to remove loaded `data` attribute to
 // trigger re-fetch of a resource. This is required since we initially fetch
 // only subset of data from datastore, eg, first 100 rows. When user applies
 // filters, we need to hit datastore api and update the data.
 if (datapackage.resources[0].datastore_active) {
   delete datapackage.resources[0].data
 }
 dispatch(fetchDataBegin())
 const views = await loadDataset(datapackage)
 const newDatapackage = JSON.parse(JSON.stringify(datapackage))
 newDatapackage.views = views
 dispatch(fetchDataSuccess({datapackage: newDatapackage}))
}

export const dataViewBuilderAction = (payload) => dispatch => {
  let actionType
  if (payload.specType === 'simple') {
    actionType = 'DATA_VIEW_CHART_BUILDER_ACTION'
  } else if (payload.specType === 'tabularmap') {
    actionType = 'DATA_VIEW_MAP_BUILDER_ACTION'
  }
  dispatch({
    type: actionType,
    payload
  })
}

export const fetchDataAction = payload => async dispatch => {
  dispatch(fetchDataBegin())
  const views = await loadDataset(payload.datapackage)
  const newDatapackage = JSON.parse(JSON.stringify(payload.datapackage))
  newDatapackage.views = views
  dispatch(fetchDataSuccess({datapackage: newDatapackage}))
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
