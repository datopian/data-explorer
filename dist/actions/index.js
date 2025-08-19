"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectTabAction = exports.filterUIAction = exports.fetchDataAction = exports.dataViewBuilderAction = void 0;
var _loadDataset = _interopRequireDefault(require("../utils/loadDataset"));
var _datapackageRender = require("datapackage-render");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const selectTabAction = payload => (dispatch, getState) => {
  const widgets = JSON.parse(JSON.stringify(getState().widgets));
  widgets.forEach((widget, index) => {
    widgets[index].active = false;
    if (widget.name === payload || payload.includes('-') && payload.split('-')[0] === widget.name) {
      widgets[index].active = true;
    }
  });
  dispatch(selectTab({
    widgets
  }));
};
exports.selectTabAction = selectTabAction;
const filterUIAction = payload => async (dispatch, getState) => {
  let datapackage = JSON.parse(JSON.stringify(getState().datapackage));
  // For datastore resources, we need to remove loaded `data` attribute to
  // trigger re-fetch of a resource. This is required since we initially fetch
  // only subset of data from datastore, eg, first 100 rows. When user applies
  // filters, we need to hit datastore api and update the data.
  const newResource = JSON.parse(JSON.stringify(payload));
  const updatedDatapackage = Object.assign(datapackage, {
    resources: [newResource]
  });
  if (updatedDatapackage.resources[0].datastore_active) {
    delete updatedDatapackage.resources[0].data;
  }
  // Update state.datapackage with new resource path that includes filters (datastore query)
  dispatch(datapackageLoad({
    datapackage: updatedDatapackage
  }));
  // Set state of widgets as loading
  const loadingWidgets = JSON.parse(JSON.stringify(getState().widgets)).map(widget => {
    widget.loading = true;
    return widget;
  });
  dispatch(fetchDataBegin({
    widgets: loadingWidgets
  }));
  // Load dataset using new path and update state
  datapackage = JSON.parse(JSON.stringify(getState().datapackage));
  const loadedDataset = await (0, _loadDataset.default)(datapackage);
  dispatch(datapackageLoad({
    datapackage: loadedDataset
  }));
  // Compile new data into widget views
  const widgets = JSON.parse(JSON.stringify(getState().widgets)).map(widget => {
    widget.datapackage.views = widget.datapackage.views.map(view => (0, _datapackageRender.compileView)(view, loadedDataset));
    widget.loading = false;
    return widget;
  });
  dispatch(fetchDataSuccess({
    widgets
  }));
};
exports.filterUIAction = filterUIAction;
const dataViewBuilderAction = payload => dispatch => {
  let actionType;
  if (payload.specType === 'simple') {
    actionType = 'DATA_VIEW_CHART_BUILDER_ACTION';
  } else if (payload.specType === 'tabularmap') {
    actionType = 'DATA_VIEW_MAP_BUILDER_ACTION';
  }
  dispatch({
    type: actionType,
    payload
  });
};
exports.dataViewBuilderAction = dataViewBuilderAction;
const fetchDataAction = payload => async dispatch => {
  const loadingWidgets = JSON.parse(JSON.stringify(payload.widgets)).map(widget => {
    widget.loading = true;
    return widget;
  });
  dispatch(fetchDataBegin({
    widgets: loadingWidgets
  }));
  const datapackage = JSON.parse(JSON.stringify(payload.datapackage));
  const loadedDataset = await (0, _loadDataset.default)(datapackage);
  dispatch(datapackageLoad({
    datapackage: loadedDataset
  }));
  const widgets = JSON.parse(JSON.stringify(payload.widgets)).map(widget => {
    widget.datapackage.views = widget.datapackage.views.map(view => (0, _datapackageRender.compileView)(view, loadedDataset));
    return widget;
  });
  dispatch(fetchDataSuccess({
    widgets
  }));
};
exports.fetchDataAction = fetchDataAction;
const selectTab = res => ({
  type: 'SELECT_TAB',
  payload: {
    ...res
  }
});
const datapackageLoad = res => ({
  type: 'DATAPACKAGE_LOAD',
  payload: {
    ...res
  }
});
const fetchDataBegin = res => ({
  type: 'FETCH_DATA_BEGIN',
  payload: {
    ...res
  }
});
const fetchDataSuccess = res => ({
  type: 'FETCH_DATA_SUCCESS',
  payload: {
    ...res
  }
});
const fetchDataFailure = err => ({
  type: 'FETCH_DATA_FAILURE',
  payload: {
    err
  }
});