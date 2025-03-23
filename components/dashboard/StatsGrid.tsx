import { MapPin, Tablet, AlertTriangle } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { DashboardDatatype } from "@/types/dashboard";

interface StatsGridProps {
  data: DashboardDatatype;
}

export const StatsGrid = ({ data }: StatsGridProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Locations"
        value={data.totalLocations}
        icon={MapPin}
      />
      <StatsCard
        title="Total Devices"
        value={data.totalDevices}
        icon={Tablet}
      />
      <StatsCard
        title="Devices per Location"
        value={(data.totalDevices / data.totalLocations).toFixed(1)}
        icon={MapPin}
      />
      <StatsCard
        title="Inactive Devices"
        value={data.inactiveDevices}
        icon={AlertTriangle}
      />
    </div>
  );
};
