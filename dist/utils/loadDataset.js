"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = require("data.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var toArray = require('stream-to-array');

function parseDatapackageIdentifier(stringOrJSON) {
  try {
    return JSON.parse(stringOrJSON);
  } catch (e) {
    return stringOrJSON;
  }
} // needs to be encapsulated
// should be library code


var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(dpID) {
    var DP_ID, tabularFormats, dataset;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            DP_ID = parseDatapackageIdentifier(dpID);
            tabularFormats = ['csv', 'tsv', 'dsv', 'xls', 'xlsx'];
            _context2.prev = 2;
            _context2.next = 5;
            return _data.Dataset.load(DP_ID);

          case 5:
            dataset = _context2.sent;
            _context2.next = 8;
            return Promise.all(dataset.resources.map(
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(file) {
                var response, result, fileInline, headers, rowStream, data, _response, _result, geoJsonTypes;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(file.displayName === 'FileInline')) {
                          _context.next = 4;
                          break;
                        }

                        return _context.abrupt("return");

                      case 4:
                        if (!(file.descriptor.path && file.descriptor.path.includes('datastore_search'))) {
                          _context.next = 23;
                          break;
                        }

                        _context.next = 7;
                        return fetch(file.descriptor.path);

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
                        return response.json();

                      case 13:
                        result = _context.sent;
                        file.descriptor.data = result.result.records; // Infer schema but re-open the file as it is now "inlined":

                        fileInline = (0, _data.open)({
                          data: file.descriptor.data.map(Object.values),
                          format: 'csv'
                        });
                        headers = Object.keys(file.descriptor.data[0]);
                        fileInline.descriptor.data = [headers].concat(fileInline.descriptor.data);
                        _context.next = 20;
                        return fileInline.addSchema();

                      case 20:
                        file.descriptor.schema = fileInline.descriptor.schema;
                        _context.next = 66;
                        break;

                      case 23:
                        if (!(file.displayName === "FileRemote" && tabularFormats.includes(file.descriptor.format))) {
                          _context.next = 42;
                          break;
                        }

                        _context.prev = 24;
                        _context.next = 27;
                        return file.rows({
                          size: 100,
                          keyed: true
                        });

                      case 27:
                        rowStream = _context.sent;
                        _context.next = 30;
                        return toArray(rowStream);

                      case 30:
                        data = _context.sent;

                        if (data.length > 0) {
                          file.descriptor.data = data; // This makes it FileInline
                        } else {
                          file.descriptor.unavailable = true;
                        }

                        _context.next = 34;
                        return file.addSchema();

                      case 34:
                        _context.next = 40;
                        break;

                      case 36:
                        _context.prev = 36;
                        _context.t0 = _context["catch"](24);
                        console.warn(_context.t0);
                        file.descriptor.unavailable = true;

                      case 40:
                        _context.next = 66;
                        break;

                      case 42:
                        if (!file.descriptor.format.toLowerCase().includes('json')) {
                          _context.next = 61;
                          break;
                        }

                        _context.next = 45;
                        return fetch(file.descriptor.path);

                      case 45:
                        _response = _context.sent;

                        if (_response.ok) {
                          _context.next = 49;
                          break;
                        }

                        file.descriptor.unavailable = true;
                        return _context.abrupt("return");

                      case 49:
                        _context.next = 51;
                        return _response.json();

                      case 51:
                        _result = _context.sent;
                        // The '.json' files can contain geo data - check by its 'type' property
                        geoJsonTypes = ['Feature', 'FeatureCollection', 'Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon', 'GeometryCollection'];

                        if (!geoJsonTypes.includes(_result.type)) {
                          _context.next = 57;
                          break;
                        }

                        file.descriptor.data = _result;
                        _context.next = 59;
                        break;

                      case 57:
                        // It isn't a valid GeoJSON
                        file.descriptor.unavailable = true;
                        return _context.abrupt("return");

                      case 59:
                        _context.next = 66;
                        break;

                      case 61:
                        if (!(file.descriptor.format.toLowerCase() === 'pdf')) {
                          _context.next = 65;
                          break;
                        }

                        return _context.abrupt("return");

                      case 65:
                        // We can't load any other data types for now.
                        file.descriptor.unavailable = true;

                      case 66:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[24, 36]]);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }()));

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
    }, _callee2, null, [[2, 11]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;