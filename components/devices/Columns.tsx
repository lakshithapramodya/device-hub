"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "../ui/badge";
import Actions from "./Actions";
import { DeviceDataType } from "@/types/devices";

export const columns: ColumnDef<DeviceDataType>[] = [
  {
    accessorKey: "serialNumber",
    header: ({ column }) => (
      <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Serial Number
      </div>
    ),
    cell: ({ row }) => <div className="">{row.original.serialNumber}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Name
      </div>
    ),
    cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Description
      </div>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.original.description}</div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Devices
      </div>
    ),
    cell: ({ row }) => <div>{row.original.type}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Created At
      </div>
    ),
    cell: ({ row }) => <div>{row.original.createdAt}</div>,
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
