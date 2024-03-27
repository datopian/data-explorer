import App from '../../src/AppWithProvider'

const widgets = [
    {
      active: true,
      name: 'Chart',
      datapackage: {
        views: [
          {
            "resources": ["inspection_des_aliments_–_contrevenants"],
            "description": "",
            "title": "Graphe",
            "resource_id": "51026016-7d82-49dc-93e0-2176df8790c6",
            "view_type": "recline_graph_view",
            "id": "4b94afa6-2fbc-4d34-95b6-dbb63a2f3348",
            "package_id": "a5c1f0b9-261f-4247-99d8-f28da5000688",
            "specType": "simple",
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
        "path": "https://api.nationalgrideso.com/datastore/dump/a4cb1b3e-f5d5-435f-a937-a655868f4725",
        "descriptionHtml": "<p>NGESO’s Network Transfer Capacity restrictions submitted to Day-ahead and Intraday auctions</p>\n",
        "api": "https://api.nationalgrideso.com/api/3/action/datastore_search?resource_id=c47155bc-71b8-4b0a-aba3-0e2d1295daea\&sort=_id asc",
        name: 'inspection_des_aliments_–_contrevenants',
        format: 'csv'
      }
    ]
  }

export default {
  component: App,
  props: {widgets, datapackage: JSON.stringify(datapackage)}
}
