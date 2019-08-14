export const getEmptyView = datapackage => {
  try {
    return {resources: [{schema: datapackage.resources[0].schema}]}
  } catch (e) {
    return {}
  }
}

export const getDataViewBuilderView = datapackage => {
  console.log('gdvbv', datapackage)

  switch (datapackage.views.length) {
    case 1:
      return datapackage.views[0]
    case 2:
      return datapackage.views[1]
    default:
      return getEmptyView(datapackage)
  }
}

export const deepClone = obj => {
  return JSON.parse(JSON.stringify(obj))
}
