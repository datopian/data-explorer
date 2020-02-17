"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepClone = exports.getResourceForFiltering = exports.getDataViewMapBuilderView = exports.showQueryBuilder = exports.getDataViewChartBuilderView = exports.getEmptyView = exports.unloadDatapackage = void 0;

var unloadDatapackage = function unloadDatapackage(datapackage) {
  var unloadedDatapackage = deepClone(datapackage);
  unloadedDatapackage.resources && unloadedDatapackage.resources.forEach(function (resource) {
    delete resource.data;
    delete resource._values;
  });
  unloadedDatapackage.views && unloadedDatapackage.views.forEach(function (view) {
    view.resources && view.resources.forEach(function (resource) {
      delete resource.data;
      delete resource._values;
    });
  });
  return unloadedDatapackage;
};

exports.unloadDatapackage = unloadDatapackage;

var getEmptyView = function getEmptyView(datapackage) {
  try {
    return {
      resources: [{
        schema: datapackage.resources[0].schema
      }]
    };
  } catch (e) {
    return {};
  }
};

exports.getEmptyView = getEmptyView;

var getDataViewChartBuilderView = function getDataViewChartBuilderView(datapackage) {
  if (!datapackage) return {};
  var views = datapackage.views || [];

  switch (views.length) {
    case 1:
      return datapackage.views[0];

    case 2:
      return datapackage.views[1];

    case 3:
      return datapackage.views[2];

    default:
      return getEmptyView(datapackage);
  }
};

exports.getDataViewChartBuilderView = getDataViewChartBuilderView;

var showQueryBuilder = function showQueryBuilder(props) {
  var activeWidget = props.widgets.find(function (widget) {
    return widget.active;
  });
  var isWebView = false;

  try {
    isWebView = activeWidget.datapackage.views[0].view_type === 'webpage_view';
  } catch (_unused) {// just continue -- not a web view
  }

  if (isWebView) return false;
  return props.datapackage.resources[0].datastore_active;
};

exports.showQueryBuilder = showQueryBuilder;

var getDataViewMapBuilderView = function getDataViewMapBuilderView(datapackage) {
  if (!datapackage) return {};
  var views = datapackage.views || [];
  return views.find(function (view) {
    return view.specType === 'tabularmap';
  }) || getEmptyView(datapackage);
};

exports.getDataViewMapBuilderView = getDataViewMapBuilderView;

var getResourceForFiltering = function getResourceForFiltering(datapackage) {
  if (!datapackage) return {};
  return datapackage.resources[0];
};

exports.getResourceForFiltering = getResourceForFiltering;

var deepClone = function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
};

exports.deepClone = deepClone;