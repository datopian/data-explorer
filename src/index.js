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

    const widgetNames = {
      'table': 'Table',
      'tabularmap': 'Map',
      'map': 'Map',
      'simple': 'Chart'
    }

    const widgets = views.map((view, index) => {
      return {
        active: index === 0 ? true : false,
        name: widgetNames[view.specType],
        datapackage: {views: [view]}
      }
    })

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
