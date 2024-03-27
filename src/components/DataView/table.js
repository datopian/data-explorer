import React from 'react'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'

function Table({data, schema}) {
  const fields = schema ? schema.fields : []
  const columns = fields.map((field) => {
    return {
      accessorKey: field.name,
      header: field.title,
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }
  })

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: data.length
  })


  const table = useReactTable({
    columns,
    data,
    debugTable: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      pagination,
    },
  })

  return (
    <div className="p-2 ReactTable" style={{overflow: 'scroll'}}>
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    <div style={{display: 'flex'}}
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <ArrowUpIcon width={20} />,
                        desc: <ArrowDownIcon width={20} />,
                      }[header.column.getIsSorted()] || null}
                      
                    </div>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table


