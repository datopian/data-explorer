export default (state = {}, action) => {
 switch (action.type) {
  case 'FILTER_UI_ACTION':
   console.log('reducer', state)
   return {
    test: (state.test || 0)*1 + 1,
   } 
  default:
   return state
 }
}
