import 'react'
import App from '../../src/AppWithProvider'

const datapackage = '{"name":"test","resources":[{"name":"geojson-test","format":"GeoJSON","path":"https://montreal.l3.ckan.io/en/dataset/587de1ea-817b-4e10-b387-83ec89f94e1b/resource/bc1e71e4-269a-4fa9-a278-ab6bfd80ec23/download/murales.geojson"}],"views":[{"specType":"map","resources":["geojson-test"]}]}'

export default {
  component: App,
  props: {datapackage}
}
