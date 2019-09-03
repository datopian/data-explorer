import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './store'
import './App.css'
import App from './App'

export default props => {
  const datapackage = JSON.parse(props.datapackage)
  let views
  
  try {
    views = JSON.parse(JSON.stringify(datapackage.views))
  } catch {
    console.log('No views set on datapackage')
  }

  delete datapackage.views
  
  const widgetsFromViews = (views) => {
    const widgetNames = {
      'table': 'Table',
      'tabularmap': 'Map',
      'map': 'Map',
      'simple': 'Chart'
    }

    return views.map((view, index) => {
      return {
        active: index === 0 ? true : false,
        name: widgetNames[view.specType],
        datapackage: {views: [view]}
      }
    })
  }

  const widgets = props.widgets || widgetsFromViews(views)

  return (
    <Provider store={configureStore({widgets, datapackage})}>
      <App />
    </Provider>
  )
}
