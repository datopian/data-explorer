"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.App = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

require("./App.css");

var _datastoreQueryBuilder = require("datastore-query-builder");

var _DataView = _interopRequireDefault(require("./components/DataView"));

var _chartBuilder = require("chart-builder");

var _mapBuilder = require("map-builder");

var _reactTabsRedux = require("react-tabs-redux");

var _actions = require("./actions/");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var App = function App(props) {
  (0, _react.useEffect)(function () {
    var payload = {
      datapackage: props.datapackage,
      widgets: props.widgets
    };
    props.fetchDataAction(payload);
  }, []);
  var activeWidget = props.widgets.find(function (widget) {
    return widget.active;
  });
  var selectedTab = activeWidget ? activeWidget.name : props.widgets[0].name;
  var tabLinks = props.widgets.map(function (widget) {
    return _react.default.createElement(_reactTabsRedux.TabLink, {
      to: widget.name,
      className: "mr-4"
    }, widget.name);
  });
  var tabContents = props.widgets.map(function (widget) {
    return _react.default.createElement(_reactTabsRedux.TabContent, {
      for: widget.name
    }, _react.default.createElement("div", {
      className: "container flex py-6"
    }, _react.default.createElement("div", {
      className: "w-3/4 py-3 mr-4"
    }, _react.default.createElement(_DataView.default, widget)), _react.default.createElement("div", {
      className: "w-1/4"
    }, _react.default.createElement("div", {
      className: "w-full"
    }, _react.default.createElement("div", {
      className: "p-4 mr-4"
    }, widget.datapackage.views[0].specType === 'simple' ? _react.default.createElement(_chartBuilder.ChartBuilder, {
      view: widget.datapackage.views[0],
      dataViewBuilderAction: props.dataViewBuilderAction
    }) : '', widget.datapackage.views[0].specType === 'tabularmap' ? _react.default.createElement(_mapBuilder.MapBuilder, {
      view: widget.datapackage.views[0],
      dataViewBuilderAction: props.dataViewBuilderAction
    }) : '')))));
  });
  return _react.default.createElement("div", {
    className: "ml-6"
  }, _react.default.createElement("div", {
    className: "container py-4"
  }, _react.default.createElement("div", {
    className: "datastore-query-builder"
  }, props.datapackage.resources[0].datastore_active ? _react.default.createElement(_datastoreQueryBuilder.QueryBuilder, {
    resource: (0, _utils.getResourceForFiltering)(props.datapackage),
    filterBuilderAction: props.filterUIAction
  }) : '')), _react.default.createElement(_reactTabsRedux.Tabs, {
    renderActiveTabContentOnly: true,
    handleSelect: function handleSelect(selectedTab) {
      props.selectTabAction(selectedTab);
    },
    selectedTab: selectedTab
  }, tabLinks, tabContents));
};

exports.App = App;

var mapStateToProps = function mapStateToProps(state) {
  return _objectSpread({}, state);
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    filterUIAction: function filterUIAction(payload) {
      return dispatch((0, _actions.filterUIAction)(payload));
    },
    fetchDataAction: function fetchDataAction(payload) {
      return dispatch((0, _actions.fetchDataAction)(payload));
    },
    dataViewBuilderAction: function dataViewBuilderAction(payload) {
      return dispatch((0, _actions.dataViewBuilderAction)(payload));
    },
    selectTabAction: function selectTabAction(payload) {
      return dispatch((0, _actions.selectTabAction)(payload));
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);

exports.default = _default;