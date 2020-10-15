/**
 * Counts rows in a SQL query (removes limit). Counts rows using Index Only Scan
 * for queries having no WHERE clause.
 *
 * @param datapackage package descriptor, gets mutated
 */
async function countRows(datapackage) {

  const apiUrl = datapackage.resources[0].api
  const name = datapackage.resources[0].name

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

    datapackage.resources[0].totalrowcount = rowCountResponseJson.result.records[0]._count

    return datapackage
  } catch (e) {
    console.error(e)
    return '-'
  }
}

export {countRows}