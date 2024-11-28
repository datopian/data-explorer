import App from '../../src/AppWithProvider'

const datapackage = {
  "widgets": [
    {
      "name": "Table",
      "active": true,
      "datapackage": {
        "views": [
          {
            "id": "7bc09bd3-c327-42d6-88ab-a8a2aef2a83e",
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
            "id": "7bc09bd3-c327-42d6-88ab-a8a2aef2a83e",
            "specType": "simple"
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
            "description": "",
            "title": "Data Explorer",
            "resource_id": "c08419f5-a28d-4e35-87a4-676d7eb05713",
            "view_type": "recline_view",
            "id": "7bc09bd3-c327-42d6-88ab-a8a2aef2a83e",
            "package_id": "025b9417-83a0-445b-a818-414ea49cf7c3",
            "specType": "",
            "resources": [
              "weekly_operational_planning_margin_requirement_(opmr)"
            ],
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
            }
          }
        ],
        "schema": {
          "fields": [
            {
              "name": "ENG.Week",
              "type": "",
              "constraints": {},
              "comment": "",
              "description": "",
              "title": "",
              "example": "",
              "unit": ""
            },
            {
              "name": "ENG.Year",
              "type": "",
              "constraints": {},
              "comment": "",
              "description": "",
              "title": "",
              "example": "",
              "unit": ""
            },
            {
              "name": "Publish Date",
              "type": "",
              "constraints": {},
              "comment": "",
              "description": "",
              "title": "",
              "example": "",
              "unit": ""
            },
            {
              "name": "Peak Demand Forecast",
              "type": "",
              "constraints": {},
              "comment": "",
              "description": "",
              "title": "",
              "example": "",
              "unit": ""
            },
            {
              "name": "Generator Availability",
              "type": "",
              "constraints": {},
              "comment": "",
              "description": "",
              "title": "",
              "example": "",
              "unit": ""
            },
            {
              "name": "Maximum I\\/C Import",
              "type": "",
              "constraints": {},
              "comment": "",
              "description": "",
              "title": "",
              "example": "",
              "unit": ""
            },
            {
              "name": "Maximum I\\/C Export",
              "type": "",
              "constraints": {},
              "comment": "",
              "description": "",
              "title": "",
              "example": "",
              "unit": ""
            },
            {
              "name": "Generation Availability Margin",
              "type": "",
              "constraints": {},
              "comment": "",
              "description": "",
              "title": "",
              "example": "",
              "unit": ""
            },
            {
              "name": "Operating Reserve provided by I\\/Cs",
              "type": "",
              "constraints": {},
              "comment": "",
              "description": "",
              "title": "",
              "example": "",
              "unit": ""
            },
            {
              "name": "OPMR total",
              "type": "",
              "constraints": {},
              "comment": "",
              "description": "",
              "title": "",
              "example": "",
              "unit": ""
            },
            {
              "name": "Constrained Plant",
              "type": "",
              "constraints": {},
              "comment": "",
              "description": "",
              "title": "",
              "example": "",
              "unit": ""
            },
            {
              "name": "National Surplus",
              "type": "",
              "constraints": {},
              "comment": "",
              "description": "",
              "title": "",
              "example": "",
              "unit": ""
            },
            {
              "name": "Minimum Demand Forecast",
              "type": "",
              "constraints": {},
              "comment": "",
              "description": "",
              "title": "",
              "example": "",
              "unit": ""
            },
            {
              "name": "High Freq Response Requirement",
              "type": "",
              "constraints": {},
              "comment": "",
              "description": "",
              "title": "",
              "example": "",
              "unit": ""
            },
            {
              "name": "Negative Reserve",
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
        "package_id": "025b9417-83a0-445b-a818-414ea49cf7c3",
        "datastore_active": true,
        "id": "c08419f5-a28d-4e35-87a4-676d7eb05713",
        "state": "active",
        "hash": "",
        "description": "The weekly Operational Planning Margin Requirement (OPMR) is published on a weekly basis and contains a view of 2-52 weeks ahead forecast for the OPMR. ",
        "name": "weekly_operational_planning_margin_requirement_(opmr)",
        "title": "Weekly Operational Planning Margin Requirement (OPMR)",
        "path": "https://api.neso.energy/dataset/025b9417-83a0-445b-a818-414ea49cf7c3/resource/c08419f5-a28d-4e35-87a4-676d7eb05713/download/csv_opmr_weekly.csv",
        "descriptionHtml": "<p>The weekly Operational Planning Margin Requirement (OPMR) is published on a weekly basis and contains a view of 2-52 weeks ahead forecast for the OPMR. <\\/p>\\n",
        "api": "https://api.neso.energy/api/3/action/datastore_search?resource_id=c08419f5-a28d-4e35-87a4-676d7eb05713&sort=_id+asc"
      }
    ]
  }
}

const d = {
  "widgets": [
    {
      "name": "Table",
      "active": true,
      "datapackage": {
        "views": [
          {
            "id": "efb000e4-0123-4067-8d3a-901119762e0a",
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
            "id": "efb000e4-0123-4067-8d3a-901119762e0a",
            "specType": "simple"
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
            "description": "",
            "title": "Data Explorer",
            "resource_id": "0e5fde43-2de7-4fb4-833d-c7bca3b658b0",
            "view_type": "recline_view",
            "id": "efb000e4-0123-4067-8d3a-901119762e0a",
            "package_id": "f406810a-1a36-48d2-b542-1dfb1348096e",
            "specType": "",
            "resources": [
              "national_carbon_intensity_forecast"
            ],
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
            }
          }
        ],
        "schema": {
          "fields": [
            {
              "name": "datetime",
              "type": "datetime",
              "constraints": {},
              "comment": "",
              "description": "Timestamp of record, given in UTC (Coordinated Universal Time).",
              "title": "Date & Time",
              "example": "2018-01-01T01:30:00",
              "unit": ""
            },
            {
              "name": "forecast",
              "type": "number",
              "constraints": {},
              "comment": "",
              "description": "Forecast national carbon intensity, predicted using machine learning models. Forecast values are given in gCO2\\/kWh. ",
              "title": "Forecast Carbon Intensity",
              "example": "159",
              "unit": "gCO2\\/kWh"
            },
            {
              "name": "actual",
              "type": "number",
              "constraints": {},
              "comment": "",
              "description": "Actual national carbon intensity, estimated from metered generation. Actual values are given in gCO2\\/kWh. ",
              "title": "Actual Carbon Intensity",
              "example": "170",
              "unit": "gCO2\\/kWh"
            },
            {
              "name": "index",
              "type": "string",
              "constraints": {},
              "comment": "",
              "description": "Index describing the relative level of the carbon intensity. ",
              "title": "Index",
              "example": "very low",
              "unit": ""
            }
          ]
        },
        "package_id": "f406810a-1a36-48d2-b542-1dfb1348096e",
        "datastore_active": true,
        "id": "0e5fde43-2de7-4fb4-833d-c7bca3b658b0",
        "state": "active",
        "hash": "",
        "description": "National carbon intensity forecast for the GB electricity system.",
        "name": "national_carbon_intensity_forecast",
        "title": "National Carbon Intensity Forecast",
        "path": "https://api.neso.energy/dataset/f406810a-1a36-48d2-b542-1dfb1348096e/resource/0e5fde43-2de7-4fb4-833d-c7bca3b658b0/download/gb_carbon_intensity.csv",
        "descriptionHtml": "<p>National carbon intensity forecast for the GB electricity system.<\\/p>\\n",
        "api": "https://api.neso.energy/api/3/action/datastore_search?resource_id=0e5fde43-2de7-4fb4-833d-c7bca3b658b0&sort=_id+asc"
      }
    ]
  }
}
export default {
  component: App,
  props: { widgets: datapackage.widgets, datapackage: JSON.stringify(datapackage.datapackage) }
}


