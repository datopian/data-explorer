import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import FilterUI from './components/FilterUI'
import DataView from './components/DataView'
import DataViewBuilder from './components/DataViewBuilder'
import { filterUIAction, fetchDataAction, dataViewBuilderAction } from './actions/';

export const App = props => {
  
  return (
    <div className="text-center mx-auto">
      <header>
        <div className="container">
          <h1 className="text-3xl">Data Explorer</h1>
        </div>
      </header>
      <div className="container my-6">
        <div className="">
          <FilterUI {...props} />
        </div>
      </div>
      <div className="container flex mx-auto">
        <div className="w-3/4 p-4 overflow-x-auto">
          <DataView {...props} />
        </div>
        <div className="w-1/4 p-4">
          <DataViewBuilder {...props} />
        </div>
      </div>
     </div>
  )
}

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
 filterUIAction: () => dispatch(filterUIAction()),
 fetchDataAction: () => dispatch(fetchDataAction()),
 dataViewBuilderAction: () => dispatch(dataViewBuilderAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
