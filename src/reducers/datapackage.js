export default (state = {}, action) => {
  switch (action.type) {
   case 'DATAPACKAGE_LOAD':
    return action.payload.datapackage
   default:
    return state
  }
 }
 