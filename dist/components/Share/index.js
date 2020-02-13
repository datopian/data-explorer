"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("../../i18n/i18n");

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAX_LEN = 1500;
var slimProps = ['archiver', 'schema', 'shareLink', 'iframeText'];

var slim = function slim(serializedState) {
  if (serializedState.length <= MAX_LEN) return serializedState;
  var state = JSON.parse(serializedState);
  state.datapackage.resources.forEach(function (resource) {
    for (var prop in slimProps) {
      if (resource[slimProps[prop]]) delete resource[slimProps[prop]];
    }
  });
  return JSON.stringify(state);
};

var _default = function _default(props) {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var serializedState = slim(props.serializedState);
  var urlObj = new URL(window.location.href);
  urlObj.searchParams.set('explorer', serializedState);
  var shareLink = urlObj.href;
  var iframe = "<iframe src=\"".concat(urlObj.href, "\" />");
  var shareable = shareLink.length < 2000;

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

  return _react.default.createElement("div", {
    className: "dx-share-container"
  }, shareable ? _react.default.createElement("div", null, _react.default.createElement("div", {
    className: "m-4"
  }, _react.default.createElement("input", {
    id: "share-link",
    className: "border-solid border-4 border-gray-600 w-1/2 px-2",
    value: shareLink
  }), _react.default.createElement("a", {
    href: "#/",
    id: "copy-share-link",
    className: "m-4",
    onClick: function onClick() {
      copy(shareLink);
    }
  }, _react.default.createElement("i", null, t("copy share link")))), _react.default.createElement("div", {
    className: "m-4"
  }, _react.default.createElement("input", {
    id: "embed",
    className: "border-solid border-4 border-gray-600 px-2 w-1/2",
    value: iframe
  }), _react.default.createElement("a", {
    href: "#/",
    id: "copy-share-link",
    className: "m-4",
    onClick: function onClick() {
      copy(iframe);
    }
  }, _react.default.createElement("i", null, t("copy embed text"))))) : _react.default.createElement("p", null, t('No share link available')), props.apiUri && _react.default.createElement("div", {
    className: "m-4"
  }, _react.default.createElement("input", {
    id: "apiUri",
    className: "border-solid border-4 border-gray-600 px-2 w-1/2",
    value: props.apiUri
  }), _react.default.createElement("a", {
    href: "#/",
    id: "copy-share-link",
    className: "m-4",
    onClick: function onClick() {
      copy(props.apiUri);
    }
  }, _react.default.createElement("i", null, t("copy API URI")))));
};

exports.default = _default;