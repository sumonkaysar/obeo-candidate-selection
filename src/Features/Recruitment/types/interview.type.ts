export interface IInterviewCandidate {
  _id: string;
  candidate: string;
  candidateId: string;
  firstName: string;
  lastName: string;
  position: string;
  interviewDate: string;
  interview: boolean;
  vivaMarks: number;
  writtenTotalMarks: number;
  mcqTotalMarks: number;
  totalMarks: number;
  selection: boolean;
  createdAt: string;
}
