"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchDataAction = exports.dataViewBuilderAction = exports.filterUIAction = exports.selectTabAction = void 0;

var _loadDataset = _interopRequireDefault(require("../utils/loadDataset"));

var _datapackageRender = require("datapackage-render");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var selectTabAction = function selectTabAction(payload) {
  return function (dispatch, getState) {
    var widgets = JSON.parse(JSON.stringify(getState().widgets));
    widgets.forEach(function (widget, index) {
      widgets[index].active = false;

      if (widget.name === payload || payload.includes('-') && payload.split('-')[0] === widget.name) {
        widgets[index].active = true;
      }
    });
    dispatch(selectTab({
      widgets: widgets
    }));
  };
};

exports.selectTabAction = selectTabAction;

var filterUIAction = function filterUIAction(payload) {
  return function _callee(dispatch, getState) {
    var datapackage, newResource, updatedDatapackage, loadingWidgets, loadedDataset, widgets;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            datapackage = JSON.parse(JSON.stringify(getState().datapackage)); // For datastore resources, we need to remove loaded `data` attribute to
            // trigger re-fetch of a resource. This is required since we initially fetch
            // only subset of data from datastore, eg, first 100 rows. When user applies
            // filters, we need to hit datastore api and update the data.

            newResource = JSON.parse(JSON.stringify(payload));
            updatedDatapackage = Object.assign(datapackage, {
              resources: [newResource]
            });

            if (updatedDatapackage.resources[0].datastore_active) {
              delete updatedDatapackage.resources[0].data;
            } // Update state.datapackage with new resource path that includes filters (datastore query)


            dispatch(datapackageLoad({
              datapackage: updatedDatapackage
            })); // Set state of widgets as loading

            loadingWidgets = JSON.parse(JSON.stringify(getState().widgets)).map(function (widget) {
              widget.loading = true;
              return widget;
            });
            dispatch(fetchDataBegin({
              widgets: loadingWidgets
            })); // Load dataset using new path and update state

            datapackage = JSON.parse(JSON.stringify(getState().datapackage));
            _context.next = 10;
            return regeneratorRuntime.awrap((0, _loadDataset.default)(datapackage));

          case 10:
            loadedDataset = _context.sent;
            dispatch(datapackageLoad({
              datapackage: loadedDataset
            })); // Compile new data into widget views

            widgets = JSON.parse(JSON.stringify(getState().widgets)).map(function (widget) {
              widget.datapackage.views = widget.datapackage.views.map(function (view) {
                return (0, _datapackageRender.compileView)(view, loadedDataset);
              });
              widget.loading = false;
              return widget;
            });
            dispatch(fetchDataSuccess({
              widgets: widgets
            }));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

exports.filterUIAction = filterUIAction;

var dataViewBuilderAction = function dataViewBuilderAction(payload) {
  return function (dispatch) {
    var actionType;

    if (payload.specType === 'simple') {
      actionType = 'DATA_VIEW_CHART_BUILDER_ACTION';
    } else if (payload.specType === 'tabularmap') {
      actionType = 'DATA_VIEW_MAP_BUILDER_ACTION';
    }

    dispatch({
      type: actionType,
      payload: payload
    });
  };
};

exports.dataViewBuilderAction = dataViewBuilderAction;

var fetchDataAction = function fetchDataAction(payload) {
  return function _callee2(dispatch) {
    var loadingWidgets, datapackage, loadedDataset, widgets;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            loadingWidgets = JSON.parse(JSON.stringify(payload.widgets)).map(function (widget) {
              widget.loading = true;
              return widget;
            });
            dispatch(fetchDataBegin({
              widgets: loadingWidgets
            }));
            datapackage = JSON.parse(JSON.stringify(payload.datapackage));
            _context2.next = 5;
            return regeneratorRuntime.awrap((0, _loadDataset.default)(datapackage));

          case 5:
            loadedDataset = _context2.sent;
            dispatch(datapackageLoad({
              datapackage: loadedDataset
            }));
            widgets = JSON.parse(JSON.stringify(payload.widgets)).map(function (widget) {
              widget.datapackage.views = widget.datapackage.views.map(function (view) {
                return (0, _datapackageRender.compileView)(view, loadedDataset);
              });
              return widget;
            });
            dispatch(fetchDataSuccess({
              widgets: widgets
            }));

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.fetchDataAction = fetchDataAction;

var selectTab = function selectTab(res) {
  return {
    type: 'SELECT_TAB',
    payload: _objectSpread({}, res)
  };
};

var datapackageLoad = function datapackageLoad(res) {
  return {
    type: 'DATAPACKAGE_LOAD',
    payload: _objectSpread({}, res)
  };
};

var fetchDataBegin = function fetchDataBegin(res) {
  return {
    type: 'FETCH_DATA_BEGIN',
    payload: _objectSpread({}, res)
  };
};

var fetchDataSuccess = function fetchDataSuccess(res) {
  return {
    type: 'FETCH_DATA_SUCCESS',
    payload: _objectSpread({}, res)
  };
};

var fetchDataFailure = function fetchDataFailure(err) {
  return {
    type: 'FETCH_DATA_FAILURE',
    payload: {
      err: err
    }
  };
};