import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

const initialState = {
  dataViewBuilder: {
    // chartBuilder state
  },
  filterUI: {
    // UIState
  },
  sharedState: {
    loading: false,
    datapackage: {},
    loadedData: {} // not implemented
  }
}

export default function configureStore(props) {
 
 return createStore(
   rootReducer,
   Object.assign({}, initialState, props),
   composeWithDevTools(applyMiddleware(thunk))
 )
}
