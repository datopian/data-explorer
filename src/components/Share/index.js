import "../../i18n/i18n";
import React from 'react'

import { useTranslation } from "react-i18next";

const MAX_LEN = 1500
const slimProps = ['archiver', 'schema', 'shareLink', 'iframeText']
const slim = serializedState => {
  if (serializedState.length <= MAX_LEN) return serializedState
  const state = JSON.parse(serializedState)
  state.datapackage.resources.forEach(resource => {
    for (const prop in slimProps) {
      if (resource[slimProps[prop]]) delete resource[slimProps[prop]]
    }
  })
  return JSON.stringify(state)
}

export default props => {

  const { t } = useTranslation();

  const serializedState = slim(props.serializedState)
  const urlObj = new URL(window.location.href)
  urlObj.searchParams.set('explorer', serializedState)
  const shareLink = urlObj.href
  const iframe = `<iframe src="${urlObj.href}" />`
  const shareable = shareLink.length < 2000

  const copy = async (str) => {
    await navigator.clipboard.writeText(str);
  }

  return (
      <div className="dx-share-container">
        {shareable
          ? <div>
              <div className="m-4 ml-0 dx-share-link">
                <input id={"share-link-"+Math.random().toString(36).slice(2,5)} title="Share link" className="border-solid border-2 border-gray-600 w-1/2 px-2" value={shareLink} />
                <a href="#/" id={"copy-share-link-"+Math.random().toString(36).slice(2,5)} className="m-4" onClick={() => {copy(shareLink)}}><em>{t("copy share link")}</em></a>
              </div>
              <div className="m-4 ml-0 dx-embed-link">
                <input id={"embed-"+Math.random().toString(36).slice(2,5)} title="Embedded link" className="border-solid border-2 border-gray-600 px-2 w-1/2" value={iframe} />
                <a href="#/" id={"copy-share-link-"+Math.random().toString(36).slice(2,5)} className="m-4" onClick={() => {copy(iframe)}}><em>{t("copy embed text")}</em></a>
              </div>
            </div>
          : <p className="no-share-link-message">{t('No share link available')}</p>
        }
        {props.apiUri
          && <div className="m-4 ml-0 dx-apiuri-link">
                <input id={"apiUri-"+Math.random().toString(36).slice(2,5)} title="API URI link" className="border-solid border-2 border-gray-600 px-2 w-1/2" value={props.apiUri} />
                <a href="#/" id={"copy-share-link-"+Math.random().toString(36).slice(2,5)} className="m-4" onClick={() => {copy(props.apiUri)}}><em>{t("copy API URI")}</em></a>
             </div>
        }
      </div>
  )
}
