import React from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import App from './AppWithProvider'

import * as serviceWorker from './serviceWorker';

const instances = document.getElementsByClassName('data-explorer')

for (const instance of instances) {
  try {
    const props = JSON.parse(instance.getAttribute('data-datapackage'))
    const { datapackage, ...rest} = props

    ReactDOM.render(
      <App datapackage={datapackage} {...rest} />, document.getElementById(instance.id)
    )
  } catch (e) {
    console.warn('Failed to render data-explorer', e)
  }
}

serviceWorker.unregister();
