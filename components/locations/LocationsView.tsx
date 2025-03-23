import React from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./Columns";
import { Header } from "./Header";

const LocationsView = () => {
  return (
    <div className="flex flex-col gap-5">
      <Header />

      <DataTable columns={columns} data={[]} />
    </div>
  );
};

export default LocationsView;
