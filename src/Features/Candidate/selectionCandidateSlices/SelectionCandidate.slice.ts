import {
  selectedCandidatesData,
  shortlistCandidatesData,
} from "@/Features/Candidate/consts/candidate-selection.const";
import type {
  ICandidateSelectionState,
  ITableState,
} from "@/Features/Candidate/types/candidate-selection.type";
import type { RootState } from "@/Redux/store";
import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import type { Updater } from "@tanstack/react-table";
import { toast } from "sonner";

const initialState: ICandidateSelectionState = {
  shortlistCandidates: shortlistCandidatesData,
  selectedCandidates: selectedCandidatesData,
  tableState: {
    globalFilter: "",
    sorting: [],
    rowSelection: {},
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
  },
  editId: "",
  deleteId: "",
};

export const candidateSelectionSlice = createSlice({
  name: "candidateSelection",
  initialState,
  reducers: {
    addSelection: (state, action) => {
      state.selectedCandidates = [...state.selectedCandidates, action.payload];
      toast.success("Candidate selected succesfully");
      console.log(current(state));
    },
    selectEditId: (state, action) => {
      state.editId = action.payload;
    },
    removeEditId: (state) => {
      state.editId = "";
    },
    selectDeleteId: (state, action) => {
      state.deleteId = action.payload;
    },
    removeDeleteId: (state) => {
      state.deleteId = "";
    },
    editSelection: (state, action) => {
      const selectedCandidateIndex = state.selectedCandidates.findIndex(
        (c) => c.candidateId === state.editId
      );
      state.selectedCandidates[selectedCandidateIndex] = {
        ...state.selectedCandidates[selectedCandidateIndex],
        ...action.payload,
      };
      toast.success("Selected candidate updated succesfully");
      state.editId = "";
    },
    deleteSelection: (state) => {
      state.selectedCandidates = state.selectedCandidates.filter(
        (candidate) => candidate.candidateId !== state.deleteId
      );
      toast.success("Selected candidate deleted succesfully");
      state.deleteId = "";
    },
    updateTableState: (
      state,
      action: PayloadAction<{
        key: keyof ITableState;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updater: Updater<any>;
      }>
    ) => {
      const { key, updater } = action.payload;

      const currentValue = state.tableState[key];
      const newValue =
        typeof updater === "function" ? updater(currentValue) : updater;

      state.tableState[key] = newValue;
    },
  },
});

export const {
  addSelection,
  selectEditId,
  removeEditId,
  selectDeleteId,
  removeDeleteId,
  editSelection,
  deleteSelection,
  updateTableState,
} = candidateSelectionSlice.actions;

export const selectCandidateSelectionData = (state: RootState) =>
  state.candidateSelection;

export default candidateSelectionSlice.reducer;
