"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("../../i18n/i18n");

var _react = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ROWS_PER_PAGE = 100;

var _default = function _default(props) {
  // console.log('Pagination props:\n' + JSON.stringify(props, null, 2))
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var resource = JSON.parse(JSON.stringify(props.datapackage.resources[0]));

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      currentPage = _useState2[0],
      setCurrentPage = _useState2[1];

  function handlePageClick(targetPage) {
    setCurrentPage(targetPage);
    console.log('Pagination handlePageClick data:\n' + JSON.stringify(targetPage, null, 2));
    var offset = Math.ceil(targetPage * ROWS_PER_PAGE);
    var urlObj = new URL(resource.api);

    if (resource.api.includes('datastore_search?')) {
      urlObj.searchParams.set('offset', offset);
    } else if (resource.api.includes('datastore_search_sql?')) {
      var sql = urlObj.searchParams.get('sql');
      var regex = /OFFSET(%20|\s)\d+/;

      if (regex.test(sql)) {
        urlObj.searchParams.set('sql', sql.replace(regex, "OFFSET ".concat(offset)));
      } else {
        urlObj.searchParams.set('sql', sql + " OFFSET ".concat(offset));
      }

      resource.api = resource.api.includes('offset');
    }

    resource.api = urlObj.href;
    console.log('resource.api:\n' + JSON.stringify(resource.api, null, 2));
    props.updateAction(resource);
  } // pages are zero-based, not displayed to the user


  var lastPage = 0;

  if (resource.totalrowcount && !isNaN(resource.totalrowcount)) {
    lastPage = Math.ceil(resource.totalrowcount / ROWS_PER_PAGE) - 1;
  }

  return _react.default.createElement("div", {
    id: "data-explorer-pagination"
  }, _react.default.createElement("button", {
    onClick: function onClick() {
      return handlePageClick(0);
    }
  }, "First"), _react.default.createElement("button", {
    disabled: currentPage < 1,
    onClick: function onClick() {
      return handlePageClick(currentPage - 1);
    }
  }, "Previous"), _react.default.createElement("button", {
    title: "next",
    onClick: function onClick() {
      return handlePageClick(currentPage + 1);
    }
  }, "Next"), lastPage ? _react.default.createElement("button", {
    onClick: function onClick() {
      return handlePageClick(lastPage);
    }
  }, "Last") : '');
};

exports.default = _default;