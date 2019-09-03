import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import './App.css'
import App from './AppWithProvider'
import * as serviceWorker from './serviceWorker';


const instances = document.getElementsByClassName('data-explorer')

for (const instance of instances) {
  try {
    const datapackage = instance.getAttribute('data-datapackage')

    ReactDOM.render(
      <App datapackage={datapackage} />, document.getElementById(instance.id)
    )
  } catch (e) {
    console.warn('Failed to render data-explorer', e)
  }
}

serviceWorker.unregister();
