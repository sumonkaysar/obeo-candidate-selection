import type { Table } from "@tanstack/react-table";

interface IProps<TData> {
  table: Table<TData>;
}

const ShowEntries = <TData,>({ table }: IProps<TData>) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">Show</span>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
        className="border rounded p-1 text-sm w-20"
      >
        {[10, 20, 30, 50, 100].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
      <span className="text-sm text-muted-foreground">entries</span>
    </div>
  );
};

export default ShowEntries;
