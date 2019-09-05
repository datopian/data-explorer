import loadDataset from './loadDataset';
import inlinedDataset from '../testData/inlinedData.json'
import { compileView } from 'datapackage-render';

it('compiles views!', async () => {
  const loadedView = await loadDataset(inlinedDataset)
  // We expect 'resources' key to be defined in the compiled view:
  expect(loadedView.resources).toBeDefined()
  expect(loadedView.resources).toBeInstanceOf(Array)
  expect(loadedView.resources[0]).toBeInstanceOf(Object)
  expect(loadedView.resources[0].data).toBeInstanceOf(Array)
  expect(loadedView.resources[0].data.length).toBe(3)
});
