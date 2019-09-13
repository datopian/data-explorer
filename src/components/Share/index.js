import React from 'react'
import ReactDom from 'react-dom'

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
  const serializedState = slim(props.serializedState)
  // TODO this is a stub for montreal -- need to pass origin as props
  const shareLink = `localhost:4000/data-explorer?explorer=${serializedState}`
  const iframe = `<iframe src="localhost:4000/data-explorer?explorer=${serializedState}" />`
  const shareable = shareLink.length < 2000

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
    {shareable &&
      <div>
        <div className="m-4">
          <input id="share-link" className="border-solid border-4 border-gray-600 w-1/2 px-2" value={shareLink} />
          <a href="#" id="copy-share-link" className="m-4" onClick={() => {copy(shareLink)}}><i>copy share link</i></a>
        </div>
        <div className="m-4">
          <input id="embed" className="border-solid border-4 border-gray-600 px-2 w-1/2" value={iframe} />
          <a href="#" id="copy-share-link" className="m-4" onClick={() => {copy(iframe)}}><i>copy embed text</i></a>
        </div>
      </div>
    }
    {!shareable &&
      <p>No share link available</p>
    }
    </div>
  )
}
