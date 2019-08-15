import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import './App.css'
import App from './App'
import { register } from './serviceWorker'

// Mock init data
import datapackage from './testData/remoteData.json'

ReactDOM.render(
 <Provider store={configureStore({sharedState: {datapackage}})}>
  <App />
 </Provider>,
 document.getElementById('root')
)

register()
