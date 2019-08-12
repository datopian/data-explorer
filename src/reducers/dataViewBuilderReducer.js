export default (state = {}, action) => {
 switch (action.type) {
  case 'DATA_VIEW_BUILDER_ACTION':
   console.log('reducer', state)
   return {
    test: (state.test || 0)*1 + 1
   }
  default:
   return state
 }
}
