import {initTranslations} from './i18n/i18n'
import React from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import App from './AppWithProvider'

import * as serviceWorker from './serviceWorker';

// Define specs for URL parameter-based loading
const specs = {
  table: {
    "widgets": [
      {
        "name": "Table",
        "active": true,
        "datapackage": {
          "views": [
            {
              "id": "1",
              "specType": "table"
            }
          ]
        }
      }
    ],
    "datapackage": {
      "name": "sample-csv",
      "resources": [
        {
          "name": "sample",
          "path": "https://raw.githubusercontent.com/datapackage-examples/sample-csv/master/sample.csv",
          "format": "csv",
          "schema": {
            "fields": [
              {"name": "header 0", "type": "string"},
              {"name": "header 1", "type": "string"},
              {"name": "header 2", "type": "string"},
              {"name": "header 3", "type": "string"},
              {"name": "header 4", "type": "string"},
              {"name": "header 5", "type": "string"},
              {"name": "header 6", "type": "string"},
              {"name": "header 7", "type": "string"},
              {"name": "header 8", "type": "string"},
              {"name": "header 9", "type": "string"}
            ]
          }
        }
      ],
      "views": [
        {
          "id": 1,
          "specType": "table",
          "resources": ["sample"]
        }
      ]
    }
  },
  chart: {
    "widgets": [
      {
        "name": "Chart",
        "active": true,
        "datapackage": {
          "views": [
            {
              "id": "2",
              "specType": "simple"
            }
          ]
        }
      }
    ],
    "datapackage": {
      "name": "sample-csv",
      "resources": [
        {
          "name": "sample",
          "path": "https://raw.githubusercontent.com/datapackage-examples/sample-csv/master/sample.csv",
          "format": "csv",
          "schema": {
            "fields": [
              {"name": "header 0", "type": "string"},
              {"name": "header 1", "type": "string"},
              {"name": "header 2", "type": "string"},
              {"name": "header 3", "type": "string"},
              {"name": "header 4", "type": "string"},
              {"name": "header 5", "type": "string"},
              {"name": "header 6", "type": "string"},
              {"name": "header 7", "type": "string"},
              {"name": "header 8", "type": "string"},
              {"name": "header 9", "type": "string"}
            ]
          }
        }
      ],
      "views": [
        {
          "id": 2,
          "specType": "simple",
          "resources": ["sample"]
        }
      ]
    }
  },
  map: {
    "widgets": [
      {
        "name": "Table",
        "active": true,
        "datapackage": {
          "views": [
            {
              "id": "map-example-1",
              "specType": "table"
            }
          ]
        }
      },
      {
        "name": "Chart",
        "active": false,
        "datapackage": {
          "views": [
            {
              "id": "map-example-1",
              "specType": "simple"
            }
          ]
        }
      },
      {
        "name": "Map",
        "active": false,
        "datapackage": {
          "views": [
            {
              "id": "map-example-1",
              "specType": "tabularmap"
            }
          ]
        }
      }
    ],
    "datapackage": {
      "resources": [
        {
          "views": [
            {
              "description": "European cities with coordinates",
              "title": "European Cities Map",
              "resource_id": "cities-resource",
              "view_type": "recline_view",
              "id": "map-example-1",
              "package_id": "cities-package",
              "specType": "dataExplorer",
              "resources": ["sample"],
              "spec": {
                "widgets": [
                  {"specType": "table"},
                  {"specType": "simple"},
                  {"specType": "tabularmap"}
                ]
              }
            }
          ],
          "schema": {
            "fields": [
              {"name": "header 0", "type": "string"},
              {"name": "header 1", "type": "string"},
              {"name": "header 2", "type": "string"},
              {"name": "header 3", "type": "string"},
              {"name": "header 4", "type": "string"},
              {"name": "header 5", "type": "string"},
              {"name": "header 6", "type": "string"},
              {"name": "header 7", "type": "string"},
              {"name": "header 8", "type": "string"},
              {"name": "header 9", "type": "string"}
            ]
          },
          "mimetype": "text/csv",
          "cache_url": null,
          "hash": "",
          "description": "Sample data of European cities with coordinates",
          "name": "sample",
          "format": "csv",
          "datastore_active": false,
          "package_id": "sample-package",
          "created": "2024-01-01T00:00:00.000000",
          "state": "active",
          "mimetype_inner": null,
          "last_modified": "2024-01-01T00:00:00.000000",
          "position": 0,
          "revision_id": "sample-rev-1",
          "url_type": "upload",
          "id": "sample-resource",
          "resource_type": null,
          "size": null,
          "title": "Sample Data",
          "path": "https://raw.githubusercontent.com/datapackage-examples/sample-csv/master/sample.csv",
          "descriptionHtml": "<p>Sample CSV data for demonstration</p>\n",
          "api": null,
          "totalrowcount": 1000
        }
      ]
    }
  },
  querybuilder: {
    "widgets": [
      {
        "name": "Table",
        "active": true,
        "datapackage": {
          "views": [
            {
              "id": "qb-example-1",
              "specType": "table"
            }
          ]
        }
      }
    ],
    "datapackage": {
      "resources": [
        {
          "views": [
            {
              "description": "Query Builder demonstration with mock datastore",
              "title": "Query Builder Demo",
              "resource_id": "qb-resource",
              "view_type": "recline_view",
              "id": "qb-example-1",
              "package_id": "qb-package",
              "specType": "table",
              "resources": ["qb-data"]
            }
          ],
          "schema": {
            "fields": [
              {"name": "id", "type": "integer"},
              {"name": "name", "type": "string"},
              {"name": "age", "type": "integer"},
              {"name": "city", "type": "string"},
              {"name": "country", "type": "string"}
            ]
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
          "data": [
            {"id": 1, "name": "John", "age": 25, "city": "London", "country": "UK"},
            {"id": 2, "name": "Jane", "age": 30, "city": "Paris", "country": "France"},
            {"id": 3, "name": "Bob", "age": 35, "city": "Berlin", "country": "Germany"},
            {"id": 4, "name": "Alice", "age": 28, "city": "Madrid", "country": "Spain"},
            {"id": 5, "name": "Charlie", "age": 32, "city": "Rome", "country": "Italy"}
          ]
        }
      ]
    }
  }
};

const instances = document.getElementsByClassName('data-explorer')

initTranslations().then(() => {
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
      const { datapackage, ...rest } = specData;
      
      ReactDOM.render(
        <App datapackage={datapackage} {...rest} />, div
      );
      
      // Update title
      document.title = `Data Explorer - ${spec.charAt(0).toUpperCase() + spec.slice(1)} View`;
      return;
    }
  }
  
  // Normal processing for existing data-explorer instances
  for (const instance of instances) {
    try {
      const props = JSON.parse(instance.getAttribute('data-datapackage'))
      const { datapackage, ...rest} = props

      ReactDOM.render(
        <App datapackage={datapackage} {...rest} />, document.getElementById(instance.id)
      )
    } catch (e) {
      console.warn('Failed to render data-explorer', e)
    }
  }
})

serviceWorker.unregister();
