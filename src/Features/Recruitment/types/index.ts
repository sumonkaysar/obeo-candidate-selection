import type { SortingTableState } from "@tanstack/react-table";

interface IPaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface ITableState {
  globalFilter: string;
  sorting: SortingTableState[];
  rowSelection: Record<string, boolean>;
  pagination: IPaginationState;
}
