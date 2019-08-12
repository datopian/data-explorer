import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const initialState = {
  dataViewBuilder: {
    test: 100
  },
  filterUI: {
    test: 1000
  },
  sharedState: {
    loading: false,
    datapackage: {},
    loadedData: {}
  }
}

export default function configureStore() {
 
 return createStore(
   rootReducer,
   initialState,
   applyMiddleware(thunk)
 )
}
