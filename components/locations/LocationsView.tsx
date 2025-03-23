import React from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./Columns";
import { Header } from "./Header";
import { LocationDataType } from "@/types/locations";
import CustomPagination from "../common/CustomPagination";

interface Props {
  data: { data: LocationDataType[]; total: number };
}

const LocationsView: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col gap-5 h-full">
      <Header />
      <div className="flex flex-col justify-between h-full">
        <DataTable columns={columns} data={data.data} />

        <CustomPagination totalCount={data.total} />
      </div>
    </div>
  );
};

export default LocationsView;
