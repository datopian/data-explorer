"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("../../i18n/i18n");

var _react = _interopRequireDefault(require("react"));

var _reactPaginate = _interopRequireDefault(require("react-paginate"));

var _reactI18next = require("react-i18next");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(props) {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  function handlePageClick(data) {
    var selected = data.selected;
    var offset = Math.ceil(selected * 100);
    var resource = JSON.parse(JSON.stringify(props.datapackage.resources[0]));
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
    props.updateAction(resource);
  }

  return _react.default.createElement(_reactPaginate.default, {
    previousLabel: t('Previous'),
    nextLabel: t('Next'),
    breakLabel: '...',
    breakClassName: 'break-me',
    pageCount: Math.ceil(props.datapackage.resources[0].totalrowcount / 100),
    marginPagesDisplayed: 2,
    pageRangeDisplayed: 5,
    onPageChange: handlePageClick,
    containerClassName: 'pagination',
    activeClassName: 'active'
  });
};

exports.default = _default;