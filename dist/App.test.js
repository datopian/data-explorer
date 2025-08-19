"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _App = require("./App");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
it('renders without crashing', () => {
  const div = document.createElement('div');
  _reactDom.default.render(/*#__PURE__*/_react.default.createElement(_App.App, null), div);
  _reactDom.default.unmountComponentAtNode(div);
});