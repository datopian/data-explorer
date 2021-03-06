import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './store'
import './App.css'
import App from './App'

import "./i18n/i18n";
import { useTranslation } from "react-i18next";

export default props => {

  const { t } = useTranslation();

  let datapackage

  // Allow datapackage json or obj
  if (typeof props.datapackage === 'string') {
    try {
      datapackage = JSON.parse(props.datapackage)
    } catch (e) {
      // TODO -- would be nice for the app to still load in an empty state on fail case
      datapackage = {}
      console.warn('Invalid datapackage', e)
    }
  } else if (typeof props.datapackage === 'object') {
    datapackage = props.datapackage
  }

  let views

  try {
    views = JSON.parse(JSON.stringify(datapackage.views))
    delete datapackage.views
  } catch {
    console.log('No views set on datapackage')
  }

  const widgetsFromViews = (views) => {
    const widgetNames = {
      'table': t('Table'),
      'tabularmap': t('Map'),
      'map': t('Map'),
      'simple': t('Chart')
    }

    return views.map((view, index) => {
      return {
        active: index === 0 ? true : false,
        name: widgetNames[view.specType],
        datapackage: {views: [view]}
      }
    })
  }

  const widgets = (props.widgets) ? props.widgets : widgetsFromViews(views)

  return (
    <Provider store={configureStore({widgets, datapackage})}>
      <App />
    </Provider>
  )
}
