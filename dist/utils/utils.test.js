"use strict";

var _loadDataset = _interopRequireDefault(require("./loadDataset"));

var _inlinedData = _interopRequireDefault(require("../testData/inlinedData.json"));

var _datapackageRender = require("datapackage-render");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('compiles views!', function _callee() {
  var loadedView;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _loadDataset.default)(_inlinedData.default));

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
  });
});