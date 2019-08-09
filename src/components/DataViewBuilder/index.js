import React from 'react'

export default props => {
  return (
    <div>
      <h2>Filter UI</h2>
      <button onClick={e => {
        console.log(props)
        props.dataViewBuilderAction()
      }}>Test redux action</button>
      <hr />
    </div>
  )
}
