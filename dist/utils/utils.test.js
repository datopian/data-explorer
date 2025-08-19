"use strict";

var _loadDataset = _interopRequireDefault(require("./loadDataset"));
var _inlinedData = _interopRequireDefault(require("../testData/inlinedData.json"));
var _datapackageRender = require("datapackage-render");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
it('compiles views!', async () => {
  const loadedView = await (0, _loadDataset.default)(_inlinedData.default);
  // We expect 'resources' key to be defined in the compiled view:
  expect(loadedView.resources).toBeDefined();
  expect(loadedView.resources).toBeInstanceOf(Array);
  expect(loadedView.resources[0]).toBeInstanceOf(Object);
  expect(loadedView.resources[0].data).toBeInstanceOf(Array);
  expect(loadedView.resources[0].data.length).toBe(3);
});