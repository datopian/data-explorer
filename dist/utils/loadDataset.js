"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = require("data.js");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var toArray = require('stream-to-array');

function parseDatapackageIdentifier(stringOrJSON) {
  try {
    return JSON.parse(stringOrJSON);
  } catch (e) {
    return stringOrJSON;
  }
} // needs to be encapsulated
// should be library code


var _callee2 = function _callee2(dpID) {
  var DP_ID, tabularFormats, dataset;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          DP_ID = parseDatapackageIdentifier(dpID);
          tabularFormats = ['csv', 'tsv', 'dsv', 'xls', 'xlsx'];
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(_data.Dataset.load(DP_ID));

        case 5:
          dataset = _context2.sent;
          _context2.next = 8;
          return regeneratorRuntime.awrap(Promise.all(dataset.resources.map(function _callee(file) {
            var response, result, fileInline, headers, rowStream, data, _response, _result, geoJsonTypes;

            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!(file.displayName === 'FileInline')) {
                      _context.next = 4;
                      break;
                    }

                    return _context.abrupt("return");

                  case 4:
                    if (!(file.descriptor.api && file.descriptor.api.includes('datastore_search'))) {
                      _context.next = 25;
                      break;
                    }

                    _context.next = 7;
                    return regeneratorRuntime.awrap(fetch(file.descriptor.api));

                  case 7:
                    response = _context.sent;

                    if (response.ok) {
                      _context.next = 11;
                      break;
                    }

                    file.descriptor.unavailable = true;
                    return _context.abrupt("return");

                  case 11:
                    _context.next = 13;
                    return regeneratorRuntime.awrap(response.json());

                  case 13:
                    result = _context.sent;
                    // Remove fields that start with `_` as we don't want to display internal values,
                    // e.g., `_id`, `_full_text` and `_count`
                    file.descriptor.data = result.result.records.map(function (_ref, index) {
                      var _id = _ref._id,
                          _full_text = _ref._full_text,
                          _count = _ref._count,
                          etc = _objectWithoutProperties(_ref, ["_id", "_full_text", "_count"]);

                      if (file.descriptor.schema) {
                        // If schema exists, use it to order columns. This is needed since order
                        // of columns shuffled when calling `datastore_search_sql` API vs `datastore_search`.
                        var ordered = {};
                        file.descriptor.schema.fields.forEach(function (field) {
                          return ordered[field.name] = etc[field.name];
                        });
                        return ordered;
                      }

                      return etc;
                    });
                    file.descriptor.totalrowcount = result.result.total || result.result.records[0]._count; // Infer schema but re-open the file as it is now "inlined":

                    fileInline = (0, _data.open)({
                      data: file.descriptor.data.map(Object.values),
                      format: 'csv'
                    });
                    headers = Object.keys(file.descriptor.data[0]);
                    fileInline.descriptor.data = [headers].concat(fileInline.descriptor.data);

                    if (file.descriptor.schema) {
                      _context.next = 23;
                      break;
                    }

                    _context.next = 22;
                    return regeneratorRuntime.awrap(fileInline.addSchema());

                  case 22:
                    file.descriptor.schema = fileInline.descriptor.schema;

                  case 23:
                    _context.next = 68;
                    break;

                  case 25:
                    if (!(file.displayName === "FileRemote" && tabularFormats.includes(file.descriptor.format))) {
                      _context.next = 44;
                      break;
                    }

                    _context.prev = 26;
                    _context.next = 29;
                    return regeneratorRuntime.awrap(file.rows({
                      size: 100,
                      keyed: true
                    }));

                  case 29:
                    rowStream = _context.sent;
                    _context.next = 32;
                    return regeneratorRuntime.awrap(toArray(rowStream));

                  case 32:
                    data = _context.sent;

                    if (data.length > 0) {
                      file.descriptor.data = data; // This makes it FileInline
                    } else {
                      file.descriptor.unavailable = true;
                    }

                    _context.next = 36;
                    return regeneratorRuntime.awrap(file.addSchema());

                  case 36:
                    _context.next = 42;
                    break;

                  case 38:
                    _context.prev = 38;
                    _context.t0 = _context["catch"](26);
                    console.warn(_context.t0);
                    file.descriptor.unavailable = true;

                  case 42:
                    _context.next = 68;
                    break;

                  case 44:
                    if (!file.descriptor.format.toLowerCase().includes('json')) {
                      _context.next = 63;
                      break;
                    }

                    _context.next = 47;
                    return regeneratorRuntime.awrap(fetch(file.descriptor.path));

                  case 47:
                    _response = _context.sent;

                    if (_response.ok) {
                      _context.next = 51;
                      break;
                    }

                    file.descriptor.unavailable = true;
                    return _context.abrupt("return");

                  case 51:
                    _context.next = 53;
                    return regeneratorRuntime.awrap(_response.json());

                  case 53:
                    _result = _context.sent;
                    // The '.json' files can contain geo data - check by its 'type' property
                    geoJsonTypes = ['Feature', 'FeatureCollection', 'Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon', 'GeometryCollection'];

                    if (!geoJsonTypes.includes(_result.type)) {
                      _context.next = 59;
                      break;
                    }

                    file.descriptor.data = _result;
                    _context.next = 61;
                    break;

                  case 59:
                    // It isn't a valid GeoJSON
                    file.descriptor.unavailable = true;
                    return _context.abrupt("return");

                  case 61:
                    _context.next = 68;
                    break;

                  case 63:
                    if (!(file.descriptor.format.toLowerCase() === 'pdf')) {
                      _context.next = 67;
                      break;
                    }

                    return _context.abrupt("return");

                  case 67:
                    // We can't load any other data types for now.
                    file.descriptor.unavailable = true;

                  case 68:
                  case "end":
                    return _context.stop();
                }
              }
            }, null, null, [[26, 38]]);
          })));

        case 8:
          return _context2.abrupt("return", dataset.descriptor);

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](2);
          console.warn('Failed to load a Dataset from provided datapackage id\n' + _context2.t0);
          return _context2.abrupt("return", DP_ID);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 11]]);
};

exports.default = _callee2;