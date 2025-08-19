"use strict";

var _i18n = require("./i18n/i18n");
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
require("./App.css");
var _AppWithProvider = _interopRequireDefault(require("./AppWithProvider"));
var serviceWorker = _interopRequireWildcard(require("./serviceWorker"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Define specs for URL parameter-based loading
const specs = {
  table: {
    "widgets": [{
      "name": "Table",
      "active": true,
      "datapackage": {
        "views": [{
          "id": "7bc09bd3-c327-42d6-88ab-a8a2aef2a83e",
          "specType": "table"
        }]
      }
    }],
    "datapackage": {
      "resources": [{
        "views": [{
          "description": "",
          "title": "Data Explorer",
          "resource_id": "c08419f5-a28d-4e35-87a4-676d7eb05713",
          "view_type": "recline_view",
          "id": "7bc09bd3-c327-42d6-88ab-a8a2aef2a83e",
          "package_id": "025b9417-83a0-445b-a818-414ea49cf7c3",
          "specType": "",
          "resources": ["weekly_operational_planning_margin_requirement_(opmr)"],
          "spec": {
            "widgets": [{
              "specType": "table"
            }, {
              "specType": "simple"
            }, {
              "specType": "tabularmap"
            }]
          }
        }],
        "schema": {
          "fields": [{
            "name": "ENG.Week",
            "type": "string"
          }, {
            "name": "ENG.Year",
            "type": "string"
          }, {
            "name": "Publish Date",
            "type": "string"
          }, {
            "name": "Peak Demand Forecast",
            "type": "number"
          }, {
            "name": "Generator Availability",
            "type": "number"
          }, {
            "name": "Maximum I/C Import",
            "type": "number"
          }, {
            "name": "Maximum I/C Export",
            "type": "number"
          }, {
            "name": "Generation Availability Margin",
            "type": "number"
          }, {
            "name": "Operating Reserve provided by I/Cs",
            "type": "number"
          }, {
            "name": "OPMR total",
            "type": "number"
          }, {
            "name": "Constrained Plant",
            "type": "number"
          }, {
            "name": "National Surplus",
            "type": "number"
          }, {
            "name": "Minimum Demand Forecast",
            "type": "number"
          }, {
            "name": "High Freq Response Requirement",
            "type": "number"
          }, {
            "name": "Negative Reserve",
            "type": "number"
          }]
        },
        "package_id": "025b9417-83a0-445b-a818-414ea49cf7c3",
        "datastore_active": true,
        "id": "c08419f5-a28d-4e35-87a4-676d7eb05713",
        "state": "active",
        "hash": "",
        "description": "The weekly Operational Planning Margin Requirement (OPMR) is published on a weekly basis and contains a view of 2-52 weeks ahead forecast for the OPMR.",
        "name": "weekly_operational_planning_margin_requirement_(opmr)",
        "title": "Weekly Operational Planning Margin Requirement (OPMR)",
        "path": "https://api.neso.energy/dataset/025b9417-83a0-445b-a818-414ea49cf7c3/resource/c08419f5-a28d-4e35-87a4-676d7eb05713/download/csv_opmr_weekly.csv",
        "descriptionHtml": "<p>The weekly Operational Planning Margin Requirement (OPMR) is published on a weekly basis and contains a view of 2-52 weeks ahead forecast for the OPMR.</p>",
        "api": "https://api.neso.energy/api/3/action/datastore_search?resource_id=c08419f5-a28d-4e35-87a4-676d7eb05713&sort=_id+asc",
        "totalrowcount": 500
      }]
    }
  },
  chart: {
    "widgets": [{
      "name": "Chart",
      "active": true,
      "datapackage": {
        "views": [{
          "id": "2",
          "specType": "simple"
        }]
      }
    }],
    "datapackage": {
      "name": "sample-csv",
      "resources": [{
        "name": "sample",
        "path": "https://raw.githubusercontent.com/datapackage-examples/sample-csv/master/sample.csv",
        "format": "csv",
        "schema": {
          "fields": [{
            "name": "header 0",
            "type": "string"
          }, {
            "name": "header 1",
            "type": "string"
          }, {
            "name": "header 2",
            "type": "string"
          }, {
            "name": "header 3",
            "type": "string"
          }, {
            "name": "header 4",
            "type": "string"
          }, {
            "name": "header 5",
            "type": "string"
          }, {
            "name": "header 6",
            "type": "string"
          }, {
            "name": "header 7",
            "type": "string"
          }, {
            "name": "header 8",
            "type": "string"
          }, {
            "name": "header 9",
            "type": "string"
          }]
        }
      }],
      "views": [{
        "id": 2,
        "specType": "simple",
        "resources": ["sample"]
      }]
    }
  },
  map: {
    "widgets": [{
      "name": "Table",
      "active": true,
      "datapackage": {
        "views": [{
          "id": "map-example-1",
          "specType": "table"
        }]
      }
    }, {
      "name": "Chart",
      "active": false,
      "datapackage": {
        "views": [{
          "id": "map-example-1",
          "specType": "simple"
        }]
      }
    }, {
      "name": "Map",
      "active": false,
      "datapackage": {
        "views": [{
          "id": "map-example-1",
          "specType": "tabularmap"
        }]
      }
    }],
    "datapackage": {
      "resources": [{
        "views": [{
          "description": "",
          "title": "Data Explorer",
          "resource_id": "c08419f5-a28d-4e35-87a4-676d7eb05713",
          "view_type": "recline_view",
          "id": "map-example-1",
          "package_id": "025b9417-83a0-445b-a818-414ea49cf7c3",
          "specType": "",
          "resources": ["weekly_operational_planning_margin_requirement_(opmr)"],
          "spec": {
            "widgets": [{
              "specType": "table"
            }, {
              "specType": "simple"
            }, {
              "specType": "tabularmap"
            }]
          }
        }],
        "schema": {
          "fields": [{
            "name": "ENG.Week",
            "type": "string"
          }, {
            "name": "ENG.Year",
            "type": "string"
          }, {
            "name": "Publish Date",
            "type": "string"
          }, {
            "name": "Peak Demand Forecast",
            "type": "number"
          }, {
            "name": "Generator Availability",
            "type": "number"
          }, {
            "name": "Maximum I/C Import",
            "type": "number"
          }, {
            "name": "Maximum I/C Export",
            "type": "number"
          }, {
            "name": "Generation Availability Margin",
            "type": "number"
          }, {
            "name": "Operating Reserve provided by I/Cs",
            "type": "number"
          }, {
            "name": "OPMR total",
            "type": "number"
          }, {
            "name": "Constrained Plant",
            "type": "number"
          }, {
            "name": "National Surplus",
            "type": "number"
          }, {
            "name": "Minimum Demand Forecast",
            "type": "number"
          }, {
            "name": "High Freq Response Requirement",
            "type": "number"
          }, {
            "name": "Negative Reserve",
            "type": "number"
          }]
        },
        "package_id": "025b9417-83a0-445b-a818-414ea49cf7c3",
        "datastore_active": true,
        "id": "c08419f5-a28d-4e35-87a4-676d7eb05713",
        "state": "active",
        "hash": "",
        "description": "The weekly Operational Planning Margin Requirement (OPMR) is published on a weekly basis and contains a view of 2-52 weeks ahead forecast for the OPMR.",
        "name": "weekly_operational_planning_margin_requirement_(opmr)",
        "title": "Weekly Operational Planning Margin Requirement (OPMR)",
        "path": "https://api.neso.energy/dataset/025b9417-83a0-445b-a818-414ea49cf7c3/resource/c08419f5-a28d-4e35-87a4-676d7eb05713/download/csv_opmr_weekly.csv",
        "descriptionHtml": "<p>The weekly Operational Planning Margin Requirement (OPMR) is published on a weekly basis and contains a view of 2-52 weeks ahead forecast for the OPMR.</p>",
        "api": "https://api.neso.energy/api/3/action/datastore_search?resource_id=c08419f5-a28d-4e35-87a4-676d7eb05713&sort=_id+asc",
        "totalrowcount": 500
      }]
    }
  },
  querybuilder: {
    "widgets": [{
      "name": "Table",
      "active": true,
      "datapackage": {
        "views": [{
          "id": "qb-example-1",
          "specType": "table"
        }]
      }
    }],
    "datapackage": {
      "resources": [{
        "views": [{
          "description": "Query Builder demonstration with mock datastore",
          "title": "Query Builder Demo",
          "resource_id": "qb-resource",
          "view_type": "recline_view",
          "id": "qb-example-1",
          "package_id": "qb-package",
          "specType": "table",
          "resources": ["qb-data"]
        }],
        "schema": {
          "fields": [{
            "name": "id",
            "type": "integer"
          }, {
            "name": "name",
            "type": "string"
          }, {
            "name": "age",
            "type": "integer"
          }, {
            "name": "city",
            "type": "string"
          }, {
            "name": "country",
            "type": "string"
          }]
        },
        "mimetype": "text/csv",
        "cache_url": null,
        "hash": "",
        "description": "Mock data for Query Builder testing",
        "name": "qb-data",
        "format": "csv",
        "datastore_active": true,
        "package_id": "qb-package",
        "created": "2024-01-01T00:00:00.000000",
        "state": "active",
        "mimetype_inner": null,
        "last_modified": "2024-01-01T00:00:00.000000",
        "position": 0,
        "revision_id": "qb-rev-1",
        "url_type": "upload",
        "id": "qb-resource",
        "resource_type": null,
        "size": null,
        "title": "Query Builder Demo Data",
        "path": "https://raw.githubusercontent.com/datapackage-examples/sample-csv/master/sample.csv",
        "descriptionHtml": "<p>Demo data for Query Builder (Note: Real filtering requires datastore API)</p>\n",
        "api": "https://raw.githubusercontent.com/datapackage-examples/sample-csv/master/sample.csv",
        "totalrowcount": 50,
        "data": [{
          "id": 1,
          "name": "John",
          "age": 25,
          "city": "London",
          "country": "UK"
        }, {
          "id": 2,
          "name": "Jane",
          "age": 30,
          "city": "Paris",
          "country": "France"
        }, {
          "id": 3,
          "name": "Bob",
          "age": 35,
          "city": "Berlin",
          "country": "Germany"
        }, {
          "id": 4,
          "name": "Alice",
          "age": 28,
          "city": "Madrid",
          "country": "Spain"
        }, {
          "id": 5,
          "name": "Charlie",
          "age": 32,
          "city": "Rome",
          "country": "Italy"
        }]
      }]
    }
  }
};
const instances = document.getElementsByClassName('data-explorer');
(0, _i18n.initTranslations)().then(() => {
  // If no data-explorer instances exist, check for URL parameters
  if (instances.length === 0) {
    const urlParams = new URLSearchParams(window.location.search);
    const spec = urlParams.get('spec');
    if (spec && specs[spec]) {
      // Create a data-explorer div
      const div = document.createElement('div');
      div.className = 'data-explorer';
      div.id = 'data-explorer-1';
      document.body.appendChild(div);

      // Render the spec
      const specData = specs[spec];
      const {
        datapackage,
        ...rest
      } = specData;
      _reactDom.default.render(/*#__PURE__*/_react.default.createElement(_AppWithProvider.default, _extends({
        datapackage: datapackage
      }, rest)), div);

      // Update title
      document.title = `Data Explorer - ${spec.charAt(0).toUpperCase() + spec.slice(1)} View`;
      return;
    }
  }

  // Normal processing for existing data-explorer instances
  for (const instance of instances) {
    try {
      const props = JSON.parse(instance.getAttribute('data-datapackage'));
      const {
        datapackage,
        ...rest
      } = props;
      _reactDom.default.render(/*#__PURE__*/_react.default.createElement(_AppWithProvider.default, _extends({
        datapackage: datapackage
      }, rest)), document.getElementById(instance.id));
    } catch (e) {
      console.warn('Failed to render data-explorer', e);
    }
  }
});
serviceWorker.unregister();