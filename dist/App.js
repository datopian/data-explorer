"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.App = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

require("./App.css");

var _datastoreQueryBuilder = require("@datopian/datastore-query-builder");

var _DataView = _interopRequireDefault(require("./components/DataView"));

var _Share = _interopRequireDefault(require("./components/Share"));

var _Pagination = _interopRequireDefault(require("./components/Pagination"));

var _chartBuilder = require("@datopian/chart-builder");

var _mapBuilder = require("@datopian/map-builder");

var _reactTabsRedux = require("react-tabs-redux");

var _actions = require("./actions/");

var _utils = require("./utils");

require("./i18n/i18n");

var _reactI18next = require("react-i18next");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t; // Check if any of widgets requires datastore specific components:


  var nonDataStoreViewTypes = ['web', 'document'];
  var datastoreComponents = props.widgets.find(function (widget) {
    return widget.datapackage.views.find(function (view) {
      return !nonDataStoreViewTypes.includes(view.specType);
    });
  });
  var totalRows = props.datapackage.resources[0].datastore_active ? props.datapackage.resources[0].totalrowcount ? props.datapackage.resources[0].totalrowcount.toLocaleString() : '' : '';
  var distinguisher = '-' + Math.random().toString(36).slice(2, 5);
  var retrieveSelectedTab = activeWidget ? activeWidget.name : props.widgets[0].name;
  var selectedTab;

  if (retrieveSelectedTab.includes('-')) {
    selectedTab = retrieveSelectedTab;
  } else {
    selectedTab = retrieveSelectedTab + distinguisher;
  }

  selectedTab = selectedTab.replace(/([^a-z0-9]+)/gi, "-");
  var tabLinks = props.widgets.map(function (widget, index) {
    return _react.default.createElement(_reactTabsRedux.TabLink, {
      to: (widget.name + distinguisher).replace(/([^a-z0-9]+)/gi, "-"),
      className: "mr-4 tab-".concat(widget.name.toLowerCase()),
      key: "tabLink-".concat(index)
    }, t(widget.name));
  });
  var tabContents = props.widgets.map(function (widget, index) {
    return _react.default.createElement(_reactTabsRedux.TabContent, {
      for: (widget.name + distinguisher).replace(/([^a-z0-9]+)/gi, "-"),
      className: "mr-4 tabpanel-".concat(widget.name.toLowerCase()),
      key: "tabContent-".concat(index)
    }, ['table', 'web'].includes(widget.datapackage.views[0].specType) ? _react.default.createElement("div", {
      className: "container flex py-6"
    }, _react.default.createElement("div", {
      className: "w-full py-3"
    }, _react.default.createElement(_DataView.default, widget))) : _react.default.createElement("div", {
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
    className: "data-explorer"
  }, totalRows && datastoreComponents && _react.default.createElement("div", {
    className: "total-rows"
  }, _react.default.createElement("span", {
    className: "total-rows-label"
  }, t('Total rows')), ": ", _react.default.createElement("span", {
    className: "total-rows-value"
  }, totalRows)), _react.default.createElement("div", {
    className: "datastore-query-builder"
  }, (0, _utils.showQueryBuilder)(props) ? _react.default.createElement(_datastoreQueryBuilder.QueryBuilder, {
    resource: (0, _utils.getResourceForFiltering)(props.datapackage),
    filterBuilderAction: props.filterUIAction
  }) : ''), _react.default.createElement(_reactTabsRedux.Tabs, {
    renderActiveTabContentOnly: true,
    handleSelect: function handleSelect(selectedTab) {
      props.selectTabAction(selectedTab);
    },
    className: "data-explorer-content",
    selectedTab: selectedTab
  }, tabLinks, tabContents), props.datapackage.resources[0].datastore_active && datastoreComponents ? _react.default.createElement(_Pagination.default, {
    datapackage: props.datapackage,
    updateAction: props.filterUIAction
  }) : _react.default.createElement("div", {
    className: "no-pagination not-datastore-resource"
  }), datastoreComponents ? _react.default.createElement(_Share.default, {
    serializedState: props.serializedState,
    apiUri: props.datapackage.resources[0].api
  }) : _react.default.createElement("div", {
    className: "no-share-feature"
  }));
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