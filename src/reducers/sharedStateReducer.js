export default (state = {}, action) => {
 switch (action.type) {
  case 'FILTER_UI_ACTION':
   return {
    datapackage: {foo: 'bar'},
    loadedData: {hello: 'world'}
   } 
  case 'FETCH_DATA_BEGIN':
    return Object.assign({}, {loading: true})
  case 'FETCH_DATA_SUCCESS':
    return Object.assign({}, {loading: false, error: false, errorBody: '', data: action.payload})
  case 'FETCH_DATA_FAILURE':
    return Object.assign({}, {loading: false, error: true, errorBody: action.payload})
  default:
   return state
 }
}
