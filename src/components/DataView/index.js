import React from 'react'
import Loader from 'react-loader'
import DataView from 'datapackage-views-js'

export default props => {
  const views = props.datapackage.views

  return (
  <Loader loaded={!props.loading} style={{position: "relative"}}>
    <div>
     {
        views.map(view => <DataView key={Math.random()} datapackage={{views: [view]}} />)
     }
    </div>
  </Loader>
  )
}
