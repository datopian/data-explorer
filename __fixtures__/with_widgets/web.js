import App from '../../src/AppWithProvider'

const widgets = [
    {
      "name": "widget0",
      "active": true,
      "datapackage": {
        "views": [
          {
            "id": "217d95ca-fbbe-4a28-b123-0ce3c6b8bfcb",
            "specType": "web",
            "page_url": "https://datahub.io/core/co2-ppm/view/0"
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
      "path": "http://example.com",
    }
  ]
}


export default {
  component: App,
  props: {widgets, datapackage: JSON.stringify(datapackage)}
}
