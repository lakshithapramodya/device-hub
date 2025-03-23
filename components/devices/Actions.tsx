"use client";

import React, { Fragment, useState } from "react";

import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import AddEditDevice from "./AddEditDevice";
import { DeviceDataType } from "@/types/devices";
import { useActions } from "@/hooks/useActions";
import { deleteDevice } from "@/actions/devices";
import { ViewDeviceDialog } from "./ViewDeviceDialog";

const Actions = ({ data }: { data: DeviceDataType }) => {
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);

  const { handleAction } = useActions();

  return (
    <Fragment>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpenView(true)}>
            <Eye className="mr-2 h-4 w-4" />
            <span>View</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              handleAction(
                async () => deleteDevice(data.id),
                `Are you sure you want to delete this device?`,
                `You have successfully deleted the device`
              )
            }
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddEditDevice open={open} setOpen={setOpen} data={data} />
      <ViewDeviceDialog open={openView} setOpen={setOpenView} device={data} />
    </Fragment>
  );
};

export default Actions;
