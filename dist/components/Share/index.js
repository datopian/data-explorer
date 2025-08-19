"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("../../i18n/i18n");
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MAX_LEN = 1500;
const slimProps = ['archiver', 'schema', 'shareLink', 'iframeText'];
const slim = serializedState => {
  if (serializedState.length <= MAX_LEN) return serializedState;
  const state = JSON.parse(serializedState);
  state.datapackage.resources.forEach(resource => {
    for (const prop in slimProps) {
      if (resource[slimProps[prop]]) delete resource[slimProps[prop]];
    }
  });
  return JSON.stringify(state);
};
var _default = props => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const serializedState = slim(props.serializedState);
  const urlObj = new URL(window.location.href);
  urlObj.searchParams.set('explorer', serializedState);
  const shareLink = urlObj.href;
  const iframe = `<iframe src="${urlObj.href}" />`;
  const shareable = shareLink.length < 2000;
  const copy = async str => {
    await navigator.clipboard.writeText(str);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "dx-share-container"
  }, shareable ? /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "m-4 ml-0 dx-share-link"
  }, /*#__PURE__*/_react.default.createElement("input", {
    id: "share-link-" + Math.random().toString(36).slice(2, 5),
    title: "Share link",
    className: "border-solid border-2 border-gray-600 w-1/2 px-2",
    value: shareLink
  }), /*#__PURE__*/_react.default.createElement("a", {
    href: "#/",
    id: "copy-share-link-" + Math.random().toString(36).slice(2, 5),
    className: "m-4",
    onClick: () => {
      copy(shareLink);
    }
  }, /*#__PURE__*/_react.default.createElement("em", null, t("copy share link")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "m-4 ml-0 dx-embed-link"
  }, /*#__PURE__*/_react.default.createElement("input", {
    id: "embed-" + Math.random().toString(36).slice(2, 5),
    title: "Embedded link",
    className: "border-solid border-2 border-gray-600 px-2 w-1/2",
    value: iframe
  }), /*#__PURE__*/_react.default.createElement("a", {
    href: "#/",
    id: "copy-share-link-" + Math.random().toString(36).slice(2, 5),
    className: "m-4",
    onClick: () => {
      copy(iframe);
    }
  }, /*#__PURE__*/_react.default.createElement("em", null, t("copy embed text"))))) : /*#__PURE__*/_react.default.createElement("p", {
    className: "no-share-link-message"
  }, t('No share link available')), props.apiUri && /*#__PURE__*/_react.default.createElement("div", {
    className: "m-4 ml-0 dx-apiuri-link"
  }, /*#__PURE__*/_react.default.createElement("input", {
    id: "apiUri-" + Math.random().toString(36).slice(2, 5),
    title: "API URI link",
    className: "border-solid border-2 border-gray-600 px-2 w-1/2",
    value: props.apiUri
  }), /*#__PURE__*/_react.default.createElement("a", {
    href: "#/",
    id: "copy-share-link-" + Math.random().toString(36).slice(2, 5),
    className: "m-4",
    onClick: () => {
      copy(props.apiUri);
    }
  }, /*#__PURE__*/_react.default.createElement("em", null, t("copy API URI")))));
};
exports.default = _default;