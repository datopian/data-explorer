import React from 'react'

export default props => {
  return (
    <div className="text-center">
      <h2 className="text-2xl">Filter UI</h2>
      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full m-2" onClick={e => {
        props.fetchDataAction()
      }}>Fetch Data</button>
      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full m-2" onClick={e => {
        props.filterUIAction({payload: 'hello'})
      }}>Test redux action</button>
    </div>
  )
}
