import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ConfirmDeleteDialog from "@/Features/Candidate/Components/CandidateSelection/ConfirmDeleteDialog";
import EditSelectionForm from "@/Features/Candidate/Components/CandidateSelection/EditSelectionForm";
import SearchData from "@/Features/Candidate/Components/CandidateSelection/SearchData";
import ShowEntries from "@/Features/Candidate/Components/CandidateSelection/ShowEntries";
import { selectionTableColumns } from "@/Features/Candidate/Components/CandidateSelection/TableColumns";
import TablePagination from "@/Features/Candidate/Components/CandidateSelection/TablePagination";
import {
  deleteSelection,
  removeDeleteId,
  selectCandidateSelectionData,
  updateTableState,
} from "@/Features/Candidate/selectionCandidateSlices/SelectionCandidate.slice";
import type { ISelectedCandidate } from "@/Features/Candidate/types/candidate-selection.type";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type TableState,
} from "@tanstack/react-table";

const SelectionTable = () => {
  const { selectedCandidates, tableState, deleteId } = useAppSelector(
    selectCandidateSelectionData
  );
  const dispatch = useAppDispatch();

  const table = useReactTable<ISelectedCandidate>({
    data: selectedCandidates,
    columns: selectionTableColumns,
    onSortingChange: (updater) =>
      dispatch(updateTableState({ key: "sorting", updater })),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: (updater) =>
      dispatch(updateTableState({ key: "rowSelection", updater })),
    onPaginationChange: (updater) =>
      dispatch(updateTableState({ key: "pagination", updater })),
    onGlobalFilterChange: (updater) =>
      dispatch(updateTableState({ key: "globalFilter", updater })),
    state: tableState as unknown as Partial<TableState>,
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <ShowEntries table={table} />
        <SearchData table={table} />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={selectionTableColumns.length}
                  className="h-10 text-center bg-[#F4F4F5]"
                >
                  No results found!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination table={table} />
      <ConfirmDeleteDialog
        open={!!deleteId}
        onOpenChange={(open: boolean) => {
          if (!open) {
            dispatch(removeDeleteId());
          }
        }}
        onConfirm={() => dispatch(deleteSelection())}
      />
      <EditSelectionForm />
    </div>
  );
};

export default SelectionTable;
