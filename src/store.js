import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

const initialState = {
  datastoreFilters: {
    // Datastore specific filters
  },
  datapackage: {},
  widgets: [],
  serializedState: {}
}

export default function configureStore(props) {
 
 return createStore(
   rootReducer,
   Object.assign({}, initialState, props),
   composeWithDevTools(applyMiddleware(thunk))
 )
}
