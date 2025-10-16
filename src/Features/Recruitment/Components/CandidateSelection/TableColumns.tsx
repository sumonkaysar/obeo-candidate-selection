import TableActions from "@/Features/Recruitment/Components/CandidateSelection/TableActions";
import TableColumnHeader from "@/Features/Recruitment/Components/CandidateSelection/TableColumnHeader";
import type { ISelectedCandidate } from "@/Features/Recruitment/types/candidate-selection.type";
import type { ColumnDef } from "@tanstack/react-table";

export const selectionTableColumns: ColumnDef<ISelectedCandidate>[] = [
  {
    accessorKey: "sl",
    header: "SL",
    cell: ({ row }) => row.index + 1,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Name" />
    ),
    cell: ({ row }) => (
      <div className="px-3">
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
  },
  {
    accessorKey: "candidateId",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Candidate Id" />
    ),
    cell: ({ row }) => (
      <div className="px-3">{row.getValue("candidateId")}</div>
    ),
  },
  {
    accessorKey: "employeeId",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Employee Id" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("employeeId")}</div>,
  },
  {
    accessorKey: "position",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Position" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("position")}</div>,
  },
  {
    accessorKey: "selectionTerms",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Selection Terms" />
    ),
    cell: ({ row }) => (
      <div className="px-3">{row.getValue("selectionTerms")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const { candidateId } = row.original;
      return <TableActions candidateId={candidateId} />;
    },
  },
];
