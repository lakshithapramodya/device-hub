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
import { LocationDataType } from "@/types/locations";
import AddEditLocation from "./AddEditLocation";
import { useActions } from "@/hooks/useActions";
import { deleteLocation } from "@/actions/locations";
import { ViewLocationDialog } from "./ViewLocationDialog";

const Actions = ({ data }: { data: LocationDataType }) => {
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
                async () => deleteLocation(data.id),
                `Are you sure you want to delete this location?`,
                `You have successfully deleted the location`
              )
            }
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddEditLocation open={open} setOpen={setOpen} data={data} />
      <ViewLocationDialog
        open={openView}
        setOpen={setOpenView}
        location={data}
      />
    </Fragment>
  );
};

export default Actions;
