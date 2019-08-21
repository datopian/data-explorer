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

  const showChartBuilder = props.sharedState.datapackage.controls && props.sharedState.datapackage.controls.showChartBuilder
  const chartBuilder = (showChartBuilder) && (
        <div className="p-4 mr-4">
          <ChartBuilder view={getDataViewBuilderView(props.sharedState.datapackage)} dataViewBuilderAction={props.dataViewBuilderAction} />
        </div>
      )

  return (
    <div className="text-center ml-6">
      <div className="container py-4">
        <div className="">
          <QueryBuilder resource={getResourceForFiltering(props.sharedState.datapackage)} filterBuilderAction={props.filterUIAction} />
        </div>
      </div>
      <div className="container flex py-6">
        <div className="w-3/4 p-3 mr-4">
          <DataView {...props.sharedState} />
        </div>
        {chartBuilder}
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
