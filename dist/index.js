"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  List: () => List,
  Table: () => Table,
  createColumn: () => import_react_table2.createColumnHelper,
  usePagination: () => usePagination
});
module.exports = __toCommonJS(src_exports);

// src/hooks/usePagination.ts
function generatePagesArray(from, to) {
  return [...new Array(to - from)].map((_, index) => from + index + 1).filter((page) => page > 0);
}
function usePagination({
  totalRegisters,
  page,
  items,
  itemsPerPage = 10,
  siblingsCount = 1,
  sorting = []
}) {
  const currentPage = page;
  const lastPage = Math.ceil(totalRegisters / itemsPerPage);
  const totalPages = lastPage === 0 ? 1 : lastPage;
  const previousPages = currentPage > 1 ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1) : [];
  const nextPages = currentPage < lastPage ? generatePagesArray(
    currentPage,
    Math.min(currentPage + siblingsCount, lastPage)
  ) : [];
  const pageStart = (page - 1) * itemsPerPage;
  const pageEnd = pageStart + itemsPerPage;
  const pageItems = items.sort((a, b) => {
    const { desc, id } = sorting[0] ?? {};
    if (typeof a[id] !== "string") {
      return void 0;
    }
    let order = desc ? b : a;
    let compare = desc ? a : b;
    return order[id].localeCompare(compare[id], "pt-BR", {
      sensitivity: "base"
    });
  }).slice(pageStart, pageEnd);
  return {
    pageItems,
    currentPage,
    totalPages,
    lastPage,
    nextPages,
    previousPages,
    itemsPerPage,
    siblingsCount
  };
}

// src/components/Table.tsx
var React4 = __toESM(require("react"));
var import_react7 = require("@chakra-ui/react");
var import_react_table = require("@tanstack/react-table");
var import_icons = require("@chakra-ui/icons");

// src/components/NoContent.tsx
var import_react = __toESM(require("react"));
var import_react2 = require("@chakra-ui/react");
function NoContent({ icon, text, children, noShadow }) {
  return /* @__PURE__ */ import_react.default.createElement(
    import_react2.Flex,
    {
      mt: "8",
      mb: "12",
      p: "10",
      borderRadius: "8",
      direction: "column",
      align: "center",
      justify: "center",
      boxShadow: noShadow ? "unset" : "sm",
      h: "100%"
    },
    icon ? /* @__PURE__ */ import_react.default.createElement(
      import_react2.Flex,
      {
        p: "6",
        align: "center",
        justify: "baseline",
        borderRadius: "full",
        bg: "gray.50"
      },
      icon
    ) : null,
    /* @__PURE__ */ import_react.default.createElement(import_react2.Text, { mt: "4" }, text),
    children
  );
}

// src/components/Pagination.tsx
var import_react5 = __toESM(require("react"));
var import_react6 = require("@chakra-ui/react");

// src/components/PaginationItem.tsx
var import_react3 = __toESM(require("react"));
var import_react4 = require("@chakra-ui/react");
function PaginationItem({
  isCurrent = false,
  page,
  onPageChange,
  colorScheme
}) {
  if (isCurrent) {
    return /* @__PURE__ */ import_react3.default.createElement(
      import_react4.Button,
      {
        size: "sm",
        fontSize: "xs",
        width: "4",
        colorScheme,
        disabled: true,
        _disabled: {
          bg: `${colorScheme}.500`,
          cursor: "pointer"
        }
      },
      page
    );
  }
  return /* @__PURE__ */ import_react3.default.createElement(
    import_react4.Button,
    {
      size: "sm",
      fontSize: "xs",
      width: "4",
      bg: "gray.100",
      _hover: {
        bg: "gray.300"
      },
      onClick: () => onPageChange(page)
    },
    page
  );
}

// src/components/Pagination.tsx
function Pagination({
  currentPage,
  lastPage,
  previousPages,
  nextPages,
  siblingsCount,
  onPageChange,
  colorScheme
}) {
  return /* @__PURE__ */ import_react5.default.createElement(import_react6.Stack, { direction: "row", mt: "8", justify: "flex-end", align: "center", spacing: "6" }, /* @__PURE__ */ import_react5.default.createElement(import_react6.Stack, { direction: "row", spacing: "4" }, currentPage > 1 + siblingsCount ? /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement(
    PaginationItem,
    {
      colorScheme,
      onPageChange,
      page: 1
    }
  ), currentPage > 2 + siblingsCount ? /* @__PURE__ */ import_react5.default.createElement(import_react6.Text, { color: "gray.300", w: "8", textAlign: "center" }, "...") : null) : null, previousPages.length > 0 ? previousPages.map((page) => /* @__PURE__ */ import_react5.default.createElement(
    PaginationItem,
    {
      colorScheme,
      onPageChange,
      page,
      key: page
    }
  )) : null, /* @__PURE__ */ import_react5.default.createElement(
    PaginationItem,
    {
      colorScheme,
      onPageChange,
      page: currentPage,
      isCurrent: true
    }
  ), nextPages.length > 0 ? nextPages.map((page) => /* @__PURE__ */ import_react5.default.createElement(
    PaginationItem,
    {
      colorScheme,
      onPageChange,
      page,
      key: page
    }
  )) : null, currentPage + siblingsCount < lastPage ? /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, currentPage + 1 + siblingsCount < lastPage ? /* @__PURE__ */ import_react5.default.createElement(import_react6.Text, { color: "gray.300", w: "8", textAlign: "center" }, "...") : null, /* @__PURE__ */ import_react5.default.createElement(
    PaginationItem,
    {
      colorScheme,
      onPageChange,
      page: lastPage
    }
  )) : null));
}

// src/components/Table.tsx
function Table({
  data,
  columns,
  colorScheme = "teal",
  itemsPerPage = 10,
  totalRegisters = data.length,
  onPageChange = () => {
  },
  emptyData,
  sortIcons = { up: import_icons.TriangleUpIcon, down: import_icons.TriangleDownIcon }
}) {
  const [{ pageIndex, pageSize }, setPagination] = React4.useState({
    pageIndex: 0,
    pageSize: itemsPerPage
  });
  const [sorting, setSorting] = React4.useState([]);
  const paginationState = usePagination({
    totalRegisters,
    page: pageIndex + 1,
    items: data,
    itemsPerPage: pageSize,
    sorting
  });
  const pagination = React4.useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  );
  const table = (0, import_react_table.useReactTable)({
    columns,
    data: paginationState.pageItems,
    getCoreRowModel: (0, import_react_table.getCoreRowModel)(),
    pageCount: paginationState.totalPages,
    onSortingChange: setSorting,
    getSortedRowModel: (0, import_react_table.getSortedRowModel)(),
    onPaginationChange: setPagination,
    manualSorting: true,
    manualPagination: true,
    state: {
      sorting,
      pagination
    }
  });
  if (data.length === 0) {
    return /* @__PURE__ */ React4.createElement(
      NoContent,
      {
        ...emptyData,
        text: emptyData?.text ?? "Nenhum dado para ser exibido."
      },
      emptyData?.children
    );
  }
  return /* @__PURE__ */ React4.createElement(import_react7.Box, { py: "6", px: "8", borderRadius: "8", w: "full", h: "100%", color: "" }, /* @__PURE__ */ React4.createElement(import_react7.Table, null, /* @__PURE__ */ React4.createElement(import_react7.Thead, null, table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ React4.createElement(import_react7.Tr, { key: headerGroup.id }, headerGroup.headers.map((header) => {
    const meta = header.column.columnDef.meta;
    const UpIcon = sortIcons.up;
    const DownIcon = sortIcons.down;
    return /* @__PURE__ */ React4.createElement(React4.Fragment, { key: header.id }, /* @__PURE__ */ React4.createElement(
      import_react7.Th,
      {
        key: header.id,
        onClick: header.column.getToggleSortingHandler(),
        isNumeric: meta?.isNumeric
      },
      (0, import_react_table.flexRender)(
        header.column.columnDef.header,
        header.getContext()
      ),
      /* @__PURE__ */ React4.createElement(import_react7.chakra.span, { pl: "4" }, header.column.getIsSorted() ? header.column.getIsSorted() === "desc" ? /* @__PURE__ */ React4.createElement(DownIcon, { "aria-label": "sorted descending" }) : /* @__PURE__ */ React4.createElement(UpIcon, { "aria-label": "sorted ascending" }) : null)
    ));
  })))), /* @__PURE__ */ React4.createElement(import_react7.Tbody, null, table.getRowModel().rows.map((row) => {
    return /* @__PURE__ */ React4.createElement(import_react7.Tr, { key: row.id }, row.getVisibleCells().map((cell, index) => {
      const meta = cell.column.columnDef.meta;
      return /* @__PURE__ */ React4.createElement(
        import_react7.Td,
        {
          key: cell.column.id + index,
          isNumeric: meta?.isNumeric
        },
        (0, import_react_table.flexRender)(
          cell.column.columnDef.cell,
          cell.getContext()
        )
      );
    }));
  }))), /* @__PURE__ */ React4.createElement(
    Pagination,
    {
      ...paginationState,
      colorScheme,
      onPageChange: (page) => {
        table.setPageIndex(page - 1);
        onPageChange(page);
      }
    }
  ));
}

// src/components/List.tsx
var import_react8 = __toESM(require("react"));
var import_react9 = require("@chakra-ui/react");
function List({
  items,
  listStyle: style = "none",
  onPageChange,
  page,
  totalRegisters,
  ...props
}) {
  const Tag = style === "none" ? import_react9.List : style === "ordered" ? import_react9.OrderedList : import_react9.UnorderedList;
  const { pageItems, ...pagination } = usePagination({
    items,
    page,
    totalRegisters
  });
  return /* @__PURE__ */ import_react8.default.createElement(import_react9.Box, { py: "6", px: "8", borderRadius: "8", w: "full", h: "100%" }, /* @__PURE__ */ import_react8.default.createElement(Tag, { spacing: 3, ...props }, pageItems.map((item, i) => /* @__PURE__ */ import_react8.default.createElement(import_react9.ListItem, { key: i }, item.iconPosition === "start" ? /* @__PURE__ */ import_react8.default.createElement(import_react9.ListIcon, { as: item.icon, color: item.iconColor }) : null, /* @__PURE__ */ import_react8.default.createElement(import_react9.Text, null, item.content), item.iconPosition === "end" ? /* @__PURE__ */ import_react8.default.createElement(import_react9.ListIcon, { as: item.icon, color: item.iconColor }) : null))), /* @__PURE__ */ import_react8.default.createElement(Pagination, { ...pagination, onPageChange }));
}

// src/index.ts
var import_react_table2 = require("@tanstack/react-table");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  List,
  Table,
  createColumn,
  usePagination
});
