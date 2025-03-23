import React from "react";

import { Header } from "./Header";
import { DataTable } from "../ui/data-table";
import { columns } from "./Columns";
import CustomPagination from "../common/CustomPagination";
import { DeviceDataType } from "@/types/devices";

interface Props {
  data: { data: DeviceDataType[]; total: number };
}

const DevicesView: React.FC<Props> = ({ data }) => {
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

export default DevicesView;
