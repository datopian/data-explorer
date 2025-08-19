"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactTable = require("@tanstack/react-table");
var _solid = require("@heroicons/react/24/solid");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Table({
  resource,
  data,
  schema
}) {
  const fields = schema ? schema.fields : [];
  let columns = fields.map(field => {
    return {
      accessorKey: field.name,
      header: (field.title || field.name).replace(/\\\//g, '/'),
      accessorFn: d => d[field.name],
      footer: props => props.column.id
    };
  });
  const [pagination, setPagination] = _react.default.useState({
    pageIndex: 0,
    pageSize: data.length
  });
  const table = (0, _reactTable.useReactTable)({
    columns,
    data,
    debugTable: false,
    getCoreRowModel: (0, _reactTable.getCoreRowModel)(),
    getSortedRowModel: (0, _reactTable.getSortedRowModel)(),
    getFilteredRowModel: (0, _reactTable.getFilteredRowModel)(),
    getPaginationRowModel: (0, _reactTable.getPaginationRowModel)(),
    onPaginationChange: setPagination,
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      pagination
    }
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "p-2 ReactTable",
    style: {
      overflow: 'scroll'
    },
    tabIndex: "0"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "h-2"
  }), /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement("thead", null, table.getHeaderGroups().map(headerGroup => /*#__PURE__*/_react.default.createElement("tr", {
    key: headerGroup.id
  }, headerGroup.headers.map(header => {
    return /*#__PURE__*/_react.default.createElement("th", {
      key: header.id,
      colSpan: header.colSpan
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: 'flex'
      },
      className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
      onClick: header.column.getToggleSortingHandler()
    }, (0, _reactTable.flexRender)(header.column.columnDef.header, header.getContext()), {
      asc: /*#__PURE__*/_react.default.createElement(_solid.ArrowUpIcon, {
        width: 20
      }),
      desc: /*#__PURE__*/_react.default.createElement(_solid.ArrowDownIcon, {
        width: 20
      })
    }[header.column.getIsSorted()] || null));
  })))), /*#__PURE__*/_react.default.createElement("tbody", null, table.getRowModel().rows.map(row => {
    return /*#__PURE__*/_react.default.createElement("tr", {
      key: row.id
    }, row.getVisibleCells().map(cell => {
      return /*#__PURE__*/_react.default.createElement("td", {
        key: cell.id
      }, (0, _reactTable.flexRender)(cell.column.columnDef.cell, cell.getContext()));
    }));
  }))), table.getRowModel().rows.length === 0 && /*#__PURE__*/_react.default.createElement("div", {
    className: "no-data-message",
    style: {
      textAlign: 'center',
      padding: '4px'
    }
  }, /*#__PURE__*/_react.default.createElement("p", null, "Data view unavailable."), /*#__PURE__*/_react.default.createElement("a", {
    href: resource.path,
    class: "text-primary font-bold"
  }, "Download the data.")));
}
var _default = exports.default = Table;