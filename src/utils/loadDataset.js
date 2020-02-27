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
        // Remove fields that start with `_` as we don't want to display internal values,
        // e.g., `_id`, `_full_text` and `_count`
        file.descriptor.data = result.result.records.map(({ _id, _full_text, _count, ...etc }, index) => {
          if (file.descriptor.schema) {
            // If schema exists, use it to order columns. This is needed since order
            // of columns shuffled when calling `datastore_search_sql` API vs `datastore_search`.
            const ordered = {}
            file.descriptor.schema.fields.forEach(field => {
              ordered[field.name] = etc[field.name]
              // If field display attributes exist (these can be custom, eg, in
              // EDS, we use 'size' attribute which isn't part of tableschema spec)
              // use it to alter the data for presentation. Eg, "100.2312313" => "100.23".
              const fieldSize = field.size || field.constraints && field.constraints.size
              if (fieldSize) {
                const sizeParts = fieldSize.toString().split('.')
                if (sizeParts[1]) {
                  sizeParts[1] = parseInt(sizeParts[1])
                  ordered[field.name] = (Math.round(ordered[field.name] * 100) / 100).toFixed(sizeParts[1])
                } else {
                  sizeParts[0] = parseInt(sizeParts[0])
                  ordered[field.name] = ordered[field.name] && ordered[field.name].toString().slice(0, sizeParts[0])
                  if (field.type === 'integer') {
                    ordered[field.name] = parseInt(ordered[field.name])
                  } else if (field.type === 'number') {
                    ordered[field.name] = parseFloat(ordered[field.name])
                  }
                }
              }
              ordered[field.name] = ordered[field.name]
                ? ordered[field.name].toLocaleString() // Apply thousand separator to numbers
                : ordered[field.name]
            })
            return ordered
          }
          return etc
        })
        if (result.result.records.length === 0) {
          file.descriptor.totalrowcount = 0
        } else {
          file.descriptor.totalrowcount = result.result.total || result.result.records[0]._count
        }
        // Infer schema but re-open the file as it is now "inlined":
        const fileInline = open({
          data: file.descriptor.data.map(Object.values),
          format: 'csv'
        })
        const headers = Object.keys(file.descriptor.data[0] || {})
        fileInline.descriptor.data = [headers].concat(fileInline.descriptor.data)
        if (!file.descriptor.schema) {
          await fileInline.addSchema()
          file.descriptor.schema = fileInline.descriptor.schema
        }
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
