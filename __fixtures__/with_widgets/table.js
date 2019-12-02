import App from '../../src/AppWithProvider'

const widgets = [
    {
      active: true,
      name: 'Table',
      datapackage: {
        views: [
          {
            "description": "",
            "title": "Table",
            "resource_id": "54d7ffa0-04bf-442c-bacd-a84c6aab888d",
            "view_type": "recline_grid_view",
            "id": "16ce7d84-0db1-4d39-aeab-d74e3dcf7d31",
            "package_id": "a5c1f0b9-261f-4247-99d8-f28da5000688",
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
