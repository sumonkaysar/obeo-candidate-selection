import { selectedCandidatesData } from "@/Features/Recruitment/consts/candidate-selection.const";
import { interviewCandidatesData } from "@/Features/Recruitment/consts/interview.const";
import { shortlistCandidatesData } from "@/Features/Recruitment/consts/shortlist.const";
import type { ITableState } from "@/Features/Recruitment/types";
import type { ICandidateSelectionState } from "@/Features/Recruitment/types/candidate-selection.type";
import type { RootState } from "@/Redux/store";
import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import type { Updater } from "@tanstack/react-table";
import { toast } from "sonner";

const initialState: ICandidateSelectionState = {
  shortlistCandidates: shortlistCandidatesData,
  interviewCandidates: interviewCandidatesData,
  selectedCandidates: selectedCandidatesData,
  tableState: {
    globalFilter: "",
    sorting: [{ desc: true, id: "name" }],
    rowSelection: {},
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
  },
  selectionEditId: "",
  selectionDeleteId: "",
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
      state.selectionEditId = action.payload;
    },
    removeEditId: (state) => {
      state.selectionEditId = "";
    },
    selectDeleteId: (state, action) => {
      state.selectionDeleteId = action.payload;
    },
    removeDeleteId: (state) => {
      state.selectionDeleteId = "";
    },
    editSelection: (state, action) => {
      const selectedCandidateIndex = state.selectedCandidates.findIndex(
        (c) => c.candidateId === state.selectionEditId
      );
      state.selectedCandidates[selectedCandidateIndex] = {
        ...state.selectedCandidates[selectedCandidateIndex],
        ...action.payload,
      };
      toast.success("Selected candidate updated succesfully");
      state.selectionEditId = "";
    },
    deleteSelection: (state) => {
      state.selectedCandidates = state.selectedCandidates.filter(
        (candidate) => candidate.candidateId !== state.selectionDeleteId
      );
      toast.success("Selected candidate deleted succesfully");
      state.selectionDeleteId = "";
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
