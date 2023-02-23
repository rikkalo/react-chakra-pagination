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
import * as React4 from "react";
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  chakra
} from "@chakra-ui/react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel
} from "@tanstack/react-table";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

// src/components/NoContent.tsx
import React from "react";
import { Flex, Text } from "@chakra-ui/react";
function NoContent({ icon, text, children, noShadow }) {
  return /* @__PURE__ */ React.createElement(
    Flex,
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
    icon ? /* @__PURE__ */ React.createElement(
      Flex,
      {
        p: "6",
        align: "center",
        justify: "baseline",
        borderRadius: "full",
        bg: "gray.50"
      },
      icon
    ) : null,
    /* @__PURE__ */ React.createElement(Text, { mt: "4" }, text),
    children
  );
}

// src/components/Pagination.tsx
import React3 from "react";
import { Stack, Text as Text2 } from "@chakra-ui/react";

// src/components/PaginationItem.tsx
import React2 from "react";
import { Button } from "@chakra-ui/react";
function PaginationItem({
  isCurrent = false,
  page,
  onPageChange,
  colorScheme
}) {
  if (isCurrent) {
    return /* @__PURE__ */ React2.createElement(
      Button,
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
  return /* @__PURE__ */ React2.createElement(
    Button,
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
  return /* @__PURE__ */ React3.createElement(Stack, { direction: "row", mt: "8", justify: "flex-end", align: "center", spacing: "6" }, /* @__PURE__ */ React3.createElement(Stack, { direction: "row", spacing: "4" }, currentPage > 1 + siblingsCount ? /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement(
    PaginationItem,
    {
      colorScheme,
      onPageChange,
      page: 1
    }
  ), currentPage > 2 + siblingsCount ? /* @__PURE__ */ React3.createElement(Text2, { color: "gray.300", w: "8", textAlign: "center" }, "...") : null) : null, previousPages.length > 0 ? previousPages.map((page) => /* @__PURE__ */ React3.createElement(
    PaginationItem,
    {
      colorScheme,
      onPageChange,
      page,
      key: page
    }
  )) : null, /* @__PURE__ */ React3.createElement(
    PaginationItem,
    {
      colorScheme,
      onPageChange,
      page: currentPage,
      isCurrent: true
    }
  ), nextPages.length > 0 ? nextPages.map((page) => /* @__PURE__ */ React3.createElement(
    PaginationItem,
    {
      colorScheme,
      onPageChange,
      page,
      key: page
    }
  )) : null, currentPage + siblingsCount < lastPage ? /* @__PURE__ */ React3.createElement(React3.Fragment, null, currentPage + 1 + siblingsCount < lastPage ? /* @__PURE__ */ React3.createElement(Text2, { color: "gray.300", w: "8", textAlign: "center" }, "...") : null, /* @__PURE__ */ React3.createElement(
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
  emptyData,
  sortIcons = { up: TriangleUpIcon, down: TriangleDownIcon }
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
  const table = useReactTable({
    columns,
    data: paginationState.pageItems,
    getCoreRowModel: getCoreRowModel(),
    pageCount: paginationState.totalPages,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
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
  return /* @__PURE__ */ React4.createElement(Box, { py: "6", px: "8", borderRadius: "8", w: "full", h: "100%", color: "" }, /* @__PURE__ */ React4.createElement(ChakraTable, null, /* @__PURE__ */ React4.createElement(Thead, null, table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ React4.createElement(Tr, { key: headerGroup.id }, headerGroup.headers.map((header) => {
    const meta = header.column.columnDef.meta;
    const UpIcon = sortIcons.up;
    const DownIcon = sortIcons.down;
    return /* @__PURE__ */ React4.createElement(React4.Fragment, { key: header.id }, /* @__PURE__ */ React4.createElement(
      Th,
      {
        key: header.id,
        onClick: header.column.getToggleSortingHandler(),
        isNumeric: meta?.isNumeric
      },
      flexRender(
        header.column.columnDef.header,
        header.getContext()
      ),
      /* @__PURE__ */ React4.createElement(chakra.span, { pl: "4" }, header.column.getIsSorted() ? header.column.getIsSorted() === "desc" ? /* @__PURE__ */ React4.createElement(DownIcon, { "aria-label": "sorted descending" }) : /* @__PURE__ */ React4.createElement(UpIcon, { "aria-label": "sorted ascending" }) : null)
    ));
  })))), /* @__PURE__ */ React4.createElement(Tbody, null, table.getRowModel().rows.map((row) => {
    return /* @__PURE__ */ React4.createElement(Tr, { key: row.id }, row.getVisibleCells().map((cell, index) => {
      const meta = cell.column.columnDef.meta;
      return /* @__PURE__ */ React4.createElement(
        Td,
        {
          key: cell.column.id + index,
          isNumeric: meta?.isNumeric
        },
        flexRender(
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
      }
    }
  ));
}

// src/components/List.tsx
import React5 from "react";
import {
  Box as Box2,
  List as ChakraList,
  ListItem as ChakraListItem,
  OrderedList,
  UnorderedList,
  ListIcon,
  Text as Text3
} from "@chakra-ui/react";
function List({
  items,
  listStyle: style = "none",
  onPageChange,
  page,
  totalRegisters,
  ...props
}) {
  const Tag = style === "none" ? ChakraList : style === "ordered" ? OrderedList : UnorderedList;
  const { pageItems, ...pagination } = usePagination({
    items,
    page,
    totalRegisters
  });
  return /* @__PURE__ */ React5.createElement(Box2, { py: "6", px: "8", borderRadius: "8", w: "full", h: "100%" }, /* @__PURE__ */ React5.createElement(Tag, { spacing: 3, ...props }, pageItems.map((item, i) => /* @__PURE__ */ React5.createElement(ChakraListItem, { key: i }, item.iconPosition === "start" ? /* @__PURE__ */ React5.createElement(ListIcon, { as: item.icon, color: item.iconColor }) : null, /* @__PURE__ */ React5.createElement(Text3, null, item.content), item.iconPosition === "end" ? /* @__PURE__ */ React5.createElement(ListIcon, { as: item.icon, color: item.iconColor }) : null))), /* @__PURE__ */ React5.createElement(Pagination, { ...pagination, onPageChange }));
}

// src/index.ts
import { createColumnHelper } from "@tanstack/react-table";
export {
  List,
  Table,
  createColumnHelper as createColumn,
  usePagination
};
