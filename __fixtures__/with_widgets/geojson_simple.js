import App from '../../src/AppWithProvider'

const widgets = [
    {
      active: true,
      name: 'Map',
      datapackage: {
        views: [
          {
            specType: 'map',
            resources: [
              'geojson-test'
            ]
          }
        ]
      }
    }
  ]

const datapackage = {
    resources: [
      {
        path: 'https://storage.googleapis.com/dx-nationalgrid-staging/nationalgrid-staging/resources/05efd1e3-38f4-4a3f-b68a-f68790b786d8/tnuosgenzones_geojs.geojson',
        pathType: 'remote',
        name: 'geojson-test',
        format: 'GeoJSON',
        mediatype: 'application/geo+json',
        encoding: 'utf-8',
      }
    ]
  }

export default {
  component: App,
  props: {widgets, datapackage: JSON.stringify(datapackage)}
}
