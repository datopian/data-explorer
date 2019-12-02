import App from '../../src/AppWithProvider'

const widgets = [
    {
      active: true,
      name: 'Map',
      datapackage: {
        views: [
          {
            "resources": ["inspection_des_aliments_–_contrevenants"],
            "description": "",
            "title": "Map",
            "resource_id": "51026016-7d82-49dc-93e0-2176df8790c6",
            "view_type": "recline_map_view",
            "id": "4b94afa6-2fbc-4d34-95b6-dbb63a2f3348",
            "package_id": "a5c1f0b9-261f-4247-99d8-f28da5000688",
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
