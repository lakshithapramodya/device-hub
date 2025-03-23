"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Card, CardContent } from "@/components/ui/card";

import { PageHeader } from "@/components/common/PageHeader";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { StatsGrid } from "./StatsGrid";

// Mock data
const data = {
  totalLocations: 12,
  activeLocations: 10,
  totalDevices: 45,
  activeDevices: 42,
  recentLocations: [
    {
      id: "1",
      title: "Headquarters",
      address: "123 Main St, New York, NY",
      status: "Active",
      deviceCount: 8,
    },
    {
      id: "2",
      title: "Branch Office",
      address: "456 Park Ave, Boston, MA",
      status: "Active",
      deviceCount: 5,
    },
    {
      id: "3",
      title: "Retail Store",
      address: "789 Market St, San Francisco, CA",
      status: "Inactive",
      deviceCount: 3,
    },
  ],
  recentDevices: [
    {
      id: "1",
      serialNumber: "POS-001-2023",
      type: "pos",
      location: "Headquarters",
      status: "Active",
    },
    {
      id: "2",
      serialNumber: "KIOSK-002-2023",
      type: "kiosk",
      location: "Branch Office",
      status: "Active",
    },
    {
      id: "3",
      serialNumber: "SIGN-003-2023",
      type: "signage",
      location: "Retail Store",
      status: "Inactive",
    },
  ],
};

const chartData = [
  { month: "January", devices: 186, locations: 80 },
  { month: "February", devices: 305, locations: 200 },
  { month: "March", devices: 237, locations: 120 },
  { month: "April", devices: 73, locations: 190 },
  { month: "May", devices: 209, locations: 130 },
  { month: "June", devices: 214, locations: 140 },
  { month: "Jul", devices: 186, locations: 80 },
  { month: "Aug", devices: 305, locations: 200 },
  { month: "Sep", devices: 237, locations: 120 },
  { month: "Oct", devices: 73, locations: 190 },
  { month: "Nov", devices: 209, locations: 130 },
  { month: "Dec", devices: 214, locations: 140 },
];
const chartConfig = {
  devices: {
    label: "Devices",
    color: "black",
  },
  locations: {
    label: "Locations",
    color: "#9aa1ab",
  },
} satisfies ChartConfig;

const DashboardView = () => {
  return (
    <div className="flex flex-col">
      <PageHeader
        title={`Welcome back, Name`}
        description="Here's an overview of your locations and devices"
      />

      <div className="mt-6">
        <StatsGrid data={data} />
      </div>

      <div className="grid gap-6 mt-8 md:grid-cols-2">
        <Card>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                  className="2xl:text-base"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="devices" fill="var(--color-devices)" radius={4} />
                <Bar
                  dataKey="locations"
                  fill="var(--color-locations)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
