import React from 'react';
import '../../App.css';
import DatastoreSearchSql from './DatastoreSearchSql';


export const QueryBuilder = (props) => {
  const resource = JSON.parse(JSON.stringify(props.resource))
  if (resource.schema) {
    let apiUrl
    if (resource.proxy || resource.api) {
      const urlObj = new URL(resource.proxy || resource.api)
      // Remove action name from the URL so we get base API URL
      let pathParts = urlObj.pathname.split('/')
      pathParts.pop()
      urlObj.pathname = pathParts.join('/') + '/' // Trailing slash for consistency
      urlObj.search = '' // Remove all search params
      apiUrl = urlObj.href
    } else {
      apiUrl = (new URL(resource.path)).origin + '/api/3/action/'
    }

    return (
      <div className="App">
        <DatastoreSearchSql
          resource={resource}
          apiUrl={apiUrl}
          action={props.filterBuilderAction}
          totalRows={props.totalRows}
          initialApiUrl={resource.api}
        />
      </div>
    );
  } else {
    return (
      <div className="no-filters"></div>
    );
  }
}
