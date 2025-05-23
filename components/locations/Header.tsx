"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import AddEditLocation from "./AddEditLocation";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-1 2xl:gap-1.5 sm:flex-row sm:items-center sm:justify-between">
      <Button className="mt-2 sm:mt-0" onClick={() => setOpen(true)}>
        Add Location
      </Button>

      <AddEditLocation open={open} setOpen={setOpen} data={null} />
    </div>
  );
}
