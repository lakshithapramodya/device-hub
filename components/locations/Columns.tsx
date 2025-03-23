"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "../ui/badge";
import Actions from "./Actions";
import { LocationDataType } from "@/types/locations";

export const columns: ColumnDef<LocationDataType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="pl-4"
      >
        Name
      </div>
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.original.title}</div>
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Address
      </div>
    ),
    cell: ({ row }) => <div className="capitalize">{row.original.address}</div>,
  },
  {
    accessorKey: "devices",
    header: ({ column }) => (
      <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Devices
      </div>
    ),
    cell: ({ row }) => <div>{row.original.devices}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Created At
      </div>
    ),
    cell: ({ row }) => <div>{format(row.original.createdAt, "dd/MM/yy")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Status
      </div>
    ),
    cell: ({ row }) => (
      <div>
        {row.original.status === "Active" ? (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
          >
            Active
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200"
          >
            Inactive
          </Badge>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div>Actions</div>,
    enableHiding: false,
    cell: ({ row }) => <Actions data={row.original} />,
  },
];
