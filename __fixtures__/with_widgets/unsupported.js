import App from '../../src/AppWithProvider'

const widgets = [
    {
      "name": "widget0",
      "active": true,
      "datapackage": {
        "views": [
          {
            "id": "217d95ca-fbbe-4a28-b123-0ce3c6b8bfcb",
            "specType": "unsupported"
          }
        ]
      }
    }
  ]


const datapackage = {
  "resources": [
    {
      "name": "inspection_des_aliments_–_contrevenants",
      "format": "xml",
      "id": "54d7ffa0-04bf-442c-bacd-a84c6aab888d",
      "title": "Inspection des aliments – contrevenants",
      "path": "https://montreal.l3.ckan.io/dataset/a5c1f0b9-261f-4247-99d8-f28da5000688/resource/54d7ffa0-04bf-442c-bacd-a84c6aab888d/download/inspection-aliments-contrevenants.csv",
    }
  ]
}


export default {
  component: App,
  props: {widgets, datapackage: JSON.stringify(datapackage)}
}
