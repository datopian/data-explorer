import { createStore, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'
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
  const composeEnhancers = 
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
 
  return createStore(
    rootReducer,
    Object.assign({}, initialState, props),
    composeEnhancers(applyMiddleware(thunk))
  )
}
