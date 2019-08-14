import datapackage from '../testData.json'

//import datapackage from '../testData/actes-criminels.json'
//import loadDataset from '../utils/loadDataset'

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
    console.log('FETCH_DATA_SUCCESS')
    return Object.assign({}, state, {loading: false, error: false, datapackage})
  case 'FETCH_DATA_FAILURE':
    return Object.assign({}, state, {loading: false, error: true, errorBody: action.payload})
  default:
   return state
 }
}
