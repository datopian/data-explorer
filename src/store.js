import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const initialState = {
  filterUIStore: {
    uiState: 1
  },
  dataViewStore: {
    dataViewState: 1
  },
  dataViewBuilderStore: {
    uiState: 1
  }
}

export default function configureStore(initialState) {
 return createStore(
   rootReducer,
   initialState,
   applyMiddleware(thunk)
 )
}
