import { DataTable } from "../ui/data-table";
import { Skeleton } from "../ui/skeleton";

const columns = ["a", "b", "c", "d", "e", "f", "g"].map((column) => ({
  header: () => <Skeleton className="w-24 h-6" />,
  accessorKey: column,
  cell: () => <Skeleton className="w-24 h-6" />,
}));

const tuples = new Array(10).fill(0).map((_, index) => ({
  a: index,
  b: index,
  c: index,
  d: index,
  e: index,
  f: index,
  g: index,
}));

export function DataTableSkeleton() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
      </div>
      <DataTable columns={columns} data={tuples} limit={10} page={1} setLimit={() => {}} setPage={() => {}} totalPages={10} isPagination={false} />
    </div>
  );
}
