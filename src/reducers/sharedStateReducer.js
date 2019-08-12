export default (state = {}, action) => {
 switch (action.type) {
  case 'FILTER_UI_ACTION':
   return {
    datapackage: {foo: 'bar'},
    loadedData: {hello: 'world'}
   } 
  case 'FETCH_DATA_BEGIN':
    console.log('BEGIN')
    return Object.assign({}, state, {loading: true})
  case 'FETCH_DATA_SUCCESS':
    return Object.assign({}, state, {loading: false, error: false, errorBody: '', loadedData: action.payload})
  case 'FETCH_DATA_FAILURE':
    return Object.assign({}, state, {loading: false, error: true, errorBody: action.payload})
  default:
   return state
 }
}
