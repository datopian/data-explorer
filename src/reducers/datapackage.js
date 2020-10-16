export default (state = {}, action) => {
  switch (action.type) {
    case 'DATAPACKAGE_LOAD':
    case 'FETCH_ROW_COUNT_SUCCESS':
     return action.payload.datapackage
   default:
    return state
  }
 }
 