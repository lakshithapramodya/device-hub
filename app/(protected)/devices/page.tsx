import React from "react";

import DevicesView from "@/components/devices/DevicesView";
import { getAllDevices } from "@/actions/devices";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

const Page: React.FC<Props> = async ({ searchParams }) => {
  const { page } = await searchParams;

  const data = await getAllDevices(page);

  console.log(data.data);

  return <DevicesView data={data} />;
};

export default Page;
