import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import './App.css'
import { QueryBuilder } from '@datopian/datastore-query-builder'
import DataView from './components/DataView'
import Share from './components/Share'
import Pagination from './components/Pagination'
import { ChartBuilder } from '@datopian/chart-builder'
import { MapBuilder } from '@datopian/map-builder'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { filterUIAction, fetchDataAction, dataViewBuilderAction, selectTabAction } from './actions/'
import { getResourceForFiltering, showQueryBuilder } from './utils'

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

  // Check if any of widgets requires datastore specific components:
  const nonDataStoreViewTypes = ['web', 'document']
  const datastoreComponents = props.widgets.find(widget => {
    return widget.datapackage.views
      .find(view => !nonDataStoreViewTypes.includes(view.specType))
  })

  const totalRows =
        props.datapackage.resources[0].datastore_active
          ? props.datapackage.resources[0].totalrowcount
            ? props.datapackage.resources[0].totalrowcount.toLocaleString()
            : ''
          : ''

  const selectedTab = activeWidget ? activeWidget.name : props.widgets[0].name
  const tabLinks = props.widgets.map((widget, index) => {
    return <TabLink to={widget.name} className='mr-4' key={`tabLink-${index}`}>{widget.name}</TabLink>
  })

  const viewGuidingText = (specType) => {
    return (
    <div className="dx-guiding-text"> 
      {specType === 'simple' ? <p>Select chart type, group column (ordinate x-axis) and series (abscissa y-axis) on the right hand side panel.</p> : '' }  
      {specType === 'tabularmap' ? <p>Select geo data field on the right hand side panel.</p> : '' }  
    </div>
    )}

  const tabContents = props.widgets.map((widget, index) => {
    return <TabContent for={widget.name} key={`tabContent-${index}`}>
        {
          (['table', 'web'].includes(widget.datapackage.views[0].specType))
          ? <div className="container flex py-6">
              <div className="w-full py-3">
                <DataView {...widget} />
              </div>
            </div>
          : <div className="container flex py-6">
              <div className="w-3/4 py-3 mr-4">
              {!widget.datapackage.views[0].spec ? <div>{viewGuidingText(widget.datapackage.views[0].specType)}</div> : ''}
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
        }
    </TabContent>
  })

  return (
    <div className="data-explorer">
      {totalRows && datastoreComponents && (<div className="total-rows">
        <span className="total-rows-label">Total Rows</span>: <span className="total-rows-value">{totalRows}</span>
      </div>)
      }
      {/* Data Editor (aka filters / datastore query builder) */}
      <div className="datastore-query-builder">
        {
          showQueryBuilder(props)
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
        className="data-explorer-content"
        selectedTab={selectedTab}>
          {tabLinks}
          {tabContents}
      </Tabs>

      {/* Pagination for DataStore resources */}
      {props.datapackage.resources[0].datastore_active && datastoreComponents
        ? <Pagination datapackage={props.datapackage} updateAction={props.filterUIAction} />
      : <div className="no-pagination not-datastore-resource"></div>
      }
      {/* End of Pagination */}

      {/* Share feature */}
      {datastoreComponents
        ? <Share serializedState={props.serializedState} apiUri={props.datapackage.resources[0].api} />
        : <div className="no-share-feature"></div>
      }
      {/* End of Share feature */}

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
