import { deepClone } from '../utils'

export default (state = {}, action) => {
  switch (action.type) {
    case 'DATA_VIEW_BUILDER_ACTION':
        const datapackage = deepClone(state.datapackage)

        if (datapackage.views.length === 1) {
          datapackage.views.unshift(action.payload)
        }

        if (datapackage.views.length > 1) {
          datapackage.views[0] = action.payload
        }

        const newState = Object.assign(deepClone(state), {datapackage})
        return newState

    case 'FILTER_UI_ACTION':
     return {
      datapackage: {foo: 'bar'},
      loadedData: {hello: 'world'}
     }
    case 'FETCH_DATA_BEGIN':
      return Object.assign({}, state, {loading: true})
    case 'FETCH_DATA_SUCCESS':
      return Object.assign({}, state, {loading: false, error: false, datapackage: action.payload.datapackage})
    case 'FETCH_DATA_FAILURE':
      return Object.assign({}, state, {loading: false, error: true, errorBody: action.payload})
    default:
     return state
  }
}
