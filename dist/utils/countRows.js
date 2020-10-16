"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countRows = countRows;

/**
 * Counts rows in a SQL query (removes limit). Counts rows using Index Only Scan
 * for queries having no WHERE clause.
 *
 * @param datapackage package descriptor, gets mutated
 */
function countRows(datapackage) {
  var apiUrl, name, rowCountSql, originalSqlNoLimit, rowCountResponse, rowCountResponseJson;
  return regeneratorRuntime.async(function countRows$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          apiUrl = datapackage.resources[0].api;
          name = datapackage.resources[0].name;
          console.log("api: " + apiUrl);
          _context.prev = 3;

          if (apiUrl && apiUrl.includes('WHERE')) {
            originalSqlNoLimit = apiUrl.replace(/.*sql=/gi, '').replace(/LIMIT.*/gi, '');
            rowCountSql = "SELECT COUNT(*) AS _count FROM (".concat(originalSqlNoLimit, ") t");
          } else {
            // this query is for optimizing the row-count calculation for non-filtered data only
            // more on how it works here https://www.citusdata.com/blog/2016/10/12/count-performance/#distinct_counts_exact_index
            rowCountSql = "SELECT COUNT(*) AS _count FROM (SELECT DISTINCT \"_id\" FROM \"".concat(name, "\") t");
          } // console.log(`rowCountSql: ` + rowCountSql)


          _context.next = 7;
          return regeneratorRuntime.awrap(fetch(apiUrl.replace(/sql=.*/gi, "sql=".concat(rowCountSql))));

        case 7:
          rowCountResponse = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(rowCountResponse.json());

        case 10:
          rowCountResponseJson = _context.sent;
          datapackage.resources[0].totalrowcount = rowCountResponseJson.result.records[0]._count;
          return _context.abrupt("return", datapackage);

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](3);
          console.error(_context.t0);
          return _context.abrupt("return", '-');

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 15]]);
}