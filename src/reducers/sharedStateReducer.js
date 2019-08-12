export default (state = {}, action) => {
 switch (action.type) {
  case 'FILTER_UI_ACTION':
   return {
    loading: !state.loading,
    datapackage: {foo: 'bar'},
    loadedData: {hello: 'world'}
   } 
  default:
   return state
 }
}
