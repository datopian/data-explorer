import i18n from './i18n/i18n'
import React from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import App from './AppWithProvider'

import * as serviceWorker from './serviceWorker';

const instances = document.getElementsByClassName('data-explorer')

// this check needs to be here
// otherwise the translations never get to the build
// see https://gitlab.com/datopian/data-explorer/issues/31#note_269586593
if (i18n.options.resources) {
  console.log('Translations loaded')
}

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
