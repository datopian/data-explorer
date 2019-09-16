"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../utils");

// updates on every action and translates app state to shareable links
var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var root = arguments.length > 2 ? arguments[2] : undefined;

  try {
    var clonedRoot = (0, _utils.deepClone)(root);
    delete clonedRoot.serializedState;
    var datapackage = (0, _utils.unloadDatapackage)(clonedRoot.datapackage);
    var widgets = clonedRoot.widgets.map(function (widget) {
      widget.datapackage = (0, _utils.unloadDatapackage)(widget.datapackage);
      widget.loading = false;
      return widget;
    });
    return JSON.stringify(Object.assign(clonedRoot, {
      datapackage: datapackage,
      widgets: widgets
    }));
  } catch (e) {
    console.warn(e);
    return {};
  }
};

exports.default = _default;