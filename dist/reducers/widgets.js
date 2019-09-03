"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../utils");

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'DATA_VIEW_CHART_BUILDER_ACTION':
      var stateForChartBuilder = (0, _utils.deepClone)(state);
      stateForChartBuilder = stateForChartBuilder.map(function (widget) {
        if (widget.datapackage.views[0].specType === 'simple') {
          widget.datapackage.views[0] = action.payload;
        }

        return widget;
      });
      return Object.assign((0, _utils.deepClone)(state), stateForChartBuilder);

    case 'DATA_VIEW_MAP_BUILDER_ACTION':
      var stateForMapBuilder = (0, _utils.deepClone)(state);
      stateForMapBuilder = stateForMapBuilder.map(function (widget) {
        if (widget.datapackage.views[0].specType === 'tabularmap') {
          widget.datapackage.views[0] = action.payload;
        }

        return widget;
      });
      return Object.assign((0, _utils.deepClone)(state), stateForMapBuilder);

    case 'SELECT_TAB':
      return action.payload.widgets;

    case 'FETCH_DATA_BEGIN':
      return action.payload.widgets;

    case 'FETCH_DATA_SUCCESS':
      return action.payload.widgets;

    case 'FETCH_DATA_FAILURE':
      return action.payload.widgets;

    default:
      return state;
  }
};

exports.default = _default;