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
    },
    {
      active: false,
      name: 'Chart',
      datapackage: {
        views: [
          {
            "id": 1,
            "specType": "simple",
            "spec": {}
          }
        ]
      }
    },
    {
      active: false,
      name: 'Map',
      datapackage: {
        views: [
          {
            "id": 1,
            "specType": "tabularmap",
            "spec": {}
          }
        ]
      }
    }
  ]

const datapackage = {
    name: 'test',
    resources: [
      {
        api: "https://montreal.l3.ckan.io/api/3/action/datastore_search?resource_id=54d7ffa0-04bf-442c-bacd-a84c6aab888d",
        path: 'https://montreal.l3.ckan.io/dataset/a5c1f0b9-261f-4247-99d8-f28da5000688/resource/54d7ffa0-04bf-442c-bacd-a84c6aab888d/download/inspection-aliments-contrevenants.csv',
        name: 'inspection_des_aliments_–_contrevenants',
        format: 'csv'
      }
    ]
  }

export default {
  component: App,
  props: {widgets, datapackage: JSON.stringify(datapackage)}
}
