import { MapPin, Tablet, AlertTriangle } from "lucide-react";
import { StatsCard } from "./StatsCard";

interface StatsGridProps {
  data: {
    totalLocations: number;
    activeLocations: number;
    totalDevices: number;
    activeDevices: number;
  };
}

export const StatsGrid = ({ data }: StatsGridProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Locations"
        value={data.totalLocations}
        description={`${data.activeLocations} active, ${
          data.totalLocations - data.activeLocations
        } inactive`}
        icon={MapPin}
      />
      <StatsCard
        title="Total Devices"
        value={data.totalDevices}
        description={`${data.activeDevices} active, ${
          data.totalDevices - data.activeDevices
        } inactive`}
        icon={Tablet}
      />
      <StatsCard
        title="Devices per Location"
        value={(data.totalDevices / data.totalLocations).toFixed(1)}
        description="Average across all locations"
        icon={MapPin}
      />
      <StatsCard
        title="Inactive Devices"
        value={data.totalDevices - data.activeDevices}
        description={`${(
          ((data.totalDevices - data.activeDevices) / data.totalDevices) *
          100
        ).toFixed(1)}% of total devices`}
        icon={AlertTriangle}
      />
    </div>
  );
};
