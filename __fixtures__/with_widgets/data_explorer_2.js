import App from '../../src/AppWithProvider'


const widgets = [
  {
    "name": "Table",
    "active": true,
    "datapackage": {
      "views": [
        {
          "id": "66632027-3d7d-4ca6-911f-bc4d003f3ddf",
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
          "id": "66632027-3d7d-4ca6-911f-bc4d003f3ddf",
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
          "id": "66632027-3d7d-4ca6-911f-bc4d003f3ddf",
          "specType": "tabularmap"
        }
      ]
    }
  }
]

const datapackage = {
  "resources": [
    {
      "mimetype": null,
      "cache_url": null,
      "hash": "",
      "description": "We publish embedded wind and solar forecast up to 14 days ahead at a daily resolution. ",
      "name": "embedded_solar_and_wind_forecast_daily",
      "format": "csv",
      "datastore_active": true,
      "cache_last_updated": null,
      "package_id": "91c0c70e-0ef5-4116-b6fa-7ad084b5e0e8",
      "created": "2019-11-07T21:25:27.215305",
      "state": "active",
      "mimetype_inner": null,
      "last_modified": "2020-02-18T04:34:45",
      "position": 0,
      "revision_id": "9adf3925-0f34-4235-984a-d1c536ecbe1a",
      "url_type": null,
      "id": "db6c038f-98af-4570-ab60-24d71ebd0ae5",
      "resource_type": null,
      "size": null,
      "title": "Embedded Solar and Wind Forecast DAILY",
      "path": "https://docs.google.com/spreadsheets/d/10suCRrhbljC1VX-9lVMGBncUZbvTJ4KVBV0wfVoVRUU/gviz/tq?tqx=out:csv",
      "views": [
        {
          "description": "",
          "title": "Data Explorer",
          "resource_id": "db6c038f-98af-4570-ab60-24d71ebd0ae5",
          "view_type": "recline_view",
          "id": "66632027-3d7d-4ca6-911f-bc4d003f3ddf",
          "package_id": "91c0c70e-0ef5-4116-b6fa-7ad084b5e0e8",
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
          }
        }
      ],
      "descriptionHtml": "<p>We publish embedded wind and solar forecast up to 14 days ahead at a daily resolution.</p>\\n",
      "api": "https://national-grid-admin.ckan.io/api/3/action/datastore_search?resource_id=db6c038f-98af-4570-ab60-24d71ebd0ae5"
    }
  ]
}

export default {
  component: App,
  props: {widgets, datapackage: JSON.stringify(datapackage)}
}
