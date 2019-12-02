import { Dataset, open } from 'data.js'

var toArray = require('stream-to-array')

function parseDatapackageIdentifier(stringOrJSON) {
  try {
    return JSON.parse(stringOrJSON)
  } catch (e) {
    return stringOrJSON
  }
}

// needs to be encapsulated
// should be library code
export default async dpID => {
  const DP_ID = parseDatapackageIdentifier(dpID)
  const tabularFormats = ['csv', 'tsv', 'dsv', 'xls', 'xlsx']

  try {
    const dataset = await Dataset.load(DP_ID)

    await Promise.all(dataset.resources.map(async (file) => {
      if (file.displayName === 'FileInline') {
        return
      } else if (file.descriptor.api && file.descriptor.api.includes('datastore_search')) {
        // Datastore, e.g., when a path is a 'datastore_search' API
        const response = await fetch(file.descriptor.api)
        if (!response.ok) {
          file.descriptor.unavailable = true
          return
        }
        const result = await response.json()
        file.descriptor.data = result.result.records
        file.descriptor.totalrowcount = result.result.total;
        // Infer schema but re-open the file as it is now "inlined":
        const fileInline = open({
          data: file.descriptor.data.map(Object.values),
          format: 'csv'
        })
        const headers = Object.keys(file.descriptor.data[0])
        fileInline.descriptor.data = [headers].concat(fileInline.descriptor.data)
        await fileInline.addSchema()
        file.descriptor.schema = fileInline.descriptor.schema
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
          await file.addSchema()
        } catch (e) {
          console.warn(e)
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
    }))

    return dataset.descriptor
  } catch (e) {
    console.warn('Failed to load a Dataset from provided datapackage id\n' + e)
    return DP_ID
  }
}
