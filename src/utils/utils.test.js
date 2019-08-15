import loadDataset from './loadDataset';
import inlinedDataset from '../testData/inlinedData.json'


it('compiles views!', async () => {
  const compiledView = await loadDataset(inlinedDataset)
  // We expect 'resources' key to be defined in the compiled view:
  expect(compiledView[0].resources).toBeDefined()
  expect(compiledView[0].resources).toBeInstanceOf(Array)
  expect(compiledView[0].resources[0]).toBeInstanceOf(Object)
  expect(compiledView[0].resources[0].data).toBeInstanceOf(Array)
  expect(compiledView[0].resources[0].data.length).toBe(3)
});
