import React from 'react'
import ReactDom from 'react-dom'

export default props => {
  // TODO this is a stub for montreal -- need to pass origin as props
  const shareLink = `localhost:4000/data-explorer?explorer=${props.serializedState}`
  const iframe = `<iframe src="localhost:4000/data-explorer?explorer=${props.serializedState}" />`
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
  <div>
    <div>
      <label htmlFor="share-link">Share link</label>
      <input id="share-link" value={shareLink} />
      <a href="#" id="copy-share-link" onClick={() => {copy(shareLink)}}><i>copy</i></a>
    </div>
    <div>
      <label htmlFor="embed">Share link</label>
      <input id="embed" value={iframe} />
      <a href="#" id="copy-share-link" onClick={() => {copy(iframe)}}><i>copy</i></a>
    </div>
  </div>
  )
}
