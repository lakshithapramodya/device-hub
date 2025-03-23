import React from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./Columns";
import { Header } from "./Header";
import { LocationDataType } from "@/types/locations";

interface Props {
  data: LocationDataType[];
}

const LocationsView: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col gap-5">
      <Header />

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default LocationsView;
