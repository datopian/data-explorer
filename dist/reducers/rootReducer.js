"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _widgets = _interopRequireDefault(require("./widgets"));

var _datapackage = _interopRequireDefault(require("./datapackage"));

var _datastoreFilters = _interopRequireDefault(require("./datastoreFilters"));

var _serializedState = _interopRequireDefault(require("./serializedState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return {
    widgets: (0, _widgets.default)(state.widgets, action),
    datapackage: (0, _datapackage.default)(state.datapackage, action),
    datastoreFilters: (0, _datastoreFilters.default)(state.datastoreFilters, action),
    serializedState: (0, _serializedState.default)(state.serializedState, action, state) // we pass root of tree so it can export entire app state

  };
};

exports.default = _default;