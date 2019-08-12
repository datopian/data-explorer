import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import FilterUI from './components/FilterUI'
import DataView from './components/DataView'
import DataViewBuilder from './components/DataViewBuilder'
import { filterUIAction, fetchDataAction, dataViewBuilderAction } from './actions/';

export const App = props => {
  
  return (
     <div className="App">
      <header>
       <h1 className="App-title">Data Explorer</h1>
      </header>
      <FilterUI {...props} />
      <DataView {...props} />
      <DataViewBuilder {...props} />
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
