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
import { DashboardDatatype } from "@/types/dashboard";

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

interface Props {
  data: DashboardDatatype;
}

const DashboardView: React.FC<Props> = ({ data }) => {
  const chartData = [
    {
      month: "January",
      devices: data.chartData[0].devices,
      locations: data.chartData[0].locations,
    },
    {
      month: "February",
      devices: data.chartData[1].devices,
      locations: data.chartData[1].locations,
    },
    {
      month: "March",
      devices: data.chartData[2].devices,
      locations: data.chartData[2].locations,
    },
    {
      month: "April",
      devices: data.chartData[3].devices,
      locations: data.chartData[3].locations,
    },
    {
      month: "May",
      devices: data.chartData[4].devices,
      locations: data.chartData[4].locations,
    },
    {
      month: "June",
      devices: data.chartData[5].devices,
      locations: data.chartData[5].locations,
    },
    {
      month: "Jul",
      devices: data.chartData[6].devices,
      locations: data.chartData[6].locations,
    },
    {
      month: "Aug",
      devices: data.chartData[7].devices,
      locations: data.chartData[7].locations,
    },
    {
      month: "Sep",
      devices: data.chartData[8].devices,
      locations: data.chartData[8].locations,
    },
    {
      month: "Oct",
      devices: data.chartData[9].devices,
      locations: data.chartData[9].locations,
    },
    {
      month: "Nov",
      devices: data.chartData[10].devices,
      locations: data.chartData[10].locations,
    },
    {
      month: "Dec",
      devices: data.chartData[11].devices,
      locations: data.chartData[11].locations,
    },
  ];

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
