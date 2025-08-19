"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _ = _interopRequireDefault(require("./"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
it('renders without crashing', () => {
  const div = document.createElement('div');
  _reactDom.default.render(/*#__PURE__*/_react.default.createElement(_.default, null), div);
  _reactDom.default.unmountComponentAtNode(div);
});