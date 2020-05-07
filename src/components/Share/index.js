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
    parsedApiUri = props.apiUri.replace('COUNT(*)%20OVER%20()%20AS%20_count,%20', '')
    let uriObj = new URL(parsedApiUri)
    if (uriObj.pathname.split('/')[3] === 'datastore_search_sql') {
      downloadJsonApiUri = `${window.location.origin}/download/datastore_search_sql${uriObj.search}`
      uriObj.searchParams.set('format', 'csv')
      downloadCsvApiUri = `${window.location.origin}/download/datastore_search_sql${uriObj.search}`
    } else {
      downloadJsonApiUri = `${window.location.origin}/download/datastore/dump/${props.resourceId}?format=json`
      downloadCsvApiUri = `${window.location.origin}/download/datastore/dump/${props.resourceId}`
    }
  }

  return (
      <div className="dx-share-container">
        {props.apiUri
          && <div className="m-4 ml-0">
                <div class="btn-group data-explorer-download mb-12">
                  <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="fa fa-download"></span><span class="fa-label">Filtered data</span>&nbsp;<span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a href={downloadCsvApiUri} class="data-extract-btn" data-format="CSV">CSV</a>
                    </li>
                    <li>
                      <a href={downloadJsonApiUri} class="data-extract-btn" data-format="JSON">JSON</a>
                    </li>
                    <br />
                    <li class="text-gray-600 text-sm border-t">
                      <div class="px-8 py-3">
                        <i class="fa fa-info-circle" aria-hidden="true"></i> Downloads are limited to the top 100 000 rows.
                      </div>
                    </li>
                  </ul>
                </div>
                <br />
                <input id="apiUri" className="border-solid border-2 border-gray-600 px-2 w-1/2" value={decodeURI(parsedApiUri)} />
                <a href="#/" id="copy-share-link" className="m-4" onClick={() => {copy(decodeURI(parsedApiUri))}}><i>{t("copy API URI")}</i></a>
             </div>
        }
      </div>
  )
}
