import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import './App.css'
import App from './App'
import * as serviceWorker from './serviceWorker';

function parseDatapackageIdentifier(stringOrJSON) {
  try {
    return JSON.parse(stringOrJSON)
  } catch (e) {
    console.warn(e)
    return stringOrJSON
  }
}

const instances = document.getElementsByClassName('data-explorer')

for (const instance of instances) {
  try {
    const datapackage = JSON.parse(instance.getAttribute('data-datapackage'))

    const views = JSON.parse(JSON.stringify(datapackage.views))
    delete datapackage.views
    const tableView = views.find(view => view.specType === 'table')
    const chartView = views.find(view => view.specType === 'simple')
    const mapView = views.find(view => view.specType === 'tabularmap')

    let widgets = [
      {
        datapackage: {views: [tableView]},
      },
      {
        datapackage: {views: [chartView]}
      },
      {
        datapackage: {views: [mapView]}
      }
    ]

    widgets = widgets.filter(widget => widget.datapackage.views[0])

    ReactDOM.render(
     <Provider store={configureStore({widgets, datapackage})}>
      <App />
     </Provider>, document.getElementById(instance.id)
    )
  } catch (e) {
    console.warn('Failed to render data-explorer', e)
  }
}

serviceWorker.unregister();
