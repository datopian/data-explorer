import { combineReducers } from 'redux'
import { default as dataViewBuilder } from './dataViewBuilderReducer'
import { default as filterUI } from './filterUIReducer'

export default combineReducers({
 dataViewBuilder, filterUI
})
