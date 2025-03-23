import React from "react";

import DashboardView from "@/components/dashboard/DashboardView";
import { getDashboardStats } from "@/actions/dashboard";

const Page = async () => {
  const data = await getDashboardStats();

  return <DashboardView data={data} />;
};

export default Page;
