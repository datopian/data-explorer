import React from 'react'

export default props => {
  return (
    <div>
      <h2>Filter UI</h2>
      <button onClick={e => {
        props.fetchDataAction()
      }}>Fetch Data</button>
      <button onClick={e => {
        props.filterUIAction({payload: 'hello'})
      }}>Test redux action</button>
      <hr />
    </div>
  )
}
