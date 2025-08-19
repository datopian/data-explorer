import "../../i18n/i18n";
import React from 'react';
import ReactPaginate from 'react-paginate';

import { useTranslation } from "react-i18next";


export default props => {

  const { t } = useTranslation();

  function handlePageClick (data) {
    const selected = data.selected
    const offset = Math.ceil(selected * 100)
    const resource = JSON.parse(JSON.stringify(props.datapackage.resources[0]))
    const urlObj = new URL(resource.api)
    if (resource.api.includes('datastore_search?')) {
      urlObj.searchParams.set('offset', offset)
    } else if (resource.api.includes('datastore_search_sql?')) {
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
    props.updateAction(resource)
  }

  return (
    <ReactPaginate
      previousLabel={t('Previous')}
      nextLabel={t('Next')}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={Math.ceil(props.datapackage.resources[0].totalrowcount/100)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={Object.keys(props.datapackage.resources[0].data || []).length === 0 ? 'hidden' : 'pagination'}
      activeClassName={'active'}
    />
  )
}
