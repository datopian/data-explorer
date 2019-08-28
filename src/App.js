import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import './App.css';
import { QueryBuilder } from 'datastore-query-builder';
import DataView from './components/DataView';
import { ChartBuilder } from 'chart-builder';
import { MapBuilder } from 'map-builder';
import { filterUIAction, fetchDataAction, dataViewBuilderAction } from './actions/';
import { getResourceForFiltering } from './utils';

export const App = props => {
  useEffect(() => {
    const payload = {
      datapackage: props.datapackage,
      widgets: props.widgets
    }
    props.fetchDataAction(payload)
  }, [])

  return (
    <div className="text-center ml-6">
      {/* Data Editor (aka filters / datastore query builder) */}
      <div className="container py-4">
        <div className="datastore-query-builder">
          {
            props.datapackage.resources[0].datastore_active
            ? <QueryBuilder resource={getResourceForFiltering(props.datapackage)} filterBuilderAction={props.filterUIAction} />
            : ''
          }
        </div>
      </div>
      {/* End of Data Editor */}

      {/* Widgets (aka Views and Controls/Builders) */}
      {props.widgets.map((widget, index) => {
        return (
          <div className="container flex py-6" key={`widget-${index}`}>
            <div className="w-3/4 p-3 mr-4">
              <DataView {...widget} />
            </div>
            <div className="w-1/4">
              <div className="w-full">
                <div className="p-4 mr-4">
                  {
                    widget.datapackage.views[0].specType === 'simple'
                    ? <ChartBuilder view={widget.datapackage.views[0]} dataViewBuilderAction={props.dataViewBuilderAction} />
                    : ''
                  }
                  {
                    widget.datapackage.views[0].specType === 'tabularmap'
                    ? <MapBuilder view={widget.datapackage.views[0]} dataViewBuilderAction={props.dataViewBuilderAction} />
                    : ''
                  }
                </div>
              </div>
            </div>
          </div>
        )
      })}
      {/* End of Widgets */}
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
