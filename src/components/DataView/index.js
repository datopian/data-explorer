import React from 'react'
import Loader from 'react-loader'

export default props => {
  console.log(props.sharedState.loading)
  return (
  <Loader loaded={!props.sharedState.loading}>
    <div>
      <h2 className="text-2xl">Data View</h2>
      <pre>{ JSON.stringify(props) }</pre>
    </div>
  </Loader>
  )
}
