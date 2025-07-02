import React, { useState } from "react";
import { requestUser } from "@/lib/api/user-api";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronDown, Pen, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IUser } from "@/types/user-type";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "@/lib/pagination";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Badge } from "@/components/ui/badge";
import { useUserStatusDialog } from "@/store/user-status-dialog-store";
import UserStatusAlertDialog from "@/components/user-status-dialong";

dayjs.extend(utc);
dayjs.extend(timezone);

const UsersTable = () => {
  const queryClient = useQueryClient();
  const { UPDATE_USER } = requestUser();
  const { mutate: updateUserStatus, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) =>
      UPDATE_USER(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const { USERS } = requestUser();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const sortField = sorting[0]?.id ?? "created_at";
  const sortOrder =
    sorting.length === 0
      ? "DESC" // default sort order
      : sorting[0]?.desc
      ? "DESC"
      : "ASC";
  const emailFilter = columnFilters.find((f) => f.id === "email")?.value ?? "";

  const { data, isLoading } = useQuery({
    queryKey: [
      "users",
      pagination.pageIndex,
      pagination.pageSize,
      sortField,
      sortOrder,
      emailFilter,
    ],
    queryFn: () =>
      USERS({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        sortBy: sortField,
        sortOrder: sortOrder, // Use actual sort order instead of hardcoded "DESC"
        email: emailFilter,
      }),
    // keepPreviousData: true, // This helps with smooth pagination transitions
  });

  const columns: ColumnDef<IUser>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "no",
      header: "No.",
      cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex;
        const pageSize = table.getState().pagination.pageSize;
        const rowIndex = row.index;
        return <div>{pageIndex * pageSize + rowIndex + 1}</div>;
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "avatar",
      header: "Avatar",
      cell: ({ row }) => {
        const avatar = row.getValue("avatar") as string;
        const defaultAvatar =
          "https://ui-avatars.com/api/?name=User&background=random";
        return (
          <img
            src={avatar || defaultAvatar}
            alt="User avatar"
            className="h-10 w-10 rounded-full object-cover"
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "full_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "desc")
            }
          >
            Fullname
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className="capitalize">{row.getValue("full_name")}</div>;
      },
    },
    {
      accessorKey: "user_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "desc")
            }
          >
            Username
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className="capitalize">{row.getValue("user_name")}</div>;
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "desc")
            }
          >
            Email
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "is_active",
      header: () => <div>Status</div>,
      cell: ({ row }) => {
        const user = row.original;
        const isActive = user.is_active;
        // const payload = user.is_active == true ? false : true;
        // console.log(payload);

        return (
          <Badge
            variant={isActive ? "default" : "destructive"}
            className="cursor-pointer hover:opacity-80"
            onClick={() =>
              useUserStatusDialog.getState().setDialog(user.id, isActive)
            }
          >
            {isActive ? "Active" : "Blocked"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: () => <>Crated At</>,
      cell: ({ row }) => {
        const rawDate = row.getValue("created_at") as string;
        const fixedTime = dayjs(rawDate)
          .add(7, "hour")
          .format("YYYY-MM-DD hh:mm A");

        return <div className="text-sm text-muted-foreground">{fixedTime}</div>;
      },
    },
    {
      id: "actions",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        // const user = row.original;
        return (
          <div className="flex space-x-1.5 items-center">
            <Badge>
              <Pen />
              Edit
            </Badge>
            <Badge variant="destructive">
              <Trash /> Delete
            </Badge>
          </div>
          //   <DropdownMenu>
          //     <DropdownMenuTrigger asChild>
          //       <Button variant="ghost" className="h-8 w-8 p-0">
          //         <span className="sr-only">Open menu</span>
          //         <MoreHorizontal />
          //       </Button>
          //     </DropdownMenuTrigger>
          //     <DropdownMenuContent align="end">
          //       <DropdownMenuLabel>Actions</DropdownMenuLabel>
          //       <DropdownMenuItem
          //         onClick={() => navigator.clipboard.writeText(user.id)}
          //       >
          //         Copy user ID
          //       </DropdownMenuItem>
          //       <DropdownMenuSeparator />
          //       <DropdownMenuItem>View user details</DropdownMenuItem>
          //       <DropdownMenuItem>Edit user</DropdownMenuItem>
          //     </DropdownMenuContent>
          //   </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data?.data || [],
    columns,
    pageCount: data?.meta ? Math.ceil(data?.meta.total / data?.meta.limit) : -1,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // Remove these for server-side pagination
    // getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination, // Enable pagination change handler
    manualPagination: true, // Enable manual pagination for server-side
    manualSorting: true, // Enable manual sorting for server-side
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* //alert dailong to update status */}
      <UserStatusAlertDialog
        onConfirm={(userId, newStatus) => {
          updateUserStatus({ id: userId, status: newStatus });
        }}
        isLoading={isUpdating}
      />
      ;
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="space-y-4">
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter emails..."
              value={
                (table.getColumn("email")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("email")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
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
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
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
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between py-4">
            <div className="text-muted-foreground text-sm">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {data?.meta?.total || 0} row(s) selected.
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                  className="h-8 w-[70px] rounded border border-input bg-background px-3 py-1 text-sm"
                >
                  {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>

              {/* Simple Flow Pagination */}
              <Pagination
                currentPage={table.getState().pagination.pageIndex + 1}
                totalPages={table.getPageCount()}
                onPageChange={(page) => table.setPageIndex(page - 1)}
              />

              <div className="text-sm text-muted-foreground">
                Page {data?.meta?.page || 1} of {table.getPageCount()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
