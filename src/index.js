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
    console.error(e)
    return stringOrJSON
  }
}
const datapackage = parseDatapackageIdentifier(window.DP_ID)


ReactDOM.render(
 <Provider store={configureStore({sharedState: {datapackage}})}>
  <App />
 </Provider>,
 document.getElementById('data-explorer')
)

serviceWorker.unregister();
