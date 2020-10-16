"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("../../i18n/i18n");

var _react = _interopRequireWildcard(require("react"));

var _formik = require("formik");

var _reactDatePicker = _interopRequireDefault(require("react-date-picker"));

var _reactCopyToClipboard = require("react-copy-to-clipboard");

var _reactI18next = require("react-i18next");

var _reactTooltip = _interopRequireDefault(require("react-tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function DatastoreSearchSql(props) {
  var resource = JSON.parse(JSON.stringify(props.resource));

  var _useState = (0, _react.useState)(resource.api || ''),
      _useState2 = _slicedToArray(_useState, 2),
      cleanedDatastoreUrl = _useState2[0],
      setDatastoreUrl = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      canCopyUri = _useState4[0],
      setCanCopyUri = _useState4[1];

  var dateFields = resource.schema.fields.filter(function (field) {
    return field.type && field.type.includes('date');
  });
  var defaultDateFieldName = dateFields.length > 0 ? dateFields[0].name : null;
  var otherFields = resource.schema.fields.filter(function (field) {
    return !(field.type && field.type.includes('date'));
  });

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var operators = [{
    name: '=',
    label: '='
  }, {
    name: '!=',
    label: '!='
  }, {
    name: '<',
    label: '<'
  }, {
    name: '>',
    label: '>'
  }, {
    name: '<=',
    label: '<='
  }, {
    name: '>=',
    label: '>='
  }];

  function handleSubmit(values) {
    var clonedValues = JSON.parse(JSON.stringify(values)); // Convert query to SQL string

    var fieldNames = resource.schema.fields.map(function (field) {
      return field.name;
    });
    var sqlQueryString = "SELECT \"".concat(fieldNames.join('", "'), "\" FROM \"").concat(resource.alias || resource.id, "\"");

    if (clonedValues.date.startDate) {
      var rule = {
        combinator: 'AND',
        field: clonedValues.date.fieldName,
        operator: '>=',
        value: clonedValues.date.startDate
      };
      var localDateTime = new Date(clonedValues.date.startDate);
      var offset = localDateTime.getTimezoneOffset();
      localDateTime = new Date(localDateTime.getTime() - offset * 60 * 1000);
      rule.value = localDateTime.toISOString();
      clonedValues.rules.push(rule);
    }

    if (clonedValues.date.endDate) {
      var _rule = {
        combinator: 'AND',
        field: clonedValues.date.fieldName,
        operator: '<=',
        value: clonedValues.date.endDate
      };

      var _localDateTime = new Date(clonedValues.date.endDate); // EDS specific: we want to exclude end date


      _localDateTime = new Date(_localDateTime.setDate(_localDateTime.getDate() - 1)); // Now, convert it into GMT considering offset

      var _offset = _localDateTime.getTimezoneOffset();

      _localDateTime = new Date(_localDateTime.getTime() - _offset * 60 * 1000);
      _rule.value = _localDateTime.toISOString();
      clonedValues.rules.push(_rule);
    }

    clonedValues.rules.forEach(function (rule, index) {
      // Convert JS date object into string:
      rule.value = rule.value instanceof Date ? rule.value.toISOString() : rule.value;

      if (index === 0) {
        // TODO: unquote value for numbers
        sqlQueryString += " WHERE \"".concat(rule.field, "\" ").concat(rule.operator, " '").concat(rule.value, "'");
      } else {
        // If we have >1 rule we will need 'AND', 'OR' combinators
        sqlQueryString += " ".concat(rule.combinator.toUpperCase(), " \"").concat(rule.field, "\" ").concat(rule.operator, " '").concat(rule.value, "'");
      }
    }); // Set a limit of 100 rows as we don't need more for previewing...

    sqlQueryString += " ORDER BY \"".concat(values.sort.fieldName, "\" ").concat(values.sort.order, " LIMIT 100"); // Build a datastore URL with SQL string

    var datastoreUrl = props.apiUrl + "datastore_search_sql?sql=".concat(sqlQueryString); // Trigger Redux action

    resource.api = encodeURI(datastoreUrl);
    props.action(resource); // setDatastoreUrl(datastoreUrl.replace('COUNT(*) OVER () AS _count, ', ''))
    // Update download links

    var downloadCsvApiUri, downloadJsonApiUri, downloadExcelApiUri;
    var downloadUrl = datastoreUrl // .replace('COUNT(*) OVER () AS _count, ', '')
    .replace(' LIMIT 100', '');
    var uriObj = new URL(downloadUrl);

    if (resource.alias) {
      uriObj.searchParams.set('alias', resource.alias);
    }

    downloadJsonApiUri = "".concat(window.location.origin, "/download/datastore_search_sql").concat(uriObj.search);
    uriObj.searchParams.set('format', 'csv');
    downloadCsvApiUri = "".concat(window.location.origin, "/download/datastore_search_sql").concat(uriObj.search);
    uriObj.searchParams.set('format', 'xlsx');
    downloadExcelApiUri = "".concat(window.location.origin, "/download/datastore_search_sql").concat(uriObj.search);
    var ul = document.getElementById('downloads');
    var csvLink = ul.children[0].children[0];
    csvLink.setAttribute('href', downloadCsvApiUri);
    var jsonLink = ul.children[2].children[0];
    jsonLink.setAttribute('href', downloadJsonApiUri);
    var excelLink = ul.children[4].children[0];
    excelLink.setAttribute('href', downloadExcelApiUri);
    setCanCopyUri(true);
  }

  function handleReset() {
    resource.api = props.initialApiUrl;
    props.action(resource);
    setDatastoreUrl(resource.api);
    setCanCopyUri(true);
  }

  function handleChange() {
    setCanCopyUri(false);
  }

  return _react.default.createElement(_formik.Formik, {
    initialValues: {
      rules: [],
      date: {
        startDate: null,
        endDate: null,
        fieldName: defaultDateFieldName
      },
      sort: {
        fieldName: resource.schema.fields[0].name,
        order: 'DESC'
      }
    },
    onSubmit: function onSubmit(values) {
      return handleSubmit(values);
    },
    onReset: function onReset() {
      return handleReset();
    },
    render: function render(_ref) {
      var values = _ref.values,
          setFieldValue = _ref.setFieldValue,
          handleReset = _ref.handleReset;
      return _react.default.createElement(_formik.Form, {
        className: "form-inline dq-main-container",
        onChange: handleChange
      }, _react.default.createElement("div", {
        className: "dq-heading"
      }, _react.default.createElement("div", {
        className: "dq-heading-main"
      }), _react.default.createElement("div", {
        className: "dq-heading-total-rows"
      }, props.totalRows && parseInt(props.totalRows).toLocaleString() ? parseInt(props.totalRows).toLocaleString() : '-')), defaultDateFieldName ? _react.default.createElement("div", {
        className: "dq-date-picker"
      }, _react.default.createElement(_formik.Field, {
        name: "date.fieldName",
        component: "select",
        className: "form-control"
      }, dateFields.map(function (field, index) {
        return _react.default.createElement("option", {
          value: field.name,
          key: "dateField".concat(index)
        }, field.title || field.name);
      })), _react.default.createElement(_reactDatePicker.default, {
        value: values.date.startDate,
        clearIcon: "X",
        onChange: function onChange(val) {
          setFieldValue("date.startDate", val);
          handleChange();
        },
        format: "yyyy-MM-dd"
      }), _react.default.createElement("i", {
        className: "fa fa-long-arrow-right",
        "aria-hidden": "true"
      }), _react.default.createElement(_reactDatePicker.default, {
        value: values.date.endDate,
        clearIcon: "X",
        onChange: function onChange(val) {
          setFieldValue("date.endDate", val);
          handleChange();
        },
        returnValue: "end",
        format: "yyyy-MM-dd",
        minDate: values.date.startDate
      })) : '', _react.default.createElement(_formik.FieldArray, {
        name: "rules",
        render: function render(arrayHelpers) {
          return _react.default.createElement("div", {
            className: "dq-rule-container"
          }, _react.default.createElement("div", {
            className: "dq-body"
          }, values.rules && values.rules.length > 0 ? values.rules.map(function (rule, index) {
            return _react.default.createElement("div", {
              key: index,
              className: "dq-rule-item"
            }, _react.default.createElement(_formik.Field, {
              name: "rules.".concat(index, ".combinator"),
              component: "select",
              className: "form-control",
              required: true
            }, _react.default.createElement("option", {
              value: "AND"
            }, "AND"), _react.default.createElement("option", {
              value: "OR"
            }, "OR")), _react.default.createElement(_formik.Field, {
              name: "rules.".concat(index, ".field"),
              component: "select",
              className: "form-control",
              required: true
            }, otherFields.map(function (field, index) {
              return _react.default.createElement("option", {
                value: field.name,
                key: "field".concat(index)
              }, field.title || field.name);
            })), _react.default.createElement(_formik.Field, {
              name: "rules.".concat(index, ".operator"),
              component: "select",
              className: "form-control",
              required: true
            }, operators.map(function (operator, index) {
              return _react.default.createElement("option", {
                value: operator.name,
                key: "operator".concat(index)
              }, operator.label);
            })), _react.default.createElement(_formik.Field, {
              name: "rules.".concat(index, ".value"),
              className: "form-control",
              required: true
            }), _react.default.createElement("button", {
              type: "button",
              className: "btn btn-default dq-btn-remove",
              onClick: function onClick() {
                // remove a rule from the list
                arrayHelpers.remove(index);
                handleChange();
              }
            }, "-"), _react.default.createElement("button", {
              type: "button",
              className: "btn btn-default dq-btn-add",
              onClick: function onClick() {
                // insert an empty rule at a position
                arrayHelpers.insert(index + 1, {
                  combinator: 'AND',
                  field: otherFields[0].name,
                  operator: '=',
                  value: ''
                });
                handleChange();
              }
            }, "+"));
          }) : _react.default.createElement("button", {
            type: "button",
            className: "btn btn-default dq-rule-add",
            onClick: function onClick() {
              arrayHelpers.push({
                combinator: 'AND',
                field: otherFields[0].name,
                operator: '=',
                value: ''
              });
              handleChange();
            }
          }, t('Add a rule'))), _react.default.createElement("div", {
            className: "dq-rule-submit dq-footer"
          }, _react.default.createElement(_formik.Field, {
            name: "sort.fieldName",
            component: "select",
            className: "form-control"
          }, resource.schema.fields.map(function (field, index) {
            return _react.default.createElement("option", {
              value: field.name,
              key: "field".concat(index)
            }, field.title || field.name);
          })), _react.default.createElement(_formik.Field, {
            name: "sort.order",
            component: "select",
            className: "form-control"
          }, _react.default.createElement("option", {
            value: "DESC"
          }, "Descending"), _react.default.createElement("option", {
            value: "ASC"
          }, "Ascending")), _react.default.createElement("button", {
            type: "submit",
            className: "btn btn-primary submit-button"
          }, t('Submit')), _react.default.createElement("button", {
            type: "submit",
            className: "btn btn-primary reset-button",
            onClick: handleReset
          }, t('Reset')), _react.default.createElement(_reactCopyToClipboard.CopyToClipboard, {
            text: cleanedDatastoreUrl
          }, _react.default.createElement("div", {
            "data-tip": t("Submit to enable")
          }, _react.default.createElement("button", {
            type: "button",
            disabled: !canCopyUri,
            className: "btn btn-primary copy-button"
          }, t("Copy API URI")), !canCopyUri ? _react.default.createElement(_reactTooltip.default, null) : ""))));
        }
      }));
    }
  });
}

var _default = DatastoreSearchSql;
exports.default = _default;