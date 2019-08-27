import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import './App.css'
import App from './App'
import * as serviceWorker from './serviceWorker';


const instances = document.getElementsByClassName('data-explorer')

for (const instance of instances) {
  try {
    const datapackage=JSON.parse(instance.getAttribute('data-datapackage'))

    ReactDOM.render(
     <Provider store={configureStore({sharedState: {datapackage}})}>
      <App />
     </Provider>, document.getElementById(instance.id)
    )
  } catch (e) {
    console.warn('Failed to render data-explorer', e)
  }
}

serviceWorker.unregister();
