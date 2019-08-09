import React from 'react'

// TODO load VIEW here by type
export default props => {
  return (
    <div>
      <h2>Data View</h2>
      <pre>{ JSON.stringify(props) }</pre>
      <hr/>
    </div>
  )
}
