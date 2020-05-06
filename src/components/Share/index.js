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

  return (
      <div className="dx-share-container">
        {props.apiUri
          && <div className="m-4 ml-0">
                <input id="apiUri" className="border-solid border-2 border-gray-600 px-2 w-1/2" value={decodeURIComponent(props.apiUri)} />
                <a href="#/" id="copy-share-link" className="m-4" onClick={() => {copy(decodeURIComponent(props.apiUri))}}><i>{t("copy API URI")}</i></a>
             </div>
        }
      </div>
  )
}
