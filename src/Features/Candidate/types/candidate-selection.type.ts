import type { SortingTableState } from "@tanstack/react-table";

export interface ISelectedCandidate {
  firstName: string;
  lastName: string;
  candidateId: string;
  employeeId: string;
  position: string;
  selectionTerms: string;
}

export interface IShortlistCandidate {
  _id: string;
  firstName: string;
  lastName: string;
  candidateId: string;
  candidate: string;
  position: string;
  interviewDate: string;
  createdAt: string;
}

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

export interface ICandidateSelectionState {
  shortlistCandidates: IShortlistCandidate[];
  selectedCandidates: ISelectedCandidate[];
  tableState: ITableState;
  editId: string;
  deleteId: string;
}
