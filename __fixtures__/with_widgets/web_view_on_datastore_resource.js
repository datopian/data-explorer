// Web view in a datastore resource.
// This fixture is for testing that self contained web view shouldn't display
// datastore specific components such as "total rows", "filters (aka rules)",
// and pagination.

import App from '../../src/AppWithProvider'

const widgets = [
    {
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
      "path": "https://national-grid-admin.ckan.io/",
      "api": "https://national-grid-admin.ckan.io/api/3/action/datastore_search?resource_id=db6c038f-98af-4570-ab60-24d71ebd0ae5",
      "datastore_active": true
    }
  ]
}


export default {
  component: App,
  props: {widgets, datapackage: JSON.stringify(datapackage)}
}
