"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryBuilder = void 0;

var _react = _interopRequireDefault(require("react"));

require("../../App.css");

var _DatastoreSearchSql = _interopRequireDefault(require("./DatastoreSearchSql"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QueryBuilder = function QueryBuilder(props) {
  var resource = JSON.parse(JSON.stringify(props.resource));

  if (resource.schema) {
    var apiUrl;

    if (resource.proxy || resource.api) {
      var urlObj = new URL(resource.proxy || resource.api); // Remove action name from the URL so we get base API URL

      var pathParts = urlObj.pathname.split('/');
      pathParts.pop();
      urlObj.pathname = pathParts.join('/') + '/'; // Trailing slash for consistency

      urlObj.search = ''; // Remove all search params

      apiUrl = urlObj.href;
    } else {
      apiUrl = new URL(resource.path).origin + '/api/3/action/';
    }

    return _react.default.createElement("div", {
      className: "App"
    }, _react.default.createElement(_DatastoreSearchSql.default, {
      resource: resource,
      apiUrl: apiUrl,
      action: props.filterBuilderAction,
      totalRows: props.totalRows,
      initialApiUrl: resource.api
    }));
  } else {
    return _react.default.createElement("div", {
      className: "no-filters"
    });
  }
};

exports.QueryBuilder = QueryBuilder;