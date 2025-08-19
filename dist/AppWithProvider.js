"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _store = _interopRequireDefault(require("./store"));
require("./App.css");
var _App2 = _interopRequireDefault(require("./App"));
require("./i18n/i18n");
var _reactI18next = require("react-i18next");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = props => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  let datapackage;

  // Allow datapackage json or obj
  if (typeof props.datapackage === 'string') {
    try {
      datapackage = JSON.parse(props.datapackage);
    } catch (e) {
      // TODO -- would be nice for the app to still load in an empty state on fail case
      datapackage = {};
      console.warn('Invalid datapackage', e);
    }
  } else if (typeof props.datapackage === 'object') {
    datapackage = props.datapackage;
  }
  let views;
  try {
    views = JSON.parse(JSON.stringify(datapackage.views));
    delete datapackage.views;
  } catch {
    console.log('No views set on datapackage');
  }
  const widgetsFromViews = views => {
    const widgetNames = {
      'table': t('Table'),
      'tabularmap': t('Map'),
      'map': t('Map'),
      'simple': t('Chart')
    };
    return views.map((view, index) => {
      return {
        active: index === 0 ? true : false,
        name: widgetNames[view.specType],
        datapackage: {
          views: [view]
        }
      };
    });
  };
  const widgets = props.widgets ? props.widgets : widgetsFromViews(views);
  return /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: (0, _store.default)({
      widgets,
      datapackage
    })
  }, /*#__PURE__*/_react.default.createElement(_App2.default, null));
};
exports.default = _default;