import React from "react";

import { Header } from "./Header";
import { DataTable } from "../ui/data-table";
import { columns } from "./Columns";

const DevicesView = () => {
  return (
    <div className="flex flex-col gap-5">
      <Header />

      <DataTable columns={columns} data={[]} />
    </div>
  );
};

export default DevicesView;
