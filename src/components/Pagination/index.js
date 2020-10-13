import "../../i18n/i18n"
import React, {useState} from 'react'

import { useTranslation } from "react-i18next"

const ROWS_PER_PAGE = 100


export default props => {

  // console.log('Pagination props:\n' + JSON.stringify(props, null, 2))

  const { t } = useTranslation()

  const resource = JSON.parse(JSON.stringify(props.datapackage.resources[0]))

  const [currentPage, setCurrentPage] = useState(0)

  function handlePageClick (targetPage) {
    setCurrentPage(targetPage)

    console.log('Pagination handlePageClick data:\n' + JSON.stringify(targetPage, null, 2))
    // zero based selected
    // {
    //   "selected": 59
    // }

    const offset = Math.ceil(targetPage * ROWS_PER_PAGE)
    const urlObj = new URL(resource.api)

    if (resource.api.includes('datastore_search?')) {
      urlObj.searchParams.set('offset', offset)
    } 
    
    else if (resource.api.includes('datastore_search_sql?')) {
      const sql = urlObj.searchParams.get('sql')
      const regex = /OFFSET(%20|\s)\d+/
      if (regex.test(sql)) {
        urlObj.searchParams.set('sql', sql.replace(regex, `OFFSET ${offset}`))
      } else {
        urlObj.searchParams.set('sql', sql + ` OFFSET ${offset}`)
      }
      resource.api = resource.api.includes('offset')
    }
    resource.api = urlObj.href

    console.log('resource.api:\n' + JSON.stringify(resource.api, null, 2))
    props.updateAction(resource)
  }


  // pages are zero-based, not displayed to the user
  let lastPage = 0

  if (resource.totalrowcount && !isNaN(resource.totalrowcount)) {
    lastPage = Math.ceil(resource.totalrowcount/ROWS_PER_PAGE) - 1
  }

  return (
    <div id="data-explorer-pagination">
      <button onClick={ () => handlePageClick(0) } >First</button>
      <button disabled={currentPage < 1} onClick={ () => handlePageClick(currentPage - 1) }>Previous</button>
      <button title="next" onClick={ () => handlePageClick(currentPage + 1) }>Next</button>
      {
        lastPage
          ? 
        <button onClick={ () => handlePageClick(lastPage) } >Last</button>
          : 
        ''
      }
    </div>
  )
}
