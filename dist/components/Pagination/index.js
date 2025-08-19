"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("../../i18n/i18n");
var _react = _interopRequireDefault(require("react"));
var _reactPaginate = _interopRequireDefault(require("react-paginate"));
var _reactI18next = require("react-i18next");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = props => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  function handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * 100);
    const resource = JSON.parse(JSON.stringify(props.datapackage.resources[0]));
    const urlObj = new URL(resource.api);
    if (resource.api.includes('datastore_search?')) {
      urlObj.searchParams.set('offset', offset);
    } else if (resource.api.includes('datastore_search_sql?')) {
      const sql = urlObj.searchParams.get('sql');
      const regex = /OFFSET(%20|\s)\d+/;
      if (regex.test(sql)) {
        urlObj.searchParams.set('sql', sql.replace(regex, `OFFSET ${offset}`));
      } else {
        urlObj.searchParams.set('sql', sql + ` OFFSET ${offset}`);
      }
      resource.api = resource.api.includes('offset');
    }
    resource.api = urlObj.href;
    props.updateAction(resource);
  }
  return /*#__PURE__*/_react.default.createElement(_reactPaginate.default, {
    previousLabel: t('Previous'),
    nextLabel: t('Next'),
    breakLabel: '...',
    breakClassName: 'break-me',
    pageCount: Math.ceil(props.datapackage.resources[0].totalrowcount / 100),
    marginPagesDisplayed: 2,
    pageRangeDisplayed: 5,
    onPageChange: handlePageClick,
    containerClassName: Object.keys(props.datapackage.resources[0].data || []).length === 0 ? 'hidden' : 'pagination',
    activeClassName: 'active'
  });
};
exports.default = _default;