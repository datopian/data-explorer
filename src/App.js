import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import './App.css'
import { QueryBuilder } from '@datopian/datastore-query-builder'
import DataView from './components/DataView'
import Share from './components/Share'
import { ChartBuilder } from '@datopian/chart-builder'
import { MapBuilder } from '@datopian/map-builder'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { filterUIAction, fetchDataAction, dataViewBuilderAction, selectTabAction } from './actions/'
import { getResourceForFiltering } from './utils'

export const App = props => {
  useEffect(() => {
    const payload = {
      datapackage: props.datapackage,
      widgets: props.widgets
    }
    props.fetchDataAction(payload)
  }, [])

  const activeWidget = props.widgets.find(widget => {
    return widget.active
  })

  const selectedTab = activeWidget ? activeWidget.name : props.widgets[0].name
  const tabLinks = props.widgets.map((widget, index) => {
    return <TabLink to={widget.name} className='mr-4' key={`tabLink-${index}`}>{widget.name}</TabLink>
  })
  const tabContents = props.widgets.map((widget, index) => {
    return <TabContent for={widget.name} key={`tabContent-${index}`}>
      <div className="container flex py-6">
        <div className="w-3/4 py-3 mr-4">
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
    </TabContent>
  })

  return (
    <div className="data-explorer">
      {/* Number of total rows available. */}
      <div className="total-rows">
        {
          props.datapackage.resources[0].datastore_active
          ? props.datapackage.resources[0].totalrowcount
            ? props.datapackage.resources[0].totalrowcount.toLocaleString()
            : ''
          : ''
        }
      </div>
      {/* End of Number of total rows available. */}

      {/* Data Editor (aka filters / datastore query builder) */}
      <div className="datastore-query-builder">
        {
          props.datapackage.resources[0].datastore_active
          ? <QueryBuilder resource={getResourceForFiltering(props.datapackage)} filterBuilderAction={props.filterUIAction} />
          : ''
        }
      </div>
      {/* End of Data Editor */}

      {/* Widgets (aka Views and Controls/Builders) */}
      <Tabs
        renderActiveTabContentOnly={true}
        handleSelect={(selectedTab) => {
          props.selectTabAction(selectedTab)
        }}
        selectedTab={selectedTab}>
          {tabLinks}
          {tabContents}
      </Tabs>
      <Share serializedState={props.serializedState} />
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
 dataViewBuilderAction: payload => dispatch(dataViewBuilderAction(payload)),
 selectTabAction: payload => dispatch(selectTabAction(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
