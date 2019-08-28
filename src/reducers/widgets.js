import { deepClone } from '../utils'

export default (state = {}, action) => {
  switch (action.type) {
    case 'DATA_VIEW_CHART_BUILDER_ACTION':
      let stateForChartBuilder = deepClone(state)
      stateForChartBuilder = stateForChartBuilder.map(widget => {
        if (widget.datapackage.views[0].specType === 'simple') {
          widget.datapackage.views[0] = action.payload
        }
        return widget
      })
      return Object.assign(deepClone(state), stateForChartBuilder)
    case 'DATA_VIEW_MAP_BUILDER_ACTION':
      let stateForMapBuilder = deepClone(state)
      stateForMapBuilder = stateForMapBuilder.map(widget => {
        if (widget.datapackage.views[0].specType === 'tabularmap') {
          widget.datapackage.views[0] = action.payload
        }
        return widget
      })
      return Object.assign(deepClone(state), stateForMapBuilder)
    case 'SELECT_TAB':
      return action.payload.widgets
    case 'FETCH_DATA_BEGIN':
      return action.payload.widgets
    case 'FETCH_DATA_SUCCESS':
      return action.payload.widgets
    case 'FETCH_DATA_FAILURE':
      return action.payload.widgets
    default:
     return state
  }
}
