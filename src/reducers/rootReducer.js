import { combineReducers } from 'redux'
import { default as dataViewBuilder } from './dataViewBuilderReducer'
import { default as filterUI } from './filterUIReducer'
import { default as sharedState } from './sharedStateReducer'

export default combineReducers({
 dataViewBuilder, filterUI, sharedState
})
