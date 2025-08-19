"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("../utils");
// updates on every action and translates app state to shareable links
var _default = (state = {}, action, root) => {
  try {
    const clonedRoot = (0, _utils.deepClone)(root);
    delete clonedRoot.serializedState;
    const datapackage = (0, _utils.unloadDatapackage)(clonedRoot.datapackage);
    const widgets = clonedRoot.widgets.map(widget => {
      widget.datapackage = (0, _utils.unloadDatapackage)(widget.datapackage);
      widget.loading = false;
      return widget;
    });
    return JSON.stringify(Object.assign(clonedRoot, {
      datapackage,
      widgets
    }));
  } catch (e) {
    console.warn(e);
    return {};
  }
};
exports.default = _default;