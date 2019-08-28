import { combineReducers } from 'redux'
import { default as widgets } from './widgets'
import { default as datapackage } from './datapackage'
import { default as datastoreFilters } from './datastoreFilters'

export default combineReducers({
  widgets, datastoreFilters, datapackage
})
