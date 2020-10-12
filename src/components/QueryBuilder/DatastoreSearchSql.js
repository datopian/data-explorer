import "../../i18n/i18n"

import React, { useState } from 'react';
import {Formik, Form, FieldArray, Field} from 'formik'
import DatePicker from 'react-date-picker'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {useTranslation} from "react-i18next"
import ReactTooltip from "react-tooltip"


function DatastoreSearchSql(props) {
  const resource = JSON.parse(JSON.stringify(props.resource))

  const [cleanedDatastoreUrl, setDatastoreUrl] = useState(resource.api || '')
  const [canCopyUri, setCanCopyUri] = useState(true)

  const dateFields = resource.schema.fields.filter(field => field.type && field.type.includes('date'))
  const defaultDateFieldName = dateFields.length > 0 ? dateFields[0].name : null
  const otherFields = resource.schema.fields.filter(field => !(field.type && field.type.includes('date')))

  const { t } = useTranslation();

  const operators = [
    {name: '=', label: '='},
    {name: '!=', label: '!='},
    {name: '<', label: '<'},
    {name: '>', label: '>'},
    {name: '<=', label: '<='},
    {name: '>=', label: '>='}
  ]

  function handleSubmit(values) {
    const clonedValues = JSON.parse(JSON.stringify(values))
    // Convert query to SQL string. Note we're adding 'COUNT(*) OVER()' so that
    // we get number of total rows info.
    const fieldNames = resource.schema.fields.map(field => field.name)
    let sqlQueryString = `SELECT COUNT(*) OVER () AS _count, "${fieldNames.join('", "')}" FROM "${resource.alias || resource.id}"`
    if (clonedValues.date.startDate) {
      const rule = {combinator: 'AND', field: clonedValues.date.fieldName, operator: '>=', value: clonedValues.date.startDate}
      let localDateTime = new Date(clonedValues.date.startDate);
      let offset = localDateTime.getTimezoneOffset();
      localDateTime = new Date(localDateTime.getTime() - offset * 60 * 1000);
      rule.value = localDateTime.toISOString();
      clonedValues.rules.push(rule)
    }
    if (clonedValues.date.endDate) {
      const rule = {combinator: 'AND', field: clonedValues.date.fieldName, operator: '<=', value: clonedValues.date.endDate}
      let localDateTime = new Date(clonedValues.date.endDate);
      // EDS specific: we want to exclude end date
      localDateTime = new Date(localDateTime.setDate(localDateTime.getDate() - 1));
      // Now, convert it into GMT considering offset
      let offset = localDateTime.getTimezoneOffset();
      localDateTime = new Date(localDateTime.getTime() - offset * 60 * 1000);
      rule.value = localDateTime.toISOString();
      clonedValues.rules.push(rule)
    }

    clonedValues.rules.forEach((rule, index) => {
      // Convert JS date object into string:
      rule.value = rule.value instanceof Date ? rule.value.toISOString() : rule.value
      if (index === 0) {
        // TODO: unquote value for numbers
        sqlQueryString += ` WHERE "${rule.field}" ${rule.operator} '${rule.value}'`
      } else { // If we have >1 rule we will need 'AND', 'OR' combinators
        sqlQueryString += ` ${rule.combinator.toUpperCase()} "${rule.field}" ${rule.operator} '${rule.value}'`
      }
    })

    // Set a limit of 100 rows as we don't need more for previewing...
    sqlQueryString += ` ORDER BY "${values.sort.fieldName}" ${values.sort.order} LIMIT 100`

    // Build a datastore URL with SQL string
    const datastoreUrl = props.apiUrl + `datastore_search_sql?sql=${sqlQueryString}`
    // Trigger Redux action
    resource.api = encodeURI(datastoreUrl)
    props.action(resource)
    setDatastoreUrl(datastoreUrl.replace('COUNT(*) OVER () AS _count, ', ''))

    // Update download links
    let downloadCsvApiUri, downloadJsonApiUri, downloadExcelApiUri
    const downloadUrl = datastoreUrl
      .replace('COUNT(*) OVER () AS _count, ', '')
      .replace(' LIMIT 100', '')
    let uriObj = new URL(downloadUrl)
    if (resource.alias) {
      uriObj.searchParams.set('alias', resource.alias)
    }
    downloadJsonApiUri = `${window.location.origin}/download/datastore_search_sql${uriObj.search}`
    uriObj.searchParams.set('format', 'csv')
    downloadCsvApiUri = `${window.location.origin}/download/datastore_search_sql${uriObj.search}`
    uriObj.searchParams.set('format', 'xlsx')
    downloadExcelApiUri = `${window.location.origin}/download/datastore_search_sql${uriObj.search}`

    const ul = document.getElementById('downloads')
    const csvLink = ul.children[0].children[0]
    csvLink.setAttribute('href', downloadCsvApiUri)
    const jsonLink = ul.children[2].children[0]
    jsonLink.setAttribute('href', downloadJsonApiUri)
    const excelLink = ul.children[4].children[0]
    excelLink.setAttribute('href', downloadExcelApiUri)

    setCanCopyUri(true)
  }

  function handleReset() {
    resource.api = props.initialApiUrl
    props.action(resource)
    setDatastoreUrl(resource.api)
    setCanCopyUri(true)
  }

  function handleChange() {
    setCanCopyUri(false)
  }

  return (
    <Formik
      initialValues={{ rules: [], date: {startDate: null, endDate: null, fieldName: defaultDateFieldName}, sort: {fieldName: resource.schema.fields[0].name, order: 'DESC'} }}
      onSubmit={values =>
        handleSubmit(values)
      }
      onReset={() =>
        handleReset()
      }
      render={({ values, setFieldValue, handleReset }) => (
        <Form className="form-inline dq-main-container" onChange={handleChange}>
          <div className="dq-heading">
            <div className="dq-heading-main"></div>
            <div className="dq-heading-total-rows">{props.totalRows && parseInt(props.totalRows).toLocaleString()}</div>
          </div>
          {defaultDateFieldName ? (
            <div className="dq-date-picker">
              <Field name={`date.fieldName`} component="select" className="form-control">
                {dateFields.map((field, index) => (
                  <option value={field.name} key={`dateField${index}`}>{field.title || field.name}</option>
                ))}
              </Field>
              <DatePicker
                value={values.date.startDate}
                clearIcon='X'
                onChange={val => {
                  setFieldValue(`date.startDate`, val)
                  handleChange()
                }}
                format='yyyy-MM-dd' />
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              <DatePicker
                value={values.date.endDate}
                clearIcon='X'
                onChange={val => {
                  setFieldValue(`date.endDate`, val)
                  handleChange()
                }}
                returnValue='end'
                format='yyyy-MM-dd'
                minDate={values.date.startDate} />
            </div>
          ) : (
            ''
          )}
          <FieldArray
            name='rules'
            render={arrayHelpers => (
              <div className="dq-rule-container">
                <div className="dq-body">
                {values.rules && values.rules.length > 0 ? (
                  values.rules.map((rule, index) => (
                    <div key={index} className="dq-rule-item">
                      <Field name={`rules.${index}.combinator`} component="select" className="form-control" required>
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                      </Field>
                      <Field name={`rules.${index}.field`} component="select" className="form-control" required>
                        {otherFields.map((field, index) => (
                          <option value={field.name} key={`field${index}`}>{field.title || field.name}</option>
                        ))}
                      </Field>
                      <Field name={`rules.${index}.operator`} component="select" className="form-control" required>
                        {operators.map((operator, index) => (
                          <option value={operator.name} key={`operator${index}`}>{operator.label}</option>
                        ))}
                      </Field>
                      <Field name={`rules.${index}.value`} className="form-control" required />
                      <button
                        type="button"
                        className="btn btn-default dq-btn-remove"
                        onClick={() => {
                          // remove a rule from the list
                          arrayHelpers.remove(index)
                          handleChange()
                        }}
                      >
                        -
                      </button>
                      <button
                        type="button"
                        className="btn btn-default dq-btn-add"
                        onClick={() => {
                          // insert an empty rule at a position
                          arrayHelpers.insert(index + 1, {combinator: 'AND', field: otherFields[0].name, operator: '=', value: ''})
                          handleChange()
                        }}
                      >
                        +
                      </button>
                    </div>
                  ))
                ) : (
                  <button type="button" className="btn btn-default dq-rule-add" onClick={
                    () => {
                      arrayHelpers.push({combinator: 'AND', field: otherFields[0].name, operator: '=', value: ''})
                      handleChange()
                    }}>
                    {/* show this when user has removed all rules from the list */}
                    {t('Add a rule')}
                  </button>
                )}
                </div>
                <div className="dq-rule-submit dq-footer">
                  <Field name={`sort.fieldName`} component="select" className="form-control">
                    {resource.schema.fields.map((field, index) => (
                      <option value={field.name} key={`field${index}`}>{field.title || field.name}</option>
                    ))}
                  </Field>
                  <Field name={`sort.order`} component="select" className="form-control">
                    <option value="DESC">Descending</option>
                    <option value="ASC">Ascending</option>
                  </Field>
                  <button type="submit" className="btn btn-primary submit-button">{t('Submit')}</button>
                  <button type="submit" className="btn btn-primary reset-button" onClick={handleReset}>{t('Reset')}</button>
                  <CopyToClipboard text={cleanedDatastoreUrl}>
                    <div data-tip={t("Submit to enable")}>
                      <button type="button"
                              disabled={!canCopyUri}
                              className="btn btn-primary copy-button">
                        {t("Copy API URI")}
                      </button>
                      {!canCopyUri ? <ReactTooltip /> : "" }
                    </div>

                  </CopyToClipboard>
                </div>
              </div>
            )}
          />
        </Form>
      )}
    />
  )
}

export default DatastoreSearchSql;
