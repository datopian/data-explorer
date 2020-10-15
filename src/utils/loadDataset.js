import { Dataset, open } from 'data.js'

var toArray = require('stream-to-array')

function parseDatapackageIdentifier(stringOrJSON) {
  try {
    return JSON.parse(stringOrJSON)
  } catch (e) {
    return stringOrJSON
  }
}


/**
 * Counts rows in a SQL query (removes limit). Counts rows using Index Only Scan
 * for queries having no WHERE clause.
 * 
 * @param {String} apiUrl should use datstore_search_sql and have teh initial query
 * @param {String} name table name / alias
 */
async function countRows(apiUrl, name) {
  console.log(`api: ` + apiUrl)

  try {

    let rowCountSql

    if (apiUrl && apiUrl.includes('WHERE')) {

      const originalSqlNoLimit = apiUrl
        .replace(/.*sql=/gi, '')
        .replace(/LIMIT.*/gi, '')
      rowCountSql = `SELECT COUNT(*) AS _count FROM (${originalSqlNoLimit}) t`

    } else {

      // this query is for optimizing the row-count calculation for non-filtered data only
      // more on how it works here https://www.citusdata.com/blog/2016/10/12/count-performance/#distinct_counts_exact_index
      rowCountSql = `SELECT COUNT(*) AS _count FROM (SELECT DISTINCT "_id" FROM "${name}") t`

    }

    // console.log(`rowCountSql: ` + rowCountSql)

    const rowCountResponse = await fetch(apiUrl.replace(/sql=.*/gi, `sql=${rowCountSql}`))
    const rowCountResponseJson = await rowCountResponse.json()
    return rowCountResponseJson.result.records[0]._count
  } catch (e) {
    console.error(e)
    return '-'
  }
}


// needs to be encapsulated
// should be library code
export default async dpID => {
  const DP_ID = parseDatapackageIdentifier(dpID)
  const tabularFormats = ['csv', 'tsv', 'dsv', 'xls', 'xlsx']

  try {
    const dataset = await Dataset.load(DP_ID)

    // console.log('dataset: ' + JSON.stringify(dataset, null, 2))

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
        // TODO: (maybe) remove _count (we don't use it in the query for data any longer)
        file.descriptor.data = result.result.records.map(({ _id, _full_text, _count, ...etc }, index) => {
          if (file.descriptor.schema) {
            // If schema exists, use it to order columns. This is needed since order
            // of columns shuffled when calling `datastore_search_sql` API vs `datastore_search`.
            const ordered = {}
            file.descriptor.schema.fields.forEach(field => {
              ordered[field.name] = etc[field.name]
            })
            return ordered
          }
          return etc
        })

        // TODO: move out of dataset loading action
        file.descriptor.totalrowcount = await countRows(file.descriptor.api, file.descriptor.name)

        if (!file.descriptor.schema) {
          // Infer schema but re-open the file as it is now "inlined":
          const fileInline = open({
            data: file.descriptor.data.map(Object.values),
            format: 'csv'
          })
          const headers = Object.keys(file.descriptor.data[0] || {})
          fileInline.descriptor.data = [headers].concat(fileInline.descriptor.data)
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
