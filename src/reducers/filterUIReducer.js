export default (state = {}, action) => {
 switch (action.type) {
  case 'FILTER_UI_ACTION':
   console.log('reducer', state)
   return {
    uiState: (state.uiState || 0)*1 + 1,
    // workingData: <--- we need to some async redux magic to fire actions on start, success, fail
   } 
  default:
   return state
 }
}
