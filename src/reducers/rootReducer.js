import { default as widgets } from './widgets'
import { default as datapackage } from './datapackage'
import { default as datastoreFilters } from './datastoreFilters'
import { default as serializedState } from './serializedState'

export default (state = {}, action) => {
  return {
    widgets: widgets(state.widgets, action),
    datapackage: datapackage(state.datapackage, action),
    datastoreFilters: datastoreFilters(state.datastoreFilters, action),
    serializedState: serializedState(state.serializedState, action, state) // we pass root of tree so it can export entire app state
  }
}
