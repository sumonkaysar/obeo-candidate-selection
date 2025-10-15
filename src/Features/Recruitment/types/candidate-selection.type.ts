import type { ITableState } from "@/Features/Recruitment/types";
import type { IInterviewCandidate } from "@/Features/Recruitment/types/interview.type";
import type { IShortlistCandidate } from "@/Features/Recruitment/types/shortlist.type";

export interface ISelectedCandidate {
  firstName: string;
  lastName: string;
  candidateId: string;
  employeeId: string;
  position: string;
  selectionTerms: string;
}

export interface ICandidateSelectionState {
  shortlistCandidates: IShortlistCandidate[];
  interviewCandidates: IInterviewCandidate[];
  selectedCandidates: ISelectedCandidate[];
  tableState: ITableState;
  selectionEditId: string;
  selectionDeleteId: string;
}
