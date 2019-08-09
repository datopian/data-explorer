export default (state = {}, action) => {
 switch (action.type) {
  case 'DATA_VIEW_BUILDER_ACTION':
   console.log('reducer', state)
   return {
    uiState: (state.uiState || 0)*1 + 1
   }
  default:
   return state
 }
}
