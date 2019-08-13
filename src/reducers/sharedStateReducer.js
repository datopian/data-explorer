import datapackage from '../testData.json'

export default (state = {}, action) => {
 switch (action.type) {
  case 'FILTER_UI_ACTION':
   return {
    datapackage: {foo: 'bar'},
    loadedData: {hello: 'world'}
   } 
  case 'FETCH_DATA_BEGIN':
    console.log('FETCH_DATA_BEGIN')
    return Object.assign({}, state, {loading: true})
  case 'FETCH_DATA_SUCCESS':
    const _state = JSON.parse(JSON.stringify(state))
    const newState = Object.assign({}, _state, {loading: false, error: false, errorBody: '', datapackage, loadedData: action.payload})
    console.log('FETCH_DATA_SUCCESS')
    console.log('_state', _state)
    console.log('datapackage', datapackage)
    console.log('new state', newState)
    return newState
  case 'FETCH_DATA_FAILURE':
    return Object.assign({}, state, {loading: false, error: true, errorBody: action.payload})
  default:
   return state
 }
}
