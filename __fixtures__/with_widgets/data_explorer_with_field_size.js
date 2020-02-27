import App from '../../src/AppWithProvider'

const widgets = [
    {
      active: true,
      name: 'Table',
      datapackage: {
        views: [
          {
            "id": 1,
            "specType": "table"
          }
        ]
      }
    }
  ]

const datapackage = {
    name: 'test',
    resources: [
      {
        api: "https://national-grid-admin.ckan.io/api/3/action/datastore_search?resource_id=db6c038f-98af-4570-ab60-24d71ebd0ae5",
        path: 'https://national-grid-admin.ckan.io/api/3/action/datastore_search',
        name: 'test',
        id: 'db6c038f-98af-4570-ab60-24d71ebd0ae5',
        format: 'csv',
        datastore_active: true,
        schema: {
          fields: [
            {
              "type": "number",
              "name": "DATE_GMT"
            },
            {
              "type": "number",
              "name": "TIME_GMT"
            },
            {
              "type": "datetime",
              "name": "SETTLEMENT_DATE",
              "size": 10
            },
            {
              "type": "number",
              "name": "SETTLEMENT_PERIOD"
            },
            {
              "type": "number",
              "name": "EMBEDDED_WIND_FORECAST",
              "size": 4.2
            },
            {
              "type": "number",
              "name": "EMBEDDED_WIND_CAPACITY",
              "constraints": {
                "size": 6.1
              }
            },
            {
              "type": "number",
              "name": "EMBEDDED_SOLAR_FORECAST"
            },
            {
              "type": "number",
              "name": "EMBEDDED_SOLAR_CAPACITY"
            }
          ]
        }
      }
    ]
  }

export default {
  component: App,
  props: {widgets, datapackage: JSON.stringify(datapackage)}
}
