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
              "name": "Sett_Date",
              "type": "date",
              "constraints": {},
              "comment": "Settlement Date",
              "description": "The date of the metering",
              "title": "Sett_Date",
              "example": "01/04/2019",
              "unit": "Date"
            },
            {
              "name": "Sett_Period",
              "type": "integer",
              "constraints": {},
              "comment": "Integer 1 to 48 per Settlement Date",
              "description": "Settlement Period",
              "title": "Sett_Period",
              "example": "1",
              "unit": "Settlement Period"
            },
            {
              "name": "Scottish Wind Output",
              "type": "number",
              "constraints": {},
              "comment": "Number",
              "description": "Operational Metered MW",
              "title": "Scottish Wind Output",
              "example": "614.578",
              "unit": "MW"
            },
            {
              "name": "England/Wales Wind Output",
              "type": "number",
              "constraints": {},
              "comment": "Number",
              "description": "Operational Metered MW",
              "title": "England/Wales Wind Output",
              "example": "1680.06",
              "unit": "MW"
            },
            {
              "name": "Total",
              "type": "number",
              "constraints": {},
              "comment": "Number",
              "description": "Total of Scotland and England/Wales Operational Metered MW",
              "title": "Total",
              "example": "2294.638",
              "unit": "MW"
            }
          ]
        },
        "force": "true",
        "cache_last_updated": null,
        "package_id": "7bf2e43d-1a24-4a0e-95b0-6ba4eba3daa9",
        "datastore_active": true,
        "id": "a4cb1b3e-f5d5-435f-a937-a655868f4725",
        "size": null,
        "metadata_modified": "2023-08-22T10:40:29.036160",
        "state": "active",
        "hash": "",
        "description": "NGESO's Network Transfer Capacity restrictions submitted to Day-ahead and Intraday auctions",
        "format": "csv",
        "mimetype_inner": null,
        "url_type": "datastore",
        "mimetype": null,
        "cache_url": null,
        "name": "nsl-dayahead-20230823-001",
        "created": "2023-08-22T10:40:20.980233",
        "last_modified": null,
        "position": 300,
        "revision_id": "562db330-e844-43f0-845f-908003cdfa03",
        "resource_type": null,
        "title": "NSL-DayAhead-20230823-001",
        "path": "https://api.nationalgrideso.com/datastore/dump/a4cb1b3e-f5d5-435f-a937-a655868f4725",
        "descriptionHtml": "<p>NGESO’s Network Transfer Capacity restrictions submitted to Day-ahead and Intraday auctions</p>\n",
        "api": "https://api.nationalgrideso.com/api/3/action/datastore_search?resource_id=c47155bc-71b8-4b0a-aba3-0e2d1295daea\&sort=_id asc"
      }
    ]
  }

export default {
  component: App,
  props: {widgets, datapackage: JSON.stringify(datapackage)}
}


