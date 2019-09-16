"use strict";

var _loadDataset = _interopRequireDefault(require("./loadDataset"));

var _inlinedData = _interopRequireDefault(require("../testData/inlinedData.json"));

var _datapackageRender = require("datapackage-render");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

it('compiles views!',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var loadedView;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _loadDataset.default)(_inlinedData.default);

        case 2:
          loadedView = _context.sent;
          // We expect 'resources' key to be defined in the compiled view:
          expect(loadedView.resources).toBeDefined();
          expect(loadedView.resources).toBeInstanceOf(Array);
          expect(loadedView.resources[0]).toBeInstanceOf(Object);
          expect(loadedView.resources[0].data).toBeInstanceOf(Array);
          expect(loadedView.resources[0].data.length).toBe(3);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));