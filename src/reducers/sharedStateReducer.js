export default (state = {}, action) => {
 switch (action.type) {
  case 'FILTER_UI_ACTION':
   return {
    loading: !state.loading,
    workingData: "DO ASYNC"
   } 
  default:
   return state
 }
}
