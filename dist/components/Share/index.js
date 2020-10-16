"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("../../i18n/i18n");

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(props) {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var copy = function copy(str) {
    // Create new element
    var el = document.createElement('textarea'); // Set value (string to be copied)

    el.value = str; // Set non-editable to avoid focus and move outside of view

    el.setAttribute('readonly', '');
    el.style = {
      position: 'absolute',
      left: '-9999px'
    };
    document.body.appendChild(el); // Select text inside element

    el.select(); // Copy text to clipboard

    document.execCommand('copy'); // Remove temporary element

    document.body.removeChild(el);
  };

  var parsedApiUri, downloadCsvApiUri, downloadJsonApiUri;

  if (props.apiUri) {
    // TODO: (maybe) remove? because row count is not in the query any more
    // leaving it here in case 
    parsedApiUri = props.apiUri.replace('COUNT(*)%20OVER%20()%20AS%20_count,%20', '');

    if (props.schema) {
      var fieldNames = props.schema.fields.map(function (field) {
        return field.name;
      });
      parsedApiUri = parsedApiUri.replace('SELECT%20*%20FROM', "SELECT%20\"".concat(fieldNames.join('", "'), "\"%20FROM"));
    }

    var uriObj = new URL(parsedApiUri);

    if (uriObj.pathname.split('/')[3] === 'datastore_search_sql') {
      downloadJsonApiUri = "".concat(window.location.origin, "/download/datastore_search_sql").concat(uriObj.search);
      uriObj.searchParams.set('format', 'csv');
      downloadCsvApiUri = "".concat(window.location.origin, "/download/datastore_search_sql").concat(uriObj.search);
      var ul = document.getElementById('downloads');
      var csvLink = ul.children[0].children[0];
      csvLink.setAttribute('href', downloadCsvApiUri);
      var jsonLink = ul.children[2].children[0];
      jsonLink.setAttribute('href', downloadJsonApiUri);
    }
  }

  return _react.default.createElement("div", {
    className: "dx-share-container"
  }, props.apiUri && _react.default.createElement("div", {
    className: "m-4 ml-0"
  }, _react.default.createElement("input", {
    id: "apiUri",
    className: "border-solid border-2 border-gray-600 px-2 w-1/2",
    value: decodeURI(parsedApiUri)
  }), _react.default.createElement("a", {
    href: "#/",
    id: "copy-share-link",
    className: "m-4",
    onClick: function onClick() {
      copy(decodeURI(parsedApiUri));
    }
  }, _react.default.createElement("i", null, t("copy API URI")))));
};

exports.default = _default;