import { deepClone, unloadDatapackage } from '../utils'

// updates on every action and translates app state to shareable links
export default (state = {}, action, root) => {
  try {
    const clonedRoot = deepClone(root)
    delete clonedRoot.serializedState
    const datapackage = unloadDatapackage(clonedRoot.datapackage)
    const widgets = clonedRoot.widgets.map(widget => {
      widget.datapackage = unloadDatapackage(widget.datapackage)
      widget.loading = false
      return widget
    })

    return JSON.stringify(Object.assign(clonedRoot, {datapackage, widgets}))
  } catch (e) {
    console.warn(e)
    return {}
  }
}
