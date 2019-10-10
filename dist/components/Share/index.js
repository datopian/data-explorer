"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

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
  var serializedState = slim(props.serializedState); // TODO this is a stub for montreal -- need to pass origin as props

  var shareLink = "localhost:4000/data-explorer?explorer=".concat(serializedState);
  var iframe = "<iframe src=\"localhost:4000/data-explorer?explorer=".concat(serializedState, "\" />");
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

  return _react.default.createElement("div", null, shareable && _react.default.createElement("div", {
    className: "dx-share-container"
  }, _react.default.createElement("div", {
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
  }, _react.default.createElement("i", null, "copy share link"))), _react.default.createElement("div", {
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
  }, _react.default.createElement("i", null, "copy embed text")))), !shareable && _react.default.createElement("p", null, "No share link available"));
};

exports.default = _default;