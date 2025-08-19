"use strict";

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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const App = props => {
  (0, _react.useEffect)(() => {
    const payload = {
      datapackage: props.datapackage,
      widgets: props.widgets
    };
    props.fetchDataAction(payload);
  }, []);
  const activeWidget = props.widgets.find(widget => {
    return widget.active;
  });
  const {
    t
  } = (0, _reactI18next.useTranslation)();

  // Check if any of widgets requires datastore specific components:
  const nonDataStoreViewTypes = ['web', 'document'];
  const datastoreComponents = props.widgets.find(widget => {
    return widget.datapackage.views.find(view => !nonDataStoreViewTypes.includes(view.specType));
  });
  const totalRows = props.datapackage.resources[0].datastore_active ? props.datapackage.resources[0].totalrowcount ? props.datapackage.resources[0].totalrowcount.toLocaleString() : '' : '';
  var distinguisher = '-' + Math.random().toString(36).slice(2, 5);
  const retrieveSelectedTab = activeWidget ? activeWidget.name : props.widgets[0].name;
  let selectedTab;
  if (retrieveSelectedTab.includes('-')) {
    selectedTab = retrieveSelectedTab;
  } else {
    selectedTab = retrieveSelectedTab + distinguisher;
  }
  var illegalCharacters = /\W+/gi;
  selectedTab = selectedTab.replace(illegalCharacters, "-");
  const tabLinks = props.widgets.map((widget, index) => {
    return /*#__PURE__*/_react.default.createElement(_reactTabsRedux.TabLink, {
      to: (widget.name + distinguisher).replace(illegalCharacters, "-"),
      className: `mr-4 tab-${widget.name.toLowerCase()}`,
      key: `tabLink-${index}`
    }, t(widget.name));
  });
  const tabContents = props.widgets.map((widget, index) => {
    return /*#__PURE__*/_react.default.createElement(_reactTabsRedux.TabContent, {
      for: (widget.name + distinguisher).replace(illegalCharacters, "-"),
      className: `mr-4 tabpanel-${widget.name.toLowerCase()}`,
      key: `tabContent-${index}`
    }, ['table', 'web', 'tabularmap'].includes(widget.datapackage.views[0].specType) || ['dataexplorer_map_view', 'dataexplorer_chart_view'].includes(widget.datapackage.views[0].view_type) ? /*#__PURE__*/_react.default.createElement("div", {
      className: "container flex py-6"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "w-full py-3"
    }, /*#__PURE__*/_react.default.createElement(_DataView.default, widget))) : /*#__PURE__*/_react.default.createElement("div", {
      className: "container flex py-6"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "w-3/4 py-3 mr-4"
    }, /*#__PURE__*/_react.default.createElement(_DataView.default, widget)), /*#__PURE__*/_react.default.createElement("div", {
      className: "w-1/4"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "w-full"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "p-4 mr-4"
    }, widget.datapackage.views[0].specType === 'simple' ? /*#__PURE__*/_react.default.createElement(_chartBuilder.ChartBuilder, {
      view: widget.datapackage.views[0],
      dataViewBuilderAction: props.dataViewBuilderAction
    }) : '', widget.datapackage.views[0].specType === 'tabularmap' ? /*#__PURE__*/_react.default.createElement(_mapBuilder.MapBuilder, {
      view: widget.datapackage.views[0],
      dataViewBuilderAction: props.dataViewBuilderAction
    }) : '')))));
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "data-explorer"
  }, totalRows && datastoreComponents && /*#__PURE__*/_react.default.createElement("div", {
    className: "total-rows"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "total-rows-label"
  }, t('Total rows')), ": ", /*#__PURE__*/_react.default.createElement("span", {
    className: "total-rows-value"
  }, totalRows)), /*#__PURE__*/_react.default.createElement("div", {
    className: "datastore-query-builder"
  }, (0, _utils.showQueryBuilder)(props) ? /*#__PURE__*/_react.default.createElement(_datastoreQueryBuilder.QueryBuilder, {
    resource: (0, _utils.getResourceForFiltering)(props.datapackage),
    filterBuilderAction: props.filterUIAction
  }) : ''), /*#__PURE__*/_react.default.createElement(_reactTabsRedux.Tabs, {
    renderActiveTabContentOnly: true,
    handleSelect: selectedTab => {
      props.selectTabAction(selectedTab);
    },
    className: "data-explorer-content",
    selectedTab: selectedTab
  }, /*#__PURE__*/_react.default.createElement("div", {
    role: "tablist"
  }, tabLinks), tabContents), props.datapackage.resources[0].datastore_active && datastoreComponents ? /*#__PURE__*/_react.default.createElement(_Pagination.default, {
    datapackage: props.datapackage,
    updateAction: props.filterUIAction
  }) : /*#__PURE__*/_react.default.createElement("div", {
    className: "no-pagination not-datastore-resource"
  }));
};
exports.App = App;
const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  filterUIAction: payload => dispatch((0, _actions.filterUIAction)(payload)),
  fetchDataAction: payload => dispatch((0, _actions.fetchDataAction)(payload)),
  dataViewBuilderAction: payload => dispatch((0, _actions.dataViewBuilderAction)(payload)),
  selectTabAction: payload => dispatch((0, _actions.selectTabAction)(payload))
});
var _default = exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);