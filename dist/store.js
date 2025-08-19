"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;
var _redux = require("redux");
var _reduxThunk = require("redux-thunk");
var _rootReducer = _interopRequireDefault(require("./reducers/rootReducer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const initialState = {
  datastoreFilters: {
    // Datastore specific filters
  },
  datapackage: {},
  widgets: [],
  serializedState: {}
};
function configureStore(props) {
  const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
  return (0, _redux.createStore)(_rootReducer.default, Object.assign({}, initialState, props), composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk.thunk)));
}