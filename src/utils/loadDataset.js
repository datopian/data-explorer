import * as dpRender from 'datapackage-render'
import { Dataset } from 'data.js'

var toArray = require('stream-to-array')

function parseDatapackageIdentifier(stringOrJSON) {
  try {
    return JSON.parse(stringOrJSON)
  } catch (e) {
    return stringOrJSON
  }
}

function compile(descriptor) {
  return descriptor.views.map(view => {
    return dpRender.compileView(view, descriptor)
  })
}

// needs to be encapsulated
// should be library code
export default async dpID => { 
  console.log("DPID", dpID) 
  const DP_ID = parseDatapackageIdentifier(dpID)
  const tabularFormats = ['csv', 'tsv', 'dsv', 'xls', 'xlsx']

  try {
    const dataset = await Dataset.load(DP_ID)
    console.log('loadDataset-1', dataset)

    // TODO why is this happening here? This looks like library code
    // TODO clean up! this shouldn't handle mutation of descriptor along 
    //      side of fetching resources etc... a mess
    dataset.resources.forEach(async (file) => {
      if (file.displayName === 'FileInline') {
        return
      } else if (file.descriptor.path && file.descriptor.path.includes('datastore_search')) {
        // Datastore, e.g., when a path is a 'datastore_search' API
        const response = await fetch(file.descriptor.path)
        if (!response.ok) {
          file.descriptor.unavailable = true
          return
        }
        const result = await response.json()
        file.descriptor.data = result.result.records
      } else if (file.displayName === "FileRemote" && tabularFormats.includes(file.descriptor.format)) {
        // Tabular data
        try {
          const rowStream = await file.rows({size: 100, keyed: true})
          const data = await toArray(rowStream)
          if (data.length > 0) {
            file.descriptor.data = data // This makes it FileInline
          } else {
            file.descriptor.unavailable = true
          }
        } catch (e) {
          console.log(e)
          file.descriptor.unavailable = true
        }
      } else if (file.descriptor.format.toLowerCase().includes('json')) {
        // Geographical data
        const response = await fetch(file.descriptor.path)
        if (!response.ok) {
          file.descriptor.unavailable = true
          return
        }
        const result = await response.json()
        // The '.json' files can contain geo data - check by its 'type' property
        const geoJsonTypes = [
          'Feature', 'FeatureCollection', 'Point', 'MultiPoint', 'LineString',
          'MultiLineString', 'Polygon', 'MultiPolygon', 'GeometryCollection'
        ]
        if (geoJsonTypes.includes(result.type)) {
          file.descriptor.data = result
        } else {
          // It isn't a valid GeoJSON
          file.descriptor.unavailable = true
          return
        }
      } else if (file.descriptor.format.toLowerCase() === 'pdf') {
        return
      } else {
        // We can't load any other data types for now.
        file.descriptor.unavailable = true
      }
    })

    console.log('222', dataset)

    return compile(dataset.descriptor)
  } catch (e) {
    console.warn('Failed to load a Dataset from provided datapackage id\n' + e)
    return DP_ID
  }
}
