import "../../i18n/i18n";
import React from 'react'
import Loader from 'react-loader'
import { DataView } from '@datopian/datapackage-views-js'
import { useTranslation } from "react-i18next";

export default props => {
  const { t } = useTranslation();

  const views = props.datapackage.views

  const showGuideText = (specType) => {
    return (
      <div className="dx-guiding-text">
        {specType === 'simple' ? <p>{t('Select chart type, group column (abscissa x-axis) and series (ordinate y-axis) on the right hand side panel.')}</p> : '' }
        {specType === 'tabularmap' ? <p>{t('Select geo data column on the right hand side panel.')}</p> : '' }
      </div>
    )
  }

  const checkIfGuideIsNeeded = (view) => {
    if (view.specType === 'simple' && !(view.spec && Object.keys(view.spec).length > 0)) {
      return true
    }
    return false
  }

  return (
  <Loader loaded={!props.loading} style={{position: "relative"}}>
    <div>
      {
        checkIfGuideIsNeeded(views[0])
        ? showGuideText(views[0].specType)
        : views.map(view => <DataView key={Math.random()} datapackage={{views: [view]}} />)
      }
    </div>
  </Loader>
  )
}
