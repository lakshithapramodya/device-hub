import React from "react";

import LocationsView from "@/components/locations/LocationsView";
import { getAllLocations } from "@/actions/locations";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

const Page: React.FC<Props> = async ({ searchParams }) => {
  const { page } = await searchParams;

  const data = await getAllLocations(page);

  return <LocationsView data={data} />;
};

export default Page;
