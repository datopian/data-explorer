import "../../i18n/i18n";
import React from 'react'

import { useTranslation } from "react-i18next";

export default props => {

  const { t } = useTranslation();

  const copy = (str) => {
    // Create new element
    var el = document.createElement('textarea')
    // Set value (string to be copied)
    el.value = str
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '')
    el.style = {position: 'absolute', left: '-9999px'}
    document.body.appendChild(el)
    // Select text inside element
    el.select()
    // Copy text to clipboard
    document.execCommand('copy')
    // Remove temporary element
    document.body.removeChild(el)
  }

  let parsedApiUri, downloadCsvApiUri, downloadJsonApiUri;
  if (props.apiUri) {

    // TODO: (maybe) remove? because row count is not in the query any more
    parsedApiUri = props.apiUri.replace('COUNT(*)%20OVER%20()%20AS%20_count,%20', '')
    if (props.schema) {
      const fieldNames = props.schema.fields.map(field => field.name)
      parsedApiUri = parsedApiUri.replace('SELECT%20*%20FROM', `SELECT%20"${fieldNames.join('", "')}"%20FROM`)
    }
    let uriObj = new URL(parsedApiUri)
    if (uriObj.pathname.split('/')[3] === 'datastore_search_sql') {
      downloadJsonApiUri = `${window.location.origin}/download/datastore_search_sql${uriObj.search}`
      uriObj.searchParams.set('format', 'csv')
      downloadCsvApiUri = `${window.location.origin}/download/datastore_search_sql${uriObj.search}`

      const ul = document.getElementById('downloads')
      const csvLink = ul.children[0].children[0]
      csvLink.setAttribute('href', downloadCsvApiUri)
      const jsonLink = ul.children[2].children[0]
      jsonLink.setAttribute('href', downloadJsonApiUri)
    }
  }

  return (
      <div className="dx-share-container">
        {props.apiUri
          && <div className="m-4 ml-0">
                <input id="apiUri" className="border-solid border-2 border-gray-600 px-2 w-1/2" value={decodeURI(parsedApiUri)} />
                <a href="#/" id="copy-share-link" className="m-4" onClick={() => {copy(decodeURI(parsedApiUri))}}><i>{t("copy API URI")}</i></a>
             </div>
        }
      </div>
  )
}
