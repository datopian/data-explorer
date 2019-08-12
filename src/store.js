import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const initialState = {
  dataViewBuilder: {
    uiState: 100
  },
  filterUI: {
    uiState: 1000
  },
  sharedState: {
    loading: false
  }
}

export default function configureStore() {
 
 return createStore(
   rootReducer,
   initialState,
   applyMiddleware(thunk)
 )
}
