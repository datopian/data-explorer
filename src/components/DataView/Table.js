import React from "react"
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'


export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      schema: Object.assign({}, this.props.schema)
    };
  }

  updateData = (newData) => {
    this.setState({
      data: newData
    })
  }

  getFields = () => {
    if (this.state.schema && this.state.schema.fields) {
      return this.state.schema.fields
    }
    const fields = []
    for (let key in this.state.data[0]) {
      fields.push({
        name: key
      })
    }
    return fields
  }

  render() {
    return (
      <ReactTable
        data={
          this.state.data.map(row => {
            // If field display attributes exist (these can be custom, eg, in
            // EDS, we use 'size' attribute which isn't part of tableschema spec)
            // use it to alter the data for presentation. Eg, "100.2312313" => "100.23".
            const fields = this.getFields()
            fields.forEach(field => {
              const fieldSize = field.size || field.constraints && field.constraints.size
              if (fieldSize && row[field.name] !== null) {
                const sizeParts = fieldSize.toString().split('.')

                // Format datetime values according to EDS requirements
                if (field.name.includes('UTC') && field.type === 'datetime') {
                  row[field.name] = row[field.name].replace(/(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}):(\d{2})(\+\d{2}:\d{2})*/, '$1 $2Z')
                } else if (field.name.includes('DK') && field.type === 'datetime') {
                  row[field.name] = row[field.name].replace(/(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}):(\d{2})/, '$1 $2')
                } else if (sizeParts[1]) {
                  sizeParts[1] = parseInt(sizeParts[1])
                  row[field.name] = row[field.name].toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: sizeParts[1],
                      maximumFractionDigits: sizeParts[1]
                    }
                  )
                } else {
                  sizeParts[0] = parseInt(sizeParts[0])
                  row[field.name] = row[field.name] && row[field.name].toString().slice(0, sizeParts[0])

                  if (field.type === 'integer') {
                    row[field.name] = parseInt(row[field.name])
                  } else if (field.type === 'number') {
                    row[field.name] = parseFloat(row[field.name])
                  }
                }
              }
              row[field.name] = row[field.name] && row[field.name].toLocaleString()
            })

            return row})
        }
        columns={
          this.getFields().map((field, index) => {
            return {
              Header: field.title || field.name,
              accessor: field.name,
              Cell: props => <div className={field.type || ''}>
                <span>{props.value}</span>
              </div>,
              width: index === 0 && (1280 * 0.8333 - 30) / this.getFields().length < 130 ? 130 : undefined
            }
          })
        }
        getTheadThProps={() => {
          return { style: { "wordWrap": "break-word", "whiteSpace": "initial" } }
        }}
        showPagination={false}
        defaultPageSize={100}
        showPageSizeOptions={false}
        minRows={10}
      />
    )
  }
}
