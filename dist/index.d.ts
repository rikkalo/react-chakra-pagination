import { SortingState, ColumnDef } from '@tanstack/react-table';
export { createColumnHelper as createColumn } from '@tanstack/react-table';
import { ThemeTypings, ResponsiveValue, ListProps as ListProps$1 } from '@chakra-ui/react';
import { ReactNode } from 'react';
import * as CSS from 'csstype';

type Options<I> = {
    totalRegisters: number;
    page: number;
    items: I[];
    itemsPerPage?: number;
    siblingsCount?: number;
    sorting?: SortingState;
};
type Pagination<I> = {
    pageItems: I[];
    totalPages: number;
    itemsPerPage: number;
    currentPage: number;
    lastPage: number;
    nextPages: number[];
    previousPages: number[];
    siblingsCount: number;
};
interface BasePagination {
    page: number;
    /**
     * If you paginate your list in server use this
     * prop to pass the total length of list.
     */
    totalRegisters: number;
    /** Listener change page */
    onPageChange: (page: number) => void;
}

declare function usePagination<I>({ totalRegisters, page, items, itemsPerPage, siblingsCount, sorting, }: Options<I>): Pagination<I>;

interface NoContentProps {
    text: string;
    icon?: any;
    children?: ReactNode;
    noShadow?: boolean;
}

type EmptyMessage = Partial<NoContentProps>;

interface TableProps<Data extends object> extends BasePagination {
    /** List parsed data columns using string or custom component */
    columns: ColumnDef<Data, any>[];
    /** Pass the array of Table Headers */
    data: Data[];
    /**
     * Custom color schemes using Chakra UI
     * @default 'teal'
     */
    colorScheme?: ThemeTypings["colorSchemes"];
    /** Fallback for empty data  */
    emptyData?: EmptyMessage;
    /**
     * Define how many items displayed per page
     * @default 10
     */
    itemsPerPage?: number;
    /**
     * Define sort icons
     */
    sortIcons?: {
        up?: any;
        down?: any;
    };
}
declare function Table<Data extends object>({ data, columns, colorScheme, itemsPerPage, totalRegisters, emptyData, sortIcons, }: TableProps<Data>): JSX.Element;

type Token<CSSType, ThemeKey = unknown> = ThemeKey extends keyof ThemeTypings ? ResponsiveValue<CSSType | ThemeTypings[ThemeKey]> : ResponsiveValue<CSSType>;

type ListItemWithIcon = {
    icon: any;
    iconColor: Token<CSS.Property.Color, "colors">;
    iconPosition: "start" | "end";
} | {
    icon?: any;
    iconColor?: never;
    iconPosition?: never;
};
type ListItem = {
    content: string | JSX.Element;
} & ListItemWithIcon;

interface ListProps extends Omit<ListProps$1, "listStyle">, BasePagination {
    /** Items List */
    items: ListItem[];
    /** Control list style */
    listStyle?: "ordered" | "unordered" | "none";
}
declare function List({ items, listStyle: style, onPageChange, page, totalRegisters, ...props }: ListProps): JSX.Element;

export { List, Table, usePagination };
