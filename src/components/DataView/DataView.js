import "../../i18n/i18n"
import React from "react"
import Table from "./Table.js"
import {getResourceCachedValues} from 'datapackage-render'
import Loader from 'react-loader-spinner'
import {useTranslation} from "react-i18next"

export function DataView(props) {

  const { t } = useTranslation();

  if (props.loading) {
    return (
      <div className="App">
        <Loader
           type="Grid"
           color="#D3D3D3"
           height="50"
           width="50"
        />
      </div>
    )
  }
  const countViews = props.datapackage.views ? props.datapackage.views.length : 0
  if (countViews === 0) {
    return (<div className="App">{t('No views available')}</div>)
  }
  for (let i = 0; i < countViews; i++) {
    const view = props.datapackage.views[i]
    if (!view.resources[0]._values && view.resources[0].data) {
      view.resources[0]._values = view.resources[0].data
    }
    if (view.specType === 'table' && view.resources[0]._values) {
      const data = getResourceCachedValues(view.resources[0], true)
      const schema = view.resources[0].schema || {}
      return (
        <div className="App">
          <Table data={data} schema={schema} />
        </div>
      )
    } else {
      return (
        <div className="App">
          <Loader
             type="Grid"
             color="#D3D3D3"
             height="50"
             width="50"
          />
        </div>
      )
    }
  }
}
