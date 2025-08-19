"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = (state = {}, action) => {
  switch (action.type) {
    case 'DATAPACKAGE_LOAD':
      return action.payload.datapackage;
    default:
      return state;
  }
};
exports.default = _default;