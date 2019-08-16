import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import './App.css';
import { QueryBuilder } from 'datastore-query-builder';
import DataView from './components/DataView'
import { ChartBuilder } from 'chart-builder'
import { filterUIAction, fetchDataAction, dataViewBuilderAction } from './actions/'
import { getDataViewBuilderView, getResourceForFiltering } from './utils'

export const App = props => {
  useEffect(() => {
    const payload = {
      datapackage: props.sharedState.datapackage
    }
    props.fetchDataAction(payload)
  }, [])

  return (
    <div className="text-center ml-6">
      <header>
        <div className="container">
          <h1 className="text-3xl">Data Explorer</h1>
        </div>
      </header>
      <div className="container py-4">
        <div className="">
          <QueryBuilder resource={getResourceForFiltering(props.sharedState.datapackage)} filterBuilderAction={props.filterUIAction} />
        </div>
      </div>
      <div className="container flex py-6">
        <div className="w-3/4 p-4 mr-4 overflow-x-auto border-r-2">
          <DataView {...props.sharedState} />
        </div>
        <div className="w-1/4 p-4 mr-4">
          <ChartBuilder view={getDataViewBuilderView(props.sharedState.datapackage)} dataViewBuilderAction={props.dataViewBuilderAction} />
        </div>
      </div>
     </div>
  )
}

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
 filterUIAction: (payload) => dispatch(filterUIAction(payload)),
 fetchDataAction: payload => dispatch(fetchDataAction(payload)),
 dataViewBuilderAction: payload => dispatch(dataViewBuilderAction(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
