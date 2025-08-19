"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unloadDatapackage = exports.showQueryBuilder = exports.getResourceForFiltering = exports.getEmptyView = exports.getDataViewMapBuilderView = exports.getDataViewChartBuilderView = exports.deepClone = void 0;
const unloadDatapackage = datapackage => {
  const unloadedDatapackage = deepClone(datapackage);
  unloadedDatapackage.resources && unloadedDatapackage.resources.forEach(resource => {
    delete resource.data;
    delete resource._values;
  });
  unloadedDatapackage.views && unloadedDatapackage.views.forEach(view => {
    view.resources && view.resources.forEach(resource => {
      delete resource.data;
      delete resource._values;
    });
  });
  return unloadedDatapackage;
};
exports.unloadDatapackage = unloadDatapackage;
const getEmptyView = datapackage => {
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
const getDataViewChartBuilderView = datapackage => {
  if (!datapackage) return {};
  const views = datapackage.views || [];
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
const showQueryBuilder = props => {
  const activeWidget = props.widgets.find(widget => widget.active);
  let isWebView = false;
  try {
    const nonDataStoreViewTypes = ['web', 'document'];
    isWebView = nonDataStoreViewTypes.includes(activeWidget.datapackage.views[0].specType);
  } catch {
    // just continue -- not a web view
  }
  if (isWebView) return false;
  return props.datapackage.resources[0].datastore_active;
};
exports.showQueryBuilder = showQueryBuilder;
const getDataViewMapBuilderView = datapackage => {
  if (!datapackage) return {};
  const views = datapackage.views || [];
  return views.find(view => view.specType === 'tabularmap') || getEmptyView(datapackage);
};
exports.getDataViewMapBuilderView = getDataViewMapBuilderView;
const getResourceForFiltering = datapackage => {
  if (!datapackage) return {};
  return datapackage.resources[0];
};
exports.getResourceForFiltering = getResourceForFiltering;
const deepClone = obj => {
  return JSON.parse(JSON.stringify(obj));
};
exports.deepClone = deepClone;