import App from '../../src/AppWithProvider'

const widgets = [
  {
    "name": "Table",
    "active": true,
    "datapackage": {
      "views": [
        {
          "id": "99d0bf33-d313-41ec-84bf-7bce591b668b",
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
          "id": "99d0bf33-d313-41ec-84bf-7bce591b668b",
          "specType": "simple"
        }
      ]
    }
  }
]

const datapackage = {
    name: 'test',
    resources:[
      {
        "views": [
          {
            "description": "",
            "title": "Data Explorer",
            "resource_id": "a4cb1b3e-f5d5-435f-a937-a655868f4725",
            "view_type": "recline_view",
            "id": "99d0bf33-d313-41ec-84bf-7bce591b668b",
            "package_id": "7bf2e43d-1a24-4a0e-95b0-6ba4eba3daa9",
            "specType": "dataExplorer",
            "spec": {
              "widgets": [
                {
                  "specType": "table"
                },
                {
                  "specType": "simple"
                },
                {
                  "specType": "tabularmap"
                }
              ]
            },
            "resources": [
              "nsl-dayahead-20230823-001"
            ]
          }
        ],
        "schema": {
          "fields": [
            {
              "name": "datetime",
              "type": "",
              "constraints": {},
              "comment": "",
              "description": "",
              "title": "",
              "example": "",
              "unit": ""
            },
            {
              "name": "forecast",
              "type": "",
              "constraints": {},
              "comment": "",
              "description": "",
              "title": "",
              "example": "",
              "unit": ""
            },
            {
              "name": "actual",
              "type": "",
              "constraints": {},
              "comment": "",
              "description": "",
              "title": "",
              "example": "",
              "unit": ""
            },
            {
              "name": "index",
              "type": "",
              "constraints": {},
              "comment": "",
              "description": "",
              "title": "",
              "example": "",
              "unit": ""
            }
          ]
        },
        "package_id": "e01485d0-8d54-4301-ac36-ca18f527d5c2",
        "datastore_active": true,
        "id": "5c71a1bc-6fdf-43bc-8b7b-45a04a0201f8",
        "state": "active",
        "hash": "",
        "description": "National Carbon Intensity Forecast ",
        "name": "national_carbon_intensity_forecast_-_resource_update",
        "title": "National Carbon Intensity Forecast - resource_update",
        "path": "https://ckan.nationalgrid.staging.datopian.com/dataset/e01485d0-8d54-4301-ac36-ca18f527d5c2/resource/5c71a1bc-6fdf-43bc-8b7b-45a04a0201f8/download/gb_carbon_intensity.csv",
        "descriptionHtml": "<p>National Carbon Intensity Forecast </p>\n",
        "api": "https://ckan.nationalgrid.staging.datopian.com/api/3/action/datastore_search?resource_id=5c71a1bc-6fdf-43bc-8b7b-45a04a0201f8&sort=_id+asc"
      }
    ]
  }

export default {
  component: App,
  props: {widgets, datapackage: JSON.stringify(datapackage)}
}


