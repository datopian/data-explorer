export const getEmptyView = datapackage => {
  try {
    return {resources: [{schema: datapackage.resources[0].schema}]}
  } catch (e) {
    return {}
  }
}

export const getDataViewChartBuilderView = (datapackage) => {
  if (!datapackage) return {}

  const views = datapackage.views || []

  switch (views.length) {
    case 1:
      return datapackage.views[0]
    case 2:
      return datapackage.views[1]
    case 3:
      return datapackage.views[2]
    default:
      return getEmptyView(datapackage)
  }
}

export const getDataViewMapBuilderView = (datapackage) => {
  if (!datapackage) return {}

  const views = datapackage.views || []

  return views.find(view => view.specType === 'tabularmap') || getEmptyView(datapackage)
}

export const getResourceForFiltering = (datapackage) => {
  if (!datapackage) return {}
  return datapackage.resources[0]
}

export const deepClone = obj => {
  return JSON.parse(JSON.stringify(obj))
}
